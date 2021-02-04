import json
from email.mime.image import MIMEImage

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework import serializers

from .models import FAQ_Group, FAQ_item, Links, CompanyProfilePage, Document, Section, Category, Home_Page, \
    MenuItem, ContentPage, Contact, RequestForProposals, PaymentMethods

User = settings.AUTH_USER_MODEL


class FAQGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ_Group
        fields = '__all__'


class PaymentMethodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethods
        fields = "__all__"


class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = "__all__"


class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ_item
        fields = '__all__'


class CompanyProfilePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfilePage
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home_Page
        fields = '__all__'


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'


class ContentPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentPage
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def create(self, validate_data):
        instance = super(ContactSerializer, self).create(validate_data)

        # html_content = render_to_string('contact.html', {'data': instance})
        # Then we create an "EmailMessage" object as usual.
        msg = EmailMultiAlternatives(
            instance.subject,
            "Hi! My name is {}, \nI am working for {}, \nI'll be really glad if you text me {} \nor call {}, \nand the main {}".format(
                instance.name, instance.companyName, instance.emailAddress, instance.phoneNumber, instance.message),
            settings.EMAIL_HOST_USER,
            settings.ADMINS,
        )
        # msg.attach_alternative(html_content, "text/html")
        # Then we send message.
        msg.send()
        return instance


class RequestForProposalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestForProposals
        fields = '__all__'

    def create(self, validate_data):
        instance = super(RequestForProposalsSerializer, self).create(validate_data)
        emails = ["vsevolod.pohvalenko@gmail.com"]
        for i in CompanyProfilePage.objects.all():
            section = i.sections
            parsedSection = json.loads(section)

            for j in parsedSection:
                if not j or j["Icon"] is None:
                    continue
                else:
                    print(j)
                    if j['Icon'] == instance.category:
                        emails.append(i.owner)
        # html_content = render_to_string('request_for_quotation.html', {'data': instance})
        image = instance.attachments
        msg = EmailMultiAlternatives(
            'Request For Quotation',
            'KEY WORDS: {:<8}, \nCategory: {:<8}, \nDescriptions: {:<8}, \nPreferred Currency: {:<8}, \nPreferred Until '
            '\nPrice: {:<8}, \nPreferred Shipping Agreement: {:<8}, \nPayment Method: {:<8}'.format(instance.keywords,
                                                                                                    instance.category,
                                                                                                    instance.descriptions,
                                                                                                    instance.preferredCurrency,
                                                                                                    instance.preferredUntilPrice,
                                                                                                    instance.preferredShippingAgreement,
                                                                                                    instance.paymentMethod),
            settings.EMAIL_HOST_USER,
            emails,
            headers={'Message-ID': 'foo'},
        )
        msg2 = EmailMultiAlternatives(
            'Request For Quotation',
            "Companies' emails: {:<8}".format(*emails),
            settings.EMAIL_HOST_USER,
            [instance.owner],)
        # msg.attach_alternative(html_content, "text/html")
        if image:
            mime_image = MIMEImage(image.read(), _subtype="jpeg")
            mime_image.add_header('Content-ID', '<{}>'.format(image.name))
            msg.attach(mime_image)
        msg.send()
        msg2.send()
        return instance
