from graphene import Schema

from student.schema import StudentQuery
from planning.schema import PersonalQuery, IterationlQuery
from personal.schema import PersonQuery, PersonMutation
from repoPlan.schema import ShiftQuery, ShiftMutation


class RootQuery(StudentQuery, PersonQuery, PersonalQuery, ShiftQuery, IterationlQuery):
    pass


class RootMutation(PersonMutation, ShiftMutation):
    pass


schema = Schema(query=RootQuery, mutation=RootMutation)