from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from repoPlan.models import Shift
from planning.models import Iteration
import graphene
import django_filters


class ShiftFilter(django_filters.FilterSet):
    iteration = django_filters.filters.ModelChoiceFilter(queryset=Iteration.object.all())

    class Meta:
        model = Shift
        fields = {
            'date': ['lte', 'gte'],
            'number': ['exact'],
            'person': ['exact'],
            'iteration': ['exact'],
        }


class ShiftNode(DjangoObjectType):
    class Meta:
        model = Shift
        use_connection = True
        # filter_fields = {
        #     'date': ['exact'],
        #     'number': ['exact'],
        #     'person': ['exact'],
        #     'iteration': ['exact'],
        # }


class ShiftQuery(ObjectType):
    shift = DjangoFilterConnectionField(ShiftNode, filterset_class=ShiftFilter)


class UpdateShift(relay.ClientIDMutation):
    class Input:
        person_1 = graphene.ID(required=True)
        person_2 = graphene.ID(required=True)
        shift_1 = graphene.ID(required=True)
        shift_2 = graphene.ID(required=True)

    shift = graphene.Field(ShiftNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, person_1, person_2, shift_1, shift_2):
        shift = Shift.object.get(pk=shift_1)
        shift2 = Shift.object.get(pk=shift_2)
        shift.person.add(person_2)
        shift.person.remove(person_1)
        shift2.person.remove(person_2)
        shift2.person.add(person_1)
        shift.save()
        shift2.save()
        return UpdateShift(shift=shift)


class ShiftMutation:
    update_shift = UpdateShift().Field()