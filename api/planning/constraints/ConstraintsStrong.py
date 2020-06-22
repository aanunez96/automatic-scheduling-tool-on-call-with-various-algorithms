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
            if shift.number in [1, 2, 3]:
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


class SpecificDays(Constraint):
    def validate(self, shift, personal):
        day = {
            'Mon': '1',
            'Tue': '2',
            'Wed': '3',
            'Thu': '4',
            'Fri': '5',
            'Sat': '6',
            'Sun': '7',
        }

        if personal.days.find(day[shift.date.strftime('%a')]) != -1:
            return False
        else:
            return True


class Prueba(Constraint):
    def validate(self, shift, person):
        return True
