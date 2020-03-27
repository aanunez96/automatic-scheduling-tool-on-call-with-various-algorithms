from planning.src.Input import Input
from planning.src.CompareSolutions import CompareSolutions
from planning import settingApp
from planning.models import Iteration
from planning.src.Plan import Plan
from repoPlan.models import Shift
from personal.models import Person
import copy


class Composer:

    def __init__(self):
        self.plans_student = []
        self.plans_profesor = []

    def compose(self, algorithmProfesor, algorithmStudent):
        input_profesor = Input('P')
        input_student = Input('S')
        self.generateForAlgorithm(input_profesor, algorithmProfesor, 'P') if algorithmProfesor else self.generateAll(input_profesor, 'P')
        self.generateForAlgorithm(input_student, algorithmStudent, 'S') if algorithmStudent else self.generateAll(input_student, 'S')
        compare = CompareSolutions()
        best_solution_student = compare.compare(self.plans_student, 'S')
        best_solution_profesor = compare.compare(self.plans_profesor, 'P')
        return [self.safe(best_solution_profesor, 'P'), self.safe(best_solution_student, 'S')]

    def generateAll(self, inputForAlg,typeGuard):
        algorithms = settingApp.ALGORITHM_PROFESOR if typeGuard == 'P' else settingApp.ALGORITHM_STUDENT
        for nameAlgorithm, algorithm in algorithms.items():
            shifts = copy.deepcopy(inputForAlg.shifts)
            plan = Plan(algorithm.generate(inputForAlg.personal, shifts, inputForAlg.constraints_strong, inputForAlg.constraints_weak), nameAlgorithm)
            self.plans_profesor.append(plan) if typeGuard == 'P' else self.plans_student.append(plan)

    def generateForAlgorithm(self, inputForAlg, algorithms, typeGuard):
        algorithmsSetting = settingApp.ALGORITHM_PROFESOR if typeGuard == 'P' else settingApp.ALGORITHM_STUDENT
        for algorithm in algorithms:
            shifts = copy.deepcopy(inputForAlg.shifts)
            plan = Plan(algorithmsSetting[algorithm].generate(inputForAlg.personal, shifts, inputForAlg.constraints_strong,inputForAlg.constraints_weak), algorithm)
            self.plans_profesor.append(plan) if typeGuard == 'P' else self.plans_student.append(plan)

    def safe(self, plan, type_guard):
        number = Iteration.manager.last_iteration_number(type_guard)+1
        iteration = Iteration(algorithm=plan.algorihtm, heuristic=plan.heuristic, number=number, type_guard=type_guard, date_start=plan.shifts[0].date, date_end=plan.shifts[-1].date)
        iteration.save()

        for shift in plan.shifts:
            created_shift = Shift(date=shift.date, number=shift.number, iteration=iteration)
            created_shift.save()
            for personal in shift.personal:
                person = personal.idUci
                person.shift.add(created_shift)
        return iteration.id




