from graphene import Schema
from graphene import ObjectType
from student.schema import StudentQuery
from planning.schema import PersonalQuery, IterationQuery, PersonalMutation, MessageMutation
from personal.schema import PersonQuery
from repoPlan.schema import ShiftQuery, ShiftMutation


class RootQuery(StudentQuery, PersonQuery, PersonalQuery, ShiftQuery, IterationQuery):
    pass


class RootMutation(ShiftMutation, PersonalMutation, MessageMutation, ObjectType):
    pass


schema = Schema(query=RootQuery, mutation=RootMutation)
