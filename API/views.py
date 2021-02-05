from rest_framework import permissions
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView

from .models import CompanyProfilePage, Links
from .serializers import CompanyProfilePageSerializer, LinksSerializer


class CompanyProfilePageViewSet(ListAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = CompanyProfilePage.objects.all()
    serializer_class = CompanyProfilePageSerializer

    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('country', 'companyName', 'companyDescription', 'owner__first_name', "sections", 'type')


class LinksViewSet(ListAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = Links.objects.all()
    serializer_class = LinksSerializer

    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('find', 'id')
