from planning.src.Input import Input
from planning.src.CompareSolutions import CompareSolutions
from planning import settingApp
from planning.models import Iteration
from planning.src.Plan import Plan
from repoPlan.models import Shift


class Composer:

    def __init__(self):
        self.plans_student = []
        self.plans_profesor = []

    def compose(self, algorithmProfesor, algorithmStudent):
        inputProfesor = Input('P')
        inputStudent = Input('S')
        self.generateForAlgorithm(inputProfesor, algorithmProfesor, 'P') if algorithmProfesor else self.generateAll(inputProfesor, 'P')
        self.generateForAlgorithm(inputStudent, inputStudent, 'S') if algorithmStudent else self.generateAll(inputStudent, 'S')
        best_solution_student = CompareSolutions.compare(self.plans_student)
        self.safe(best_solution_student)
        best_solution_profesor = CompareSolutions.compare(self.plans_profesor)
        self.safe(best_solution_profesor)

    def generateAll(self, inputForAlg,typeGuard):
        algorithms = settingApp.ALGORITHM_PROFESOR if typeGuard == 'P' else settingApp.ALGORITHM_STUDENT
        for nameAlgorithm, algorithm in algorithms.items():
            plan = Plan(algorithm.generate(inputForAlg.personal, inputForAlg.shifts, inputForAlg.constraints_strong, inputForAlg.constraints_weak), nameAlgorithm)
            self.plans_profesor.append(plan) if typeGuard == 'P' else self.plans_student.append(plan)

    def generateForAlgorithm(self, inputForAlg, algorithms, typeGuard):
        algorithmsSetting = settingApp.ALGORITHM_PROFESOR if typeGuard == 'P' else settingApp.ALGORITHM_STUDENT
        for algorithm in algorithms:
            plan = Plan(algorithmsSetting[algorithm].generate(inputForAlg.personal, inputForAlg.shifts, inputForAlg.constraints_strong,inputForAlg.constraints_weak), algorithm)
            self.plans_profesor.append(plan) if typeGuard == 'P' else self.plans_student.append(plan)

    def safe(self, plan):
        iteration = Iteration(algorithm=plan.algorihtm, heuristic=plan.heuristic)
        iteration.save()
        for shift in plan.shifts:
            created_shift = Shift(date=shift.date, number=shift.number, person=shift.person.idUci, iteration=iteration.id)
            created_shift.save()





