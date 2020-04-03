from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from planning.models import Personal, Iteration


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


class IterationlQuery(ObjectType):
    iteration = DjangoFilterConnectionField(IterationNode)

