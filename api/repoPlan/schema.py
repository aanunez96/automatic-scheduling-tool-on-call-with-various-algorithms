from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from repoPlan.models import Shift
import graphene
from graphql_relay import from_global_id


class ShiftNode(DjangoObjectType):
    class Meta:
        model = Shift
        use_connection = True
        filter_fields = {
            'date': ['exact'],
            'number': ['exact'],
            'person': ['exact'],
            'iteration': ['exact'],
        }


class ShiftQuery(ObjectType):
    shift = DjangoFilterConnectionField(ShiftNode)


class ShiftMutation(relay.ClientIDMutation):
    class Input:
        date = graphene.Date(required=True)
        number = graphene.Int(required=True)
        person = graphene.ID(required=True)
        iteration = graphene.ID(required=True)
        id = graphene.ID()

    shift = graphene.Field(ShiftNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, date, number, person, iteration, id):
        shift = Shift.objects.get(pk=from_global_id(id)[1])
        shift.date = date
        shift.person = person
        shift.number = number
        shift.iteration = iteration
        shift.save()
        return ShiftMutation(shift=shift)
