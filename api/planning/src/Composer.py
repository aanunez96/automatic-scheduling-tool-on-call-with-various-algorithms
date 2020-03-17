from .Input import Input
from . import CompareSolutions
from .. import settingApp
from ..models import Iteration
from .Plan import Plan
from ...repoPlan.models import Shift


class Composer:

    def __init__(self):
        self.plans = []

    def compose(self, algorithmProfesor, algorithmStudent):
        inputProfesor = Input('P')
        inputStudent = Input('S')
        self.generateForAlgorithm(inputProfesor, algorithmProfesor, 'P') if algorithmProfesor else self.generateAll(inputProfesor, 'P')
        self.generateForAlgorithm(inputStudent, inputStudent, 'S') if algorithmStudent else self.generateAll(inputStudent, 'S')
        bestSolution = CompareSolutions.compare(self.plans)
        self.safe(bestSolution)

    def generateAll(self, inputForAlg,typeGuard):
        algorithms = settingApp.ALGORITHM_PROFESOR if typeGuard == 'P' else settingApp.ALGORITHM_STUDENT
        for nameAlgorithm, algorithm in algorithms.items():
            plan = Plan(algorithm.generate(inputForAlg.personal, inputForAlg.shifts, inputForAlg.constraints), nameAlgorithm)
            self.plans.append(plan)

    def generateForAlgorithm(self, inputForAlg, algorithms, typeGuard):
        algorithmsSetting = settingApp.ALGORITHM_PROFESOR if typeGuard == 'P' else settingApp.ALGORITHM_STUDENT
        for algorithm in algorithms:
            plan = Plan(algorithmsSetting[algorithm].generate(inputForAlg.personal, inputForAlg.shifts, inputForAlg.constraints), algorithm)
            self.plans.append(plan)

    def safe(self, plan):
        iteration = Iteration(algorithm=plan.algorihtm, heuristic=plan.heuristic)
        iteration.save()
        for shift in plan.shifts:
            created_shift = Shift(date=shift.date, number=shift.number, person=shift.person.idUci, iteration=iteration.id)
            created_shift.save()





