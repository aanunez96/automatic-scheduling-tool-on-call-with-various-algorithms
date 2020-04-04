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


class UpdateShift(relay.ClientIDMutation):
    class Input:
        person_remove = graphene.ID(required=True)
        person_add = graphene.ID(required=True)
        id = graphene.ID(required=True)

    shift = graphene.Field(ShiftNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, person_remove, person_add, id):
        shift = Shift.objects.get(pk=from_global_id(id)[1])
        shift.person.add(person_add)
        shift.person.remove(person_remove)
        shift2 = person_add.object.filter(shift__iteration=shift.iteration)
        shift2.person.remove(person_add)
        shift2.person.add(person_remove)
        shift.save()
        shift2.save()
        return ShiftQuery(shift=DjangoFilterConnectionField(shift))


class ShiftMutation:
    update_shift = UpdateShift().Field()
