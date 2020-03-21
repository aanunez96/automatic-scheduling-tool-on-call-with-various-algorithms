# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from personal.models import person


# Create your models here.
class InputProfesorManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(available=True).filter(role='P')


class InputStudentManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(available=True).filter(role='S')


class Personal(models.Model):
    sex = models.BinaryField(blank=False, null=False)
    children = models.BooleanField()
    role = models.CharField(max_length=1, blank=False, null=False)
    available = models.BooleanField()
    idUci = models.OneToOneField(person.idUci, on_delete=models.CASCADE)
    object = models.Manager()
    profesor = InputProfesorManager()
    student = InputStudentManager

class Iteration(models.Model):
    id = models.AutoField(primary_key=True)
    type_guard = models.CharField(max_length=1, blank=False, null=False)
    algorithm = models.CharField(max_length=200, blank=False, null=False)
    heuristic = models.IntegerField(blank=False, null=False)
    executor = models.OneToOneField(person.idUci, on_delete=models.CASCADE)
    object = models.Manager()








#class Shift(models.Model):
 #   number = models.IntegerField(blank=False, null=False)
#  date = models.DateTimeField(blank=False, null=False)
#    person = models.OneToOneField(Personal, blank=True, null=True)

#    class Meta:
 #       abstract = True
