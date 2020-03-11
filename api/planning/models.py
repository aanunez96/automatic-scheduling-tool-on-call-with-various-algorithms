# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Iteration(models.Model):
    algorithm = models.CharField(max_length = 200, blank = False, null = False)
    heuristic = models.IntegerField(blank = False, null = False)
    #executor

class Personal(models.Model):
    sex = models.BinaryField(blank = False, null = False)
    algorithm = models.CharField(max_length = 200, blank = False, null = False)
    children = models.BooleanField()
    available = models.BooleanField()
