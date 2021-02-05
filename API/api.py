from rest_framework import viewsets, permissions

from .models import FAQ_Group, FAQ_item, Document, Section, Category, Home_Page, MenuItem, \
    ContentPage, Contact, RequestForProposals, Links, PaymentMethods, CompanyProfilePage
from .serializers import FAQGroupSerializer, FAQItemSerializer, DocumentSerializer, \
    SectionSerializer, CategorySerializer, HomePageSerializer, MenuItemSerializer, ContactSerializer, \
    ContentPageSerializer, RequestForProposalsSerializer, LinksSerializer, PaymentMethodsSerializer, \
    CompanyProfilePageSerializer


class FAQ_GroupViewSet(viewsets.ModelViewSet):
    queryset = FAQ_Group.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FAQGroupSerializer


class PaymentMethodsViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethods.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PaymentMethodsSerializer


class FAQ_itemViewSet(viewsets.ModelViewSet):
    queryset = FAQ_item.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FAQItemSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = DocumentSerializer


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = SectionSerializer


class CompanyProfilePageViewSet(viewsets.ModelViewSet):
    queryset = CompanyProfilePage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CompanyProfilePageSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer


class Home_PageViewSet(viewsets.ModelViewSet):
    queryset = Home_Page.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = HomePageSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MenuItemSerializer


class ContentPageViewSet(viewsets.ModelViewSet):
    queryset = ContentPage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ContentPageSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ContactSerializer


class RequestForProposalsViewSet(viewsets.ModelViewSet):
    queryset = RequestForProposals.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RequestForProposalsSerializer


class LinkViewSet(viewsets.ModelViewSet):
    queryset = Links.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LinksSerializer
