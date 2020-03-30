from planning.constraints.Constriant import Constraint
from repoPlan.FacadeRepoPlan import FacadeRepo


class ShiftsRotations (Constraint):
    def validate(self, shift, personal):
        repo = FacadeRepo()
        if shift.number == repo.get_last_shift_for_person(personal, personal.role):
            return False
        else:
            return True


class Weekend(Constraint):
    def validate(self, shift, personal):
        repo = FacadeRepo()
        weekend = repo.total_whitout_weekend_for_person(personal, personal.role)
        if shift.date.strftime('%a') == 'Sat' or shift.date.strftime('%a') == 'Sun':
            weekend += 1
        if weekend <= 2:
            return True
        else:
            return False

