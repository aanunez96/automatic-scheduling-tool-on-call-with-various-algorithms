from django.db import models
from ..personal.models import person
from ..planning.models import Iteration

# Create your models here.


class Shift(models.Model):
    date = models.DateTimeField()
    number = models.IntegerField(blank=False, null=False)
    person = models.OneToOneField(person.idUci)
    iteration = models.ForeignKey(Iteration, blank=False, null=False)


class ManagerShift(models.Manager):
    pass
