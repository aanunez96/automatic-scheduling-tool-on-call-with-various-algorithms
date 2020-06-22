# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from planning.src.Composer import Composer
from repo_plan.models import Shift


# Create your views here.
def home(request):
    composer = Composer()
    iteration = composer.compose(False, False)
    shifts_profesor = Shift.object.filter(iteration=iteration[0])
    shifts_student = Shift.object.filter(iteration=iteration[1])
    context = {
        'shifts_profesor': shifts_profesor,
        'shifts_student': shifts_student,
    }

    return render(request, 'index.html', context)
