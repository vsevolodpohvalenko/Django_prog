from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import models
from django.template.loader import render_to_string
from phone_field import PhoneField

User = settings.AUTH_USER_MODEL


def upload_path(instance, filename):
    return '/'.join(['CompanyProfilePage', str(instance.companyName), filename])


class FAQ_Group(models.Model):
    Title = models.CharField('faq_Category_title', max_length=75, unique=True)

    def __str__(self):
        return self.Title

    class Meta:
        verbose_name = 'FAQ_Category',
        verbose_name_plural = 'FAQ_Categories'
        ordering = ('Title',)


class FAQ_item(models.Model):
    Group = models.ForeignKey(FAQ_Group, on_delete=models.CASCADE, default=1)
    Title = models.CharField('faq_title', max_length=75, unique=True)
    Answer = models.CharField('content', unique=True, max_length=255)
    Active = models.BooleanField('', default=False)

    def __str__(self):
        return self.Title

    class Meta:
        verbose_name = 'API'
        verbose_name_plural = 'FAQS'
        ordering = ('Title',)


class CompanyProfilePage(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    companyProfilePicture = models.ImageField(default='24original1431380543.jpg', upload_to=upload_path)
    companyName = models.CharField(max_length=128, blank=True, default="Company")
    companyDescription = models.TextField(default="This company doesn't have any description")
    country = models.CharField(max_length=200, blank=True, default="Undefined")
    companyLogo = models.ImageField(default='logo-social.png', upload_to=upload_path)
    sections = models.TextField(default="[{""}]")
    type = models.CharField(default="supplier", max_length=256)

    def __str__(self):
        return self.companyName


class Document(models.Model):
    profile = models.ForeignKey(CompanyProfilePage, on_delete=models.CASCADE, default=1)
    Title = models.CharField(max_length=75, default=" ")
    Thumbnail = models.ImageField(default='dot-com.jpg')
    Download = models.FileField(default='dot-com.jpg')


class Section(models.Model):
    Title = models.CharField(max_length=75, default="Section")


class Category(models.Model):
    Name = models.CharField(max_length=75)


class Home_Page(models.Model):
    Title = models.CharField(max_length=75)
    BrowserTitle = models.CharField(max_length=75)
    MetaDescription = models.TextField(max_length=500)
    UrlSlug = models.TextField(max_length=500)
    SubTitle = models.TextField(max_length=500)
    SearchPlaceholder = models.TextField(max_length=500)


class MenuItem(models.Model):
    Name = models.CharField(max_length=100)


class ContentPage(models.Model):
    Title = models.CharField(max_length=75)
    BrowserTitle = models.CharField(max_length=75)
    MetaDescription = models.TextField()
    UrlSlug = models.CharField(max_length=75)
    Content = models.TextField()


class Contact(models.Model):
    owner = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    name = models.CharField(max_length=75)
    companyName = models.CharField(max_length=100)
    emailAddress = models.EmailField()
    phoneNumber = PhoneField(blank=True, help_text='Contact phone number')
    subject = models.CharField(max_length=100)
    message = models.TextField(max_length=500)

    @staticmethod
    def create_email(phoneNumber_, subject_, message_, emailAddress_, companyName_, name_, instance):

        # html_content = render_to_string('contact.html', {"phoneNumber": phoneNumber_, "subject": subject_, "message": message_, "emailAddress": emailAddress_, "companyName": companyName_, "name": name_})
        # Then we create an "EmailMessage" object as usual.
        msg = EmailMultiAlternatives(
            subject_,
            "Hi! My name is {}, I am working for {}, I'll be really glad if you text me {} or call {}, and the main \n{}".format(name_, companyName_, emailAddress_, phoneNumber_, message_),
            settings.EMAIL_HOST_USER,
            settings.ADMINS,
        )
        # msg.attach_alternative(html_content, "text/html")
        # Then we send message.
        msg.send()
        return instance


class RequestForProposals(models.Model):
    keywords = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    descriptions = models.TextField(max_length=500)
    attachments = models.FileField()
    preferredCurrency = models.CharField(max_length=100)
    preferredUntilPrice = models.CharField(max_length=100)
    preferredShippingAgreement = models.CharField(max_length=100)
    destinationPort = models.CharField(max_length=255, default="Virginia")
    paymentMethod = models.TextField(default="Google Pay")
    email = models.EmailField(default="vsevolod.pohvalenko@gmail.com")
    iAgree = models.CharField(max_length=10)


class Links(models.Model):
    find = models.CharField(max_length=64)

class PaymentMethods(models.Model):
    method = models.CharField(max_length=64)
