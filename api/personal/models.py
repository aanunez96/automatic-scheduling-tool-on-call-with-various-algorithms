from django.db import models
# Create your models here.


class MangerPerson(models.Manager):
    def person_by_id_uci(self, uci):
        pass
       # return Person.object.get(Uci=uci)


class Person (models.Model):
    Uci = models.CharField(max_length=200, blank=False, null=False)
    object = models.Manager()
    manager = MangerPerson()

    def __str__(self):
        return self.Uci
