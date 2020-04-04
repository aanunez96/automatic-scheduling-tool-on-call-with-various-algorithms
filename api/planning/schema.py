from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from planning.models import Personal, Iteration
from graphql_relay import from_global_id
import graphene


class PersonalNode(DjangoObjectType):
    class Meta:
        model = Personal
        use_connection = True
        filter_fields = {
            'sex': ['iexact'],
            'children': ['exact'],
            'role': ['iexact'],
            'idUci': ['exact'],
            'days': ['exact', 'icontains'],
            'available': ['exact'],
        }


class IterationNode(DjangoObjectType):
    class Meta:
        model = Iteration
        use_connection = True
        filter_fields = {
            'algorithm': ['iexact'],
            'heuristic': ['exact'],
            'type_guard': ['exact'],
            'number': ['exact'],
            'executor': ['exact'],
            'date_start': ['exact'],
            'date_end': ['exact'],
        }


class PersonalQuery(ObjectType):
    personal = DjangoFilterConnectionField(PersonalNode)


class IterationQuery(ObjectType):
    iteration = DjangoFilterConnectionField(IterationNode)


class UpdatePersonal(relay.ClientIDMutation):
    class Input:
        available = graphene.Boolean(required=True)
        id = graphene.ID(required=True)

    personal = graphene.Field(PersonalNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, available, id):
        personal = Personal.objects.get(pk=from_global_id(id)[1])
        personal.available = available
        personal.save()
        return PersonalQuery(personal=DjangoFilterConnectionField(personal))


class PersonalMutation:
    update_personal = UpdatePersonal().Field()
