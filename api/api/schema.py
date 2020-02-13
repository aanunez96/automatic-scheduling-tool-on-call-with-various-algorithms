from graphene import Schema

from student.schema import StudentQuery


class RootQuery(StudentQuery):
    pass

schema = Schema(query=RootQuery)