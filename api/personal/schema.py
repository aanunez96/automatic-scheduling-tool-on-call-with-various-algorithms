from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, List, relay
import graphene
from graphql_relay import from_global_id
from personal.models import Person


class PersonNode(DjangoObjectType):
    class Meta:
        model = Person
        use_connection = True
        filter_fields = {
            'Uci': ['exact']
        }


class PersonQuery(ObjectType):
    person = DjangoFilterConnectionField(PersonNode)


class PersonMutation(relay.ClientIDMutation):
    class Input:
        Uci = graphene.String(required=True)
        id = graphene.ID()

    person = graphene.Field(PersonNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, Uci, id):
        person = Person.objects.get(pk=from_global_id(id)[1])
        person.Uci = Uci
        person.save()
        return PersonMutation(person=person)
