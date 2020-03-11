# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from planning.models import Iteration
from planning.models import Personal

from django.contrib import admin

# Register your models here.
admin.site.register(Iteration)
admin.site.register(Personal)
