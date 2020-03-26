from planning.settingApp import *
from planning.src.Plan import Plan
from planning.src import Shift


class CompareSolutions:
    def compare(self, plans, type_guard):
        if len(plans) == 1:
            return plans[0]
        else:
            plan_to_return = Plan(None, None)
            for plan in plans:
                plan.heuristic = self.heuristic(plan.shifts, type_guard)
                if plan.heuristic > plan_to_return.heuristic:
                    plan_to_return = plan

            return plan_to_return

    def heuristic(self, shifts, type_guard):
        if type_guard == 'S' and len(CONSTRAINT_STUDENT_WEAK) == 0:
            return 1
        else:
            constraints = CONSTRAINT_PROFESOR_WEAK if type_guard == 'P' else CONSTRAINT_STUDENT_WEAK
            heuristic = 0

            for shift in shifts:
                for constraint in constraints:
                    heuristic += constraint.evaluateHeuristic(shift)

            return heuristic



