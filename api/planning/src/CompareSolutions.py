from planning.settingApp import *
from planning.src import Plan
from planning.src import Shift

class CompareSolutions:
    def compare(self, plans, typeGuard):
        planToReturn = Plan()
        for plan in plans:
            plan.heuristic = self.heuristic(plan.shifts, typeGuard)
            if plan.heuristic > planToReturn.heuristic:
                planToReturn = plan

        return planToReturn

    def heuristic(self, shifts, typeGuard):
        if typeGuard == 'S' and len(CONSTRAINT_STUDENT_WEAK) == 0:
            return 1
        else:
            constraints = CONSTRAINT_PROFESOR_WEAK if typeGuard == 'P' else CONSTRAINT_STUDENT_WEAK
            heuristic = 0

            for shift in shifts:
                for constraint in constraints:
                    heuristic += constraint.evaluateHeuristic(shift)

            return heuristic



