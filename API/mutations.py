from graphene import Boolean, Field, ID, InputObjectType, Mutation, String
from rest_framework import serializers
from .models import FAQ_item, FAQ_Group
from .types import ItemType


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ_item
        fields = (
            'id',
            'Title',
            'Group',
            'Answer',
            'Active'
        )


class ItemInputType(InputObjectType):
    Title = String()
    Group = String()
    Answer = String()
    Active = Boolean()


class ItemCreate(Mutation):
    class Arguments:
        input = ItemInputType(required=True)

    item = Field(ItemType)

    @classmethod
    def mutate(cls, self, info, **data):
        serializer = ItemSerializer(data=data.get('input'))
        serializer.is_valid(raise_exception=True)
        return ItemCreate(item=serializer.save)

class ItemDelete(Mutation):
    class Arguments:
        id = ID(required=True)
    ok=Boolean()

    @classmethod
    def mutate(cls, self, info, **data):
        item = FAQ_item.objects.get(id=data.get('id'))
        item.delete()

        return ItemDelete(ok=True)