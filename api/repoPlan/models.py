from django.db import models
from planning.models import Iteration
from planning.models import Personal

import datetime


# Create your models here.
class ManagerShift(models.Manager):
    def get_last_shift_for_person (self, id_person, type_guard):
        last_iteration = Iteration.manager.last_iteration_id(type_guard)
        id_uci = Personal.object.get(id=id_person).idUci.id
        return Shift.object.filter(person=id_uci).get(iteration=last_iteration)

    def total_whitout_weekend_for_person(self, id_person, type_guard):
        total_whitout_weekend = 0
        for iteration in Iteration.object.filter(type_guard=type_guard).order_by('number'):
            shift = Shift.object.filter(iteration=iteration).get(person=id_person).date.strftime('%a')
            if shift == 'Sat' or shift == 'Sun':
                total_whitout_weekend += 1
            else:
                break
        return total_whitout_weekend

    def last_shift_last_iteration(self, type_guard):
        iteration_id = Iteration.manager.last_iteration_id(type_guard)
        if iteration_id is None:
            return 0
        date = Shift.object.filter(iteration=iteration_id).aggregate(models.Max('date'))
        number = Shift.object.filter(iteration=iteration_id).filter(date=date['date__max']).aggregate(models.Max('number'))
        return number['number__max']


class Shift(models.Model):
    date = models.DateTimeField()
    number = models.IntegerField(blank=False, null=False)
    iteration = models.ForeignKey(Iteration, on_delete=models.CASCADE)
    object = models.Manager()
    manager = ManagerShift()
