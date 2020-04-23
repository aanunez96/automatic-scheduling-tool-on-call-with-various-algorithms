# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from datetime import date
from django.core.validators import validate_comma_separated_integer_list


# Create your models here.
class InputProfesorManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(available=True).filter(role='P')


class InputStudentManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(available=True).filter(role='S')


class Personal(models.Model):
    SEX = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    sex = models.CharField(max_length=1, choices=SEX, blank=False, null=False)
    children = models.BooleanField()
    ROLES = (
        ('S', 'Student'),
        ('P', 'Profesor'),
    )
    days = models.CharField(validators=[validate_comma_separated_integer_list], max_length=20, default='')
    role = models.CharField(max_length=1, choices=ROLES, blank=False, null=False, default='P')
    available = models.BooleanField(default=True)
    person = models.OneToOneField('personal.Person', on_delete=models.CASCADE)
    object = models.Manager()
    profesor = InputProfesorManager()
    student = InputStudentManager()

    def __str__(self):
        return str(self.person) + "-" + self.role


class MessageQueue(models.Model):
    id = models.AutoField(primary_key=True)
    STATES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('processed', 'Processed'),
        ('error', 'Error'),
    )
    state = models.CharField(max_length=10, choices=STATES, blank=False, null=False, default='pending')
    percent = models.SmallIntegerField()
    object = models.Manager()


class ManagerIteration(models.Manager):
    def date_last_iteration(self, type_guard):
        max = Iteration.object.filter(type_guard=type_guard).aggregate(models.Max('number'))
        if max['number__max'] is None:
            return date.today()
        else:
            return Iteration.object.filter(type_guard=type_guard).get(number=max['number__max']).date_end

    def last_iteration_number(self, type_guard):
        max = Iteration.object.filter(type_guard=type_guard).aggregate(models.Max('number'))
        if max['number__max'] is None:
            return 0
        else:
            return Iteration.object.filter(type_guard=type_guard).get(number=max['number__max']).number

    def last_iteration_id(self, type_guard):
        max = Iteration.object.filter(type_guard=type_guard).aggregate(models.Max('number'))
        if max['number__max'] is None:
            return None
        return Iteration.object.filter(type_guard=type_guard).get(number=max['number__max']).id


class Iteration(models.Model):
    id = models.AutoField(primary_key=True)
    algorithm = models.CharField(max_length=200, blank=False, null=False)
    heuristic = models.IntegerField(blank=False, null=False)
    number = models.IntegerField(blank=False, null=False)
    ROLES = (
        ('S', 'Student'),
        ('P', 'Profesor'),
    )
    type_guard = models.CharField(max_length=1, choices=ROLES, blank=False, null=False, default='P')
    executor = models.OneToOneField('personal.Person', on_delete=models.SET_NULL, blank=True, null=True)
    date_start = models.DateField(blank=False, null=False)
    date_end = models.DateField(blank=False, null=False)
    message = models.ForeignKey(MessageQueue, on_delete=models.SET_NULL, blank=True, null=True)
    object = models.Manager()
    manager = ManagerIteration()

    def __str__(self):
        return str(self.number) + '-' + self.type_guard


class Parameters(models.Model):
    KEYS = (
        ('alg_student', 'Algorithm Student'),
        ('alg_profesor', 'Algorithm Profesor'),
        ('guard', 'Type Guard'),
        ('date_start', 'Date Start'),
    )
    key = models.CharField(max_length=255, choices=KEYS, blank=False, null=False)
    value = models.CharField(max_length=255, blank=False, null=False)
    message = models.ForeignKey(MessageQueue, on_delete=models.CASCADE)
    object = models.Manager()
