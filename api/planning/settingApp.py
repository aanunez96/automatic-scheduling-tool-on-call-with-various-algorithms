from specificAlgorithm.SpecificAlgorithm import SpecificAlgorithm
from student_algorithm.static_algorithm import StaticAlgorithm
from planning.constraints.ConstraintsWeak import Weekend, ShiftsRotations
from planning.constraints.ConstraintsStrong import *


ALGORITHM_PROFESOR = {
    'metaHeuristic': SpecificAlgorithm()
}

ALGORITHM_STUDENT = {
    'Static': StaticAlgorithm()
}

SHIFT_FOR_PROFESOR = {
    'week': [1, 2, 4, 5],
    'weekend': [8, 1, 2, 3, 4, 5],
}

SHIFT_FOR_STUDENT = {
    'week': [1, 2, 3, 4, 5],
    'weekend': [6, 7, 1, 2, 3, 4, 5],
}

CONSTRAINT_STUDENT_STRONG = {
    WomanStudentShift()
}

CONSTRAINT_STUDENT_WEAK = {
    ShiftsRotations(),
    Weekend(),
}

CONSTRAINT_PROFESOR_STRONG = {
    WithSmallChildren(),
    OnlyOnceAMonth(),
    WomanProfesorShift(),
    SpecificDays(),
}

CONSTRAINT_PROFESOR_WEAK = {
    ShiftsRotations(),
    Weekend(),
}

SHIFT_SCHEDULE = {
    1: 20,
    2: 21,
    3: 22,
    4: 23,
    5: 24,
    6: 8,
    7: 9,
    8: 10,
}
