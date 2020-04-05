from django.db import models
# Create your models here.


class Person (models.Model):
    uci = models.CharField(max_length=200, blank=False, null=False)
    object = models.Manager()

    def __str__(self):
        return self.uci
