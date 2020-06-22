from datetime import datetime,timedelta
from planning.models import Personal
from planning.models import Iteration
from planning import settingApp
from planning.src.Shift import Shift
from repo_plan.FacadeRepoPlan import FacadeRepo
import pytz


class Input:

    def __init__(self, type_guard, date_input):
        self.personal = ""
        self.shifts = []
        self.constraints_weak = []
        self.constraints_strong = []
        self.type_guard = type_guard
        havana = pytz.timezone('America/Havana')
        self.date_input = havana.localize(datetime.strptime(date_input, '%Y-%m-%d')).date() if date_input else date_input
        print(self.date_input)
        self.generateInput()

    def generateInput(self):
        self.personal = Personal.profesor.all() if self.type_guard == 'P' else Personal.student.all()
        self.makeShift()
        self.makeConstraint()

    def makeShift(self):
        date_last_iteration = self.date_input if self.date_input else Iteration.manager.date_last_iteration(self.type_guard)
        shifts = []
        repo_plan = FacadeRepo()
        if self.type_guard == 'P':
            last_shift = 0 if self.date_input else repo_plan.last_shift_last_iteration(self.type_guard)
            total_shift = Personal.profesor.all().count()
            counter = 0
            day = 0
            shifts_amount = self.shif_amount(date_last_iteration)

            if last_shift != (0 and shifts_amount[-1]):
                day += 1
                for number in shifts_amount[shifts_amount.index(last_shift)+1:]:
                    shifts.append(Shift(counter+1, number, date_last_iteration))
                    counter += 1

            while counter < total_shift:
                date_shift = date_last_iteration + timedelta(days=day)
                day += 1
                for number in self.shif_amount(date_shift):
                    if counter >= total_shift:
                        break
                    shifts.append(Shift(counter+1, number, date_shift))
                    counter += 1
        else:
            date_end = Iteration.manager.date_last_iteration('P')
            total_days = date_end - date_last_iteration
            for counter in range(0 if self.date_input else 1, total_days.days + 2):
                date_shift = date_last_iteration + timedelta(days=counter)
                for number in self.shif_amount(date_shift):
                    shifts.append(Shift(number=number, date=date_shift))

        self.shifts = shifts

    def makeConstraint(self):
        constraints_weak = settingApp.CONSTRAINT_PROFESOR_WEAK if self.type_guard == 'P' else settingApp.CONSTRAINT_STUDENT_WEAK
        for i in constraints_weak:
            self.constraints_weak.append(i)

        constraints_strong = settingApp.CONSTRAINT_PROFESOR_STRONG if self.type_guard == 'P' else settingApp.CONSTRAINT_STUDENT_STRONG
        for i in constraints_strong:
            self.constraints_strong.append(i)

    def shif_amount(self, date_shift):
        if self.type_guard == 'P':
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

