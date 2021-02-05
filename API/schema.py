import graphene
from graphene_django import DjangoObjectType
from .filters import ItemFilter
from .models import FAQ_Group, FAQ_item, Contact
from .mutations import ItemCreate, ItemDelete
from .types import ItemType
from graphene_django.filter import DjangoFilterConnectionField
from accounts.models import UserAccount



class FAQGroupType(DjangoObjectType):
    class Meta:
        model = FAQ_Group


class ContactType(DjangoObjectType):
    class Meta:
        model = Contact
        only_fields = (
            'owner',
            'phoneNumber',
            'emailAddress',
            'name',
            'subject'
        )


class FAQItemType(DjangoObjectType):
    class Meta:
        model = FAQ_item


class GroupInput(graphene.InputObjectType):
    id = graphene.ID()
    Title = graphene.String()


class ContactInput(graphene.InputObjectType):
    owner = graphene.ID()
    name = graphene.String()
    companyName = graphene.String()
    emailAddress = graphene.String()
    phoneNumber = graphene.String()
    subject = graphene.String()
    message = graphene.String()


class ItemInput(graphene.InputObjectType):
    id = graphene.ID()
    Title = graphene.String()
    Group = graphene.ID()
    Answer = graphene.String()
    Active = graphene.Boolean()


class Query(graphene.ObjectType):
    FAQGroups = graphene.List(FAQGroupType)
    group = graphene.Field(FAQGroupType, id=graphene.Int())
    FAQItems = graphene.List(FAQItemType)
    items = DjangoFilterConnectionField(ItemType, filterset_class=ItemFilter)
    item = graphene.Field(ItemType, id=graphene.Argument(graphene.ID, required=True))

    def resolve_group(self, info, **kwargs):
        primary_id = kwargs.get('id')
        if primary_id is not None:
            return FAQ_Group.objects.get(pk=primary_id)
        return None

    def resolve_FAQGroups(self, info):
        return FAQ_Group.objects.all()

    def resolve_FAQItems(self, info):
        return FAQ_item.objects.all()

    def resolve_items(self, info):
        return FAQ_item.objects.all()

    def resolve_item(self, info, **kwargs):
        return FAQ_item.objects.get(id=kwargs.get('id'))


schema = graphene.Schema(query=Query)


class CreateFAQGroup(graphene.Mutation):
    Title = graphene.String()

    class Arguments:
        title = graphene.String()

    def mutate(self, info, title):
        faq_item = FAQ_Group(Title=title)
        faq_item.save()

        return CreateFAQGroup(

            Title=faq_item.Title,
        )


class UpdateGroup(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = GroupInput(required=True)

    ok = graphene.Boolean()
    group = graphene.Field(FAQGroupType)

    @staticmethod
    def mutate(root, info, id, input=None):
        ok = False
        group_instance = FAQ_Group.objects.get(pk=id)
        if group_instance:
            ok = True
            group_instance.Title = input.Title
            group_instance.save()
            return UpdateGroup(ok=ok, group=group_instance)
        return UpdateGroup(ok=ok, group=None)


class CreateGroup(graphene.Mutation):
    class Arguments:
        input = GroupInput(required=True)

    ok = graphene.Boolean()
    group = graphene.Field(FAQGroupType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        group_instance = FAQ_Group(Title=input.Title)
        group_instance.save()
        return CreateGroup(ok=ok, group=group_instance)


class CreateContact(graphene.Mutation):
    class Arguments:
        phoneNumber_ = graphene.String()
        subject_ = graphene.String()
        message_ = graphene.String()
        emailAddress_ = graphene.String()
        companyName_ = graphene.String()
        name_ = graphene.String()
        owner_ = graphene.Int()

    ok = graphene.Boolean()
    contact = graphene.Field(ContactType)

    @staticmethod
    def mutate(self, info, owner_, phoneNumber_, subject_, message_, emailAddress_, companyName_, name_):
        ok = True
        test_owner = UserAccount.objects.get(pk=owner_)
        contact_instance = Contact(message=message_, subject=subject_, name=name_,
                                   companyName=companyName_, owner=test_owner, emailAddress=emailAddress_,
                                   phoneNumber=phoneNumber_)
        contact_instance.save()
        # item_instance.Group.set(group)
        Contact.create_email(phoneNumber_=phoneNumber_, subject_=subject_, companyName_=companyName_, emailAddress_=emailAddress_, name_=name_, message_=message_, instance=contact_instance)
        return CreateContact(ok=ok, contact=contact_instance)


class CreateItem(graphene.Mutation):
    class Arguments:
        input = ItemInput(required=True)

    ok = graphene.Boolean()
    item = graphene.Field(ItemType)

    @staticmethod
    def mutate(self, info, input=None):
        ok = True
        group = FAQ_Group.objects.get(pk=input.Group)
        item_instance = FAQ_item(Title=input.Title, Answer=input.Answer, Active=input.Active, Group=group)
        item_instance.save()
        # item_instance.Group.set(group)

        return CreateItem(ok=ok, item=item_instance)


class UpdateItem(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = ItemInput(required=True)

    ok = graphene.Boolean()
    item = graphene.Field(ItemType)

    @staticmethod
    def mutate(self, info, id, input=None):
        ok = False
        item_instance = FAQ_item.objects.get(pk=id)
        if item_instance:
            ok = True
            group = FAQ_Group.objects.get(pk=input.Group)
            item_instance.Title = input.Title
            item_instance.Answer = input.Answer
            item_instance.Active = input.Active
            item_instance.Group = group
            item_instance.save()

            return UpdateItem(ok=ok, item=item_instance)
        return UpdateItem(ok=ok, item=None)


class Mutation(graphene.ObjectType):
    create_FAQGroup = CreateFAQGroup.Field()
    item_delete = ItemDelete.Field()
    create_group = CreateGroup.Field()
    update_group = UpdateGroup.Field()
    create_item = CreateItem.Field()
    update_item = UpdateItem.Field()
    create_contact = CreateContact.Field()


schema = graphene.Schema(
    query=Query,
    mutation=Mutation
)
