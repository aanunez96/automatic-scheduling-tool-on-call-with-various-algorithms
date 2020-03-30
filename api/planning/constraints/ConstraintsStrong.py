from planning.constraints.Constriant import Constraint


class WithSmallChildren(Constraint):
    def validate(self, shift, personal):
        if personal.sex == 'M' or personal.children is False:
            return True
        else:
            if shift.date.strftime('%a') != 'Sat' or shift.date.strftime('%a') != 'Sun':
                return False
            else:
                if shift.number == (7 or 8):
                    return True
                else:
                    return False


class OnlyOnceAMonth(Constraint):
    def validate(self, shifts, person):
        count = 0
        for shift in shifts:
            count += shift.personal.count(person)
        if count <= 1:
            return True
        else:
            return False


class WomanProfesorShift(Constraint):
    def validate(self, shift, personal):
        if personal.sex == 'M' or personal.role == 'S':
            return True
        else:
            if shift.number == 1:
                return True
            else:
                return False


class WomanStudentShift(Constraint):
    def validate(self, shift, personal):
        if personal.sex == 'M' or personal.role == 'S':
            return True
        else:
            if shift.number == 6:
                return True
            else:
                return False
