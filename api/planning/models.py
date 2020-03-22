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
    ROLES = (
        ('S', 'Student'),
        ('P', 'Profesor'),
    )
    role = models.CharField(max_length=1, choices=ROLES, blank=False, null=False, default='P')
    available = models.BooleanField()
    idUci = models.OneToOneField(person, on_delete=models.CASCADE)
    object = models.Manager()
    profesor = InputProfesorManager()
    student = InputStudentManager


class Iteration(models.Model):
    id = models.AutoField(primary_key=True)
    GUARDS = (
        ('S', 'Student'),
        ('P', 'Profesor'),
    )
    type_guard = models.CharField(max_length=1, choices=GUARDS, blank=False, null=False, default='P')
    algorithm = models.CharField(max_length=200, blank=False, null=False)
    heuristic = models.IntegerField(blank=False, null=False)
    executor = models.OneToOneField(person, on_delete=models.CASCADE, blank=True, null=True)
    object = models.Manager()








#class Shift(models.Model):
 #   number = models.IntegerField(blank=False, null=False)
#  date = models.DateTimeField(blank=False, null=False)
#    person = models.OneToOneField(Personal, blank=True, null=True)

#    class Meta:
 #       abstract = True
