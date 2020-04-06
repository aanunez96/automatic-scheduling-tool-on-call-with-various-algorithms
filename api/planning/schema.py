from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, relay
from planning.models import Personal, Iteration, MessageQueue, Parameters
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
            'algorithm': ['exact'],
            'type_guard': ['exact'],
            'message': ['exact'],
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


class CreateMessage(relay.ClientIDMutation):
    class Input:
        algorithmStudent = graphene.List(of_type=graphene.String)
        algorithmProfesor = graphene.List(of_type=graphene.String)

    message = graphene.Field(MessageNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, algorithmStudent, algorithmProfesor):
        message = MessageQueue(state='pending', percent=0)
        message.save()
        if algorithmProfesor:
            for algorithm in algorithmProfesor:
                parameters = Parameters(algorithm=algorithm, type_guard='P', message=message)
                parameters.save()
        if algorithmStudent:
            for algorithm in algorithmStudent:
                parameters = Parameters(algorithm=algorithm, type_guard='S', message=message)
                parameters.save()
        return CreateMessage(message=message)


class MessageMutation:
    create_message = CreateMessage.Field()
