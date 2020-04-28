from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType, List

from student.models import Student


class StudentType(DjangoObjectType):
    class Meta:
        model = Student
        use_connection = True
        filter_fields = {
            "uci_id": ["exact", "icontains", "istartswith"],
        }


class StudentQuery(ObjectType):
    students = DjangoFilterConnectionField(StudentType)
