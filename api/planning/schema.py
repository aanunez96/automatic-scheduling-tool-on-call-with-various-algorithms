from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from planning.models import Personal, Iteration, MessageQueue, Parameters
from personal.models import Person
import graphene
import django_filters
from django.db import transaction, IntegrityError


class MessageFilter(django_filters.FilterSet):
    class Meta:
        model = MessageQueue
        fields = {
            'state': ['iexact', 'exact'],
            'percent': ['exact'],
        }


class IterationFilter(django_filters.FilterSet):
    class Meta:
        model = Iteration
        fields = {
            'algorithm': ['iexact'],
            'heuristic': ['exact'],
            'type_guard': ['exact'],
            'number': ['exact'],
            'executor': ['exact'],
            'date_start': ['exact'],
            'date_end': ['exact'],
        }
    order_by = django_filters.OrderingFilter(
        fields=(
            ('date_start', 'date_start'),
            ('date_end', 'date_end'),
        )
    )



class PersonalNode(DjangoObjectType):
    class Meta:
        model = Personal
        use_connection = True
        filter_fields = {
            'id': ['exact'],
            'sex': ['iexact'],
            'children': ['exact'],
            'role': ['iexact'],
            'person': ['exact'],
            'days': ['exact', 'icontains'],
            'available': ['exact'],
        }


class IterationNode(DjangoObjectType):
    class Meta:
        model = Iteration
        use_connection = True


class MessageNode(DjangoObjectType):
    class Meta:
        model = MessageQueue
        use_connection = True


class ParametersNode(DjangoObjectType):
    class Meta:
        model = Parameters
        use_connection = True
        filter_fields = {
            'key': ['exact'],
            'value': ['exact'],
            'message': ['exact'],
        }


class PersonalQuery(ObjectType):
    personal = DjangoFilterConnectionField(PersonalNode)


class MessageQuery(ObjectType):
    message = DjangoFilterConnectionField(MessageNode, filterset_class=MessageFilter)


class IterationQuery(ObjectType):
    iteration = DjangoFilterConnectionField(IterationNode,filterset_class=IterationFilter)


class UpdatePersonal(relay.ClientIDMutation):
    class Input:
        available = graphene.Boolean()
        id = graphene.ID(required=True)
        days = graphene.String()

    personal = graphene.Field(PersonalNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, available, id, days):
        personal = Personal.object.get(pk=id)
        personal.available = available
        personal.days = days
        personal.save()
        return UpdatePersonal(personal=personal)


class CreatePersonal(relay.ClientIDMutation):
    class Input:
        available = graphene.Boolean()
        id = graphene.String(required=True)
        days = graphene.List(of_type=graphene.String)
        sex = graphene.String(required=True)
        role = graphene.String(required=True)
        name = graphene.String(required=True)
        children = graphene.Boolean()

    personal = graphene.Field(PersonalNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, available, id, days, sex, role, name, children):
        try:
            personal = Personal.object.get(id=id)
        except Personal.DoesNotExist:
            person = Person(id=id, uci=id)
            person.save()
            personal = Personal(id=id, person=person)
        sexo = "F" if sex == "Female" else "M"
        rol = "P" if role == "Profesor" else "S"
        personal.name = name
        personal.role = rol
        personal.sex = sexo
        if available:
            personal.available = available
        if children:
            personal.children = children
        if len(days) > 0:
            result = ""
            for index,day in enumerate(days):
                if day == 'Lunes':
                    result+="1"
                elif day == 'Martes':
                    result+="2"
                elif day == 'Miercoles':
                    result+="3"
                elif day == 'Jueves':
                    result+="4"
                elif day == 'Viernes':
                    result+="5"
                elif day == 'Sabado':
                    result+="6"
                elif day == 'Domingo':
                    result+="7"
                if index != len(days) - 1 and len(day) > 1:
                    result += ","
            personal.days = result
        personal.save()
        return UpdatePersonal(personal=personal)


class PersonalMutation:
    update_personal = UpdatePersonal().Field()
    create_personal = CreatePersonal().Field()


class DeleteIteration(relay.ClientIDMutation):
    class Input:
        idIteration = graphene.ID(required=True)

    iteration = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, idIteration):
        try:
            with transaction.atomic():
                iter = Iteration.object.get(pk=idIteration)
                iter.delete()
                return DeleteIteration(iteration=True)
        except IntegrityError:
            return DeleteIteration(iteration=False)


class IterationMutation:
    delete_mutation = DeleteIteration().Field()


class CreateMessage(relay.ClientIDMutation):
    class Input:
        algorithm_student = graphene.List(required=False, of_type=graphene.String)
        algorithm_profesor = graphene.List(required=False, of_type=graphene.String)
        type_guard = graphene.List(required=False, of_type=graphene.String)
        date_start = graphene.List(required=True, of_type=graphene.Date)

    message = graphene.Field(MessageNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, algorithm_student, algorithm_profesor,type_guard, date_start):
        message = MessageQueue(state='pending', percent=0)
        message.save()
        if algorithm_profesor:
            for algorithm in algorithm_profesor:
                parameters = Parameters(key="alg_profesor", value=algorithm, message=message)
                parameters.save()
        if algorithm_student:
            for algorithm in algorithm_student:
                parameters = Parameters(key="alg_student", value=algorithm, message=message)
                parameters.save()
        if type_guard:
            for type in type_guard:
                parameters = Parameters(key="guard", value=type, message=message)
                parameters.save()

        if date_start:
            if date_start[0]:
                parameters = Parameters(key="date_student", value=date_start[0], message=message)
                parameters.save()
            if date_start[1]:
                parameters = Parameters(key="date_profesor", value=date_start[1], message=message)
                parameters.save()
        return CreateMessage(message=message)


class MessageMutation:
    create_message = CreateMessage.Field()
