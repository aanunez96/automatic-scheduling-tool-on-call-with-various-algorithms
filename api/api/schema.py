from graphene import Schema
from graphene import ObjectType
from student.schema import StudentQuery
from planning.schema import PersonalQuery, IterationQuery, PersonalMutation, MessageMutation, MessageQuery,IterationMutation
from personal.schema import PersonQuery, DirectoryQuery
from repo_plan.schema import ShiftQuery, ShiftMutation


class RootQuery(StudentQuery, PersonQuery, PersonalQuery, ShiftQuery, IterationQuery, MessageQuery, DirectoryQuery):
    pass


class RootMutation(ShiftMutation, PersonalMutation, MessageMutation, IterationMutation, ObjectType):
    pass


schema = Schema(query=RootQuery, mutation=RootMutation)
