from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from planning.models import Personal, Iteration, MessageQueue, Parameters
import graphene


class PersonalNode(DjangoObjectType):
    class Meta:
        model = Personal
        use_connection = True
        filter_fields = {
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
        filter_fields = {
            'algorithm': ['iexact'],
            'heuristic': ['exact'],
            'type_guard': ['exact'],
            'number': ['exact'],
            'executor': ['exact'],
            'date_start': ['exact'],
            'date_end': ['exact'],
        }


class MessageNode(DjangoObjectType):
    class Meta:
        model = MessageQueue
        use_connection = True
        filter_fields = {
            'state': ['iexact', 'exact'],
            'percent': ['exact']
        }


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
    message = DjangoFilterConnectionField(MessageNode)


class IterationQuery(ObjectType):
    iteration = DjangoFilterConnectionField(IterationNode)


class UpdatePersonal(relay.ClientIDMutation):
    class Input:
        available = graphene.Boolean(required=True)
        id = graphene.ID(required=True)

    personal = graphene.Field(PersonalNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, available, id):
        personal = Personal.object.get(pk=id)
        personal.available = available
        personal.save()
        return UpdatePersonal(personal=personal)


class PersonalMutation:
    update_personal = UpdatePersonal().Field()


class CreateMessage(relay.ClientIDMutation):
    class Input:
        algorithm_student = graphene.List(required=False, of_type=graphene.String)
        algorithm_profesor = graphene.List(required=False, of_type=graphene.String)
        type_guard = graphene.List(required=False,of_type=graphene.String)
        date_start = graphene.List(required=True,of_type=graphene.Date)

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
