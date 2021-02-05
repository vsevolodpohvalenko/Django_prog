from graphene_django import DjangoObjectType
from .models import FAQ_item


class ItemType(DjangoObjectType):
    class Meta:
        model = FAQ_item
        only_fields = (
            'id',
            'Title',
            'Group',
            'Answer',
            'Active'
        )
        use_connection = True
