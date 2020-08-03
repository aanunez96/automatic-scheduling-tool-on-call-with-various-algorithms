from graphene import Schema
from graphene import ObjectType
from planning.schema import PersonalQuery, IterationQuery, PersonalMutation, MessageMutation, MessageQuery,IterationMutation
from personal.schema import PersonQuery, DirectoryQuery
from repo_plan.schema import ShiftQuery, ShiftMutation


class RootQuery(PersonQuery, PersonalQuery, ShiftQuery, IterationQuery, MessageQuery, DirectoryQuery):
    pass


class RootMutation(ShiftMutation, PersonalMutation, MessageMutation, IterationMutation, ObjectType):
    pass


schema = Schema(query=RootQuery, mutation=RootMutation)
