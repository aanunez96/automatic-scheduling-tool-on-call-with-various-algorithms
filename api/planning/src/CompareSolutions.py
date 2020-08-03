from planning.src.Plan import Plan
from planning.settingApp import CONSTRAINT_PROFESOR_WEAK, CONSTRAINT_STUDENT_WEAK
import copy


class CompareSolutions:
    def compare(self, plans, type_guard):
        if len(plans) == 1:
            plans[0].heuristic = self.heuristic(copy.deepcopy(plans[0].shifts), type_guard)
            return plans[0]
        else:
            plan_to_return = Plan(None, None)
            for plan in plans:
                plan.heuristic = self.heuristic(copy.deepcopy(plan.shifts), type_guard)
                if plan.heuristic < plan_to_return.heuristic:
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
                    for personal in shift.personal:
                        heuristic += constraint.evaluate_heuristic(shift, personal)

            return heuristic



