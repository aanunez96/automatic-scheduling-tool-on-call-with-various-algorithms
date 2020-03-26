from django.db import models
from personal.models import person
from planning.models import Iteration
import datetime


# Create your models here.
class ManagerShift(models.Manager):
    def get_last_shift (self, id_person):
        return Shift.object.filter(person=id_person).get(iteration=models.Max())

    def total_whitout_weekend(self, id_person):
        total_whitout_weekend = 0
        for iteration in Iteration.object.all():
            shift = datetime.datetime(Shift(Shift.object.filter(iteration=iteration).get(person=id_person)).date).strftime('%a')
            if shift == 'Sat' or shift == 'Sun':
                total_whitout_weekend += 1
            else:
                break
        return total_whitout_weekend


class Shift(models.Model):
    date = models.DateTimeField()
    number = models.IntegerField(blank=False, null=False)
    person = models.ForeignKey(person, on_delete=models.CASCADE)
    iteration = models.ForeignKey(Iteration, on_delete=models.CASCADE)
    object = models.Manager()
    manager = ManagerShift()
