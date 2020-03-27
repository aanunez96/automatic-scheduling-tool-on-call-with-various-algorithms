from datetime import date,timedelta
from planning.models import Personal
from planning.models import Iteration
from planning import settingApp
from planning.src.Shift import Shift
from repoPlan.models import Shift as ShiftModel


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
        last_iteration = Iteration.manager.date_last_iteration(self.typeGuard)
        last_shift = ShiftModel.manager.last_shift_last_iteration(self.typeGuard)
        total_shift = Personal.profesor.all().count()
        shifts = []
        counter = 0

        if last_shift != 0:
            for number in range(last_shift+1, self.shif_amount(last_iteration)+1):
                date_shift = last_iteration + timedelta(days=number)
                shifts.append(Shift(number, date_shift))
                counter += 1

        while counter < total_shift:
            date_shift = last_iteration + timedelta(days=counter)
            for number in range(1, self.shif_amount(date_shift)+1):
                if counter >= total_shift:
                    break
                shifts.append(Shift(number, date_shift))
                counter += 1

        self.shifts = shifts

    def makeConstraint(self):
        constraints_weak = settingApp.CONSTRAINT_PROFESOR_WEAK if self.typeGuard == 'P' else settingApp.CONSTRAINT_STUDENT_WEAK
        for i in constraints_weak:
            self.constraints_weak.append(i)

        constraints_strong = settingApp.CONSTRAINT_PROFESOR_STRONG if self.typeGuard == 'P' else settingApp.CONSTRAINT_STUDENT_STRONG
        for i in constraints_strong:
            self.constraints_strong.append(i)

    def shif_amount(self, date_shift):
        if self.typeGuard == 'P':
            if date_shift.strftime('%a') == 'Sat' or date_shift.strftime('%a') == 'Sun':
                shift_amount = settingApp.SHIFT_FOR_PROFESOR['weekend']
            else:
                shift_amount = settingApp.SHIFT_FOR_PROFESOR['week']
        else:
            if date_shift.strftime('%a') == 'Sat' or date_shift.strftime('%a') == 'Sun':
                shift_amount = settingApp.SHIFT_FOR_STUDENT['weekend']
            else:
                shift_amount = settingApp.SHIFT_FOR_STUDENT['week']
        return shift_amount

