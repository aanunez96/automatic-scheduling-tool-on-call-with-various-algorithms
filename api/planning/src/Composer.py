from planning.src.Input import Input
from planning.src.CompareSolutions import CompareSolutions
from planning import settingApp
from planning.models import Iteration
from planning.src.Plan import Plan
from planning.settingApp import CONSTRAINT_PROFESOR_STRONG,CONSTRAINT_STUDENT_STRONG
from repoPlan.models import Shift
from planning.constraints.ConstraintsStrong import OnlyOnceAMonth
import copy
from django.db import transaction, IntegrityError
import datetime
from planning.settingApp import SHIFT_SCHEDULE

class Composer:

    def __init__(self, message):
        self.plans_student = []
        self.plans_profesor = []
        self.message = message

    def compose(self, algorithm_profesor, algorithm_student, guard, date_profesor,date_student):
        returned = []
        compare = CompareSolutions()

        input_profesor = Input('P')
        self.message.percent = 10
        self.message.save()
        self.generateForAlgorithm(input_profesor, algorithm_profesor, 'P') if algorithm_profesor else self.generateAll(input_profesor, 'P')
        self.message.percent = 50
        self.message.save()
        best_solution_profesor = compare.compare(self.plans_profesor, 'P')
        self.message.percent = 70
        self.message.save()
        returned.append(self.save(best_solution_profesor, 'P'))

        input_student = Input('S')
        self.message.percent = 80
        self.message.save()
        self.generateForAlgorithm(input_student, algorithm_student, 'S') if algorithm_student else self.generateAll(input_student, 'S')
        best_solution_student = compare.compare(self.plans_student, 'S')
        self.message.percent = 90
        self.message.save()
        returned.append(self.save(best_solution_student, 'S'))

        return returned

    def generateAll(self, input,typeGuard):
        algorithms = settingApp.ALGORITHM_PROFESOR if typeGuard == 'P' else settingApp.ALGORITHM_STUDENT
        for name_algorithm, algorithm in algorithms.items():
            shifts = copy.deepcopy(input.shifts)
            plan = Plan(algorithm.generate(input.personal, shifts, input.constraints_strong, input.constraints_weak), name_algorithm)
            self.plans_profesor.append(plan) if typeGuard == 'P' else self.plans_student.append(plan)

    def generateForAlgorithm(self, input, algorithms, type_guard):
        algorithms_setting = settingApp.ALGORITHM_PROFESOR if type_guard == 'P' else settingApp.ALGORITHM_STUDENT
        for algorithm in algorithms:
            shifts = copy.deepcopy(input.shifts)
            plan = Plan(algorithms_setting[algorithm.value].generate(input.personal, shifts, input.constraints_strong, input.constraints_weak), algorithm.value)
            self.plans_profesor.append(plan) if type_guard == 'P' else self.plans_student.append(plan)

    def save(self, plan, type_guard):
        try:
            with transaction.atomic():
                number = Iteration.manager.last_iteration_number(type_guard)+1
                iteration = Iteration(
                    algorithm=plan.algorihtm,
                    heuristic=plan.heuristic,
                    number=number,
                    type_guard=type_guard,
                    date_start=plan.shifts[0].date,
                    date_end=plan.shifts[-1].date,
                    message=self.message
                )
                iteration.save()

                for shift in plan.shifts:
                    created_shift = Shift(date=datetime.datetime.combine(shift.date,datetime.time(SHIFT_SCHEDULE[shift.number])), number=shift.number, iteration=iteration)
                    created_shift.save()
                    for personal in shift.personal:
                        person = personal.person
                        created_shift.person.add(person)
                return iteration.id
        except IntegrityError:
            return -1

    def validate_solution(self, plan, type_guard):
        constraints = CONSTRAINT_PROFESOR_STRONG if type_guard == 'P' else CONSTRAINT_STUDENT_STRONG
        invalid_shifts = []
        for shift in plan.shifts:
            for personal in shift.personal:
                for constraint in constraints:
                    if isinstance(constraint, OnlyOnceAMonth):
                        validate = constraint.validate(plan.shifts, personal)
                    else:
                        validate = constraint.validate(shift, personal)
                    if not validate:
                        invalid_shifts.append((shift, constraint.description, personal))

        return invalid_shifts
