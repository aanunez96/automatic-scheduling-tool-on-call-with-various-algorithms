from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType

from personal.models import Person


class PersonNode(DjangoObjectType):
    class Meta:
        model = Person
        use_connection = True
        filter_fields = {
            'uci': ['exact']
        }


class PersonQuery(ObjectType):
    person = DjangoFilterConnectionField(PersonNode)

