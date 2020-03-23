import datetime
from planning.models import Personal
from planning.models import Iteration
from planning import settingApp
from planning.src import Shift


class Input:

    def __init__(self, typeGuard):
        self.personal = ""
        self.shifts = []
        self.constraints_weak = []
        self.constraints_strong = []
        self.typeGuard = typeGuard
        self.generateInput()

    def generateInput(self):
        self.personal = Personal.profesor.all() if self.typeGuard == 'P' else Personal.student.all()
        self.makeShift()
        self.makeConstraint()

    def makeShift(self):
        last_iteration = Iteration.manager.last_iteration()
        total_shift = Personal.profesor.count()
        shifts = []
        shift = Shift()

        for i in range(1, total_shift):
            date_shift = last_iteration + datetime.timedelta(days=i)
            if self.typeGuard == 'P':
                if datetime.datetime(date_shift).strftime('%a') == 'Sat' or datetime.datetime(date_shift).strftime('%a') == 'Sun':
                    shift_amount = settingApp.SHIFT_FOR_PROFESOR['weekend']
                else:
                    shift_amount = settingApp.SHIFT_FOR_PROFESOR['week']
            else:
                if date_shift.strftime('%a') == 'Sat' or date_shift.strftime('%a') == 'Sun':
                    shift_amount = settingApp.SHIFT_FOR_STUDENT['weekend']
                else:
                    shift_amount = settingApp.SHIFT_FOR_STUDENT['week']
            for number in shift_amount:
                shifts.append(Shift(number, date_shift))
        self.shifts = shifts



    def makeConstraint(self):
        constraints_weak = settingApp.CONSTRAINT_PROFESOR_WEAK if self.typeGuard == 'P' else settingApp.CONSTRAINT_STUDENT_WEAK
        for i in constraints_weak:
            self.constraints_weak.append(i)

        constraints_strong = settingApp.CONSTRAINT_PROFESOR_STRONG if self.typeGuard == 'P' else settingApp.CONSTRAINT_STUDENT_STRONG
        for i in constraints_strong:
            self.constraints_strong.append(i)


