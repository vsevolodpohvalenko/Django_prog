from django.db.models import Q
import django_filters
from .models import FAQ_item

class ItemFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search')

    class Meta:
        model = FAQ_item
        fields = ()

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(Title__icontains=value) | Q(Answer__icontains=value)
        )