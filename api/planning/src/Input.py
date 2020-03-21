import calendar
import time
from ..models import Personal
from .. import settingApp
from .Shift import Shift


class Input:

    def __init__(self, typeGuard):
        self.personal = ""
        self.shifts = []
        self.constraints_weak = []
        self.constraints_strong = []
        self.typeGuard = typeGuard
        self.generateInput()

    def generateInput(self):
        self.personal = Personal.profesor if self.typeGuard == 'P' else Personal.student
        shiftForDay = settingApp.SHIFT_FOR_PROFESOR if self.typeGuard == 'P' else settingApp.SHIFT_FOR_STUDENT
        self.makeShift(shiftForDay)
        self.makeConstraint()

    def makeShift(self, shiftForDay):
        localtime = time.localtime(time.time())
        month = calendar.monthrange(localtime.tm_year, localtime.tm_mon)
        shift = Shift().person
        for i in range(month[1]):
            pass

    def makeConstraint(self):
        constraints_weak = settingApp.CONSTRAINT_PROFESOR_WEAK if self.typeGuard == 'P' else settingApp.CONSTRAINT_STUDENT_WEAK
        for i in constraints_weak:
            self.constraints_weak.append(i)

        constraints_strong = settingApp.CONSTRAINT_PROFESOR_STRONG if self.typeGuard == 'P' else settingApp.CONSTRAINT_STUDENT_STRONG
        for i in constraints_strong:
            self.constraints_strong.append(i)


