from planning.constraints.Constriant import Constraint
from repoPlan.models import Shift as ModelShift


class ShiftsRotations (Constraint):
    def validate(self, shift, personal):
        if shift.number == ModelShift.manager.get_last_shift_for_person(personal, personal.role):
            return False
        else:
            return True

    def evaluate_heuristic(self, shifts):
        heuristic = 0
        for shift in shifts:
            for personal in shift.personal:
                print(self.validate(shift, personal))
                if not self.validate(shift, personal):
                    heuristic += 1
        return heuristic


class Weekend(Constraint):
    def validate(self, shift, personal):
        weekend = ModelShift.manager.total_whitout_weekend_for_person(personal, personal.role)
        if shift.date.strftime('%a') == 'Sat' or shift.date.strftime('%a') == 'Sun':
            weekend += 1
        print(personal.id)
        print(weekend)
        if weekend <= 2:
            return True
        else:
            return False

    def evaluate_heuristic(self, shifts):
        heuristic = 0
        for shift in shifts:
            for personal in shift.personal:
                if not self.validate(shift, personal):
                    heuristic += 1
        return heuristic
