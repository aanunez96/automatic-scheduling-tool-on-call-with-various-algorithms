from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from repoPlan.models import Shift
from planning.models import Iteration
import graphene
from graphql_relay import from_global_id
import django_filters


class ShiftFilter(django_filters.FilterSet):
    iteration = django_filters.filters.ModelChoiceFilter(queryset=Iteration.object.all())

    class Meta:
        model = Shift
        fields = ['date', 'number', 'person', 'iteration']


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
    shift = DjangoFilterConnectionField(ShiftNode, filterset_class=ShiftFilter)


class UpdateShift(relay.ClientIDMutation):
    class Input:
        person_remove = graphene.ID(required=True)
        person_add = graphene.ID(required=True)
        id = graphene.ID(required=True)

    shift = graphene.Field(ShiftNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, person_remove, person_add, id):
        shift = Shift.object.get(pk=id)
        shift2 = Shift.object.filter(iteration=shift.iteration).get(person__id=person_add)
        shift.person.add(person_add)
        shift.person.remove(person_remove)
        shift2.person.remove(person_add)
        shift2.person.add(person_remove)
        shift.save()
        shift2.save()
        return UpdateShift(shift=shift)


class ShiftMutation:
    update_shift = UpdateShift().Field()
