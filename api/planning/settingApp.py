from specific_algorithm.SpecificAlgorithm import SpecificAlgorithm
from student_algorithm.static_algorithm import StaticAlgorithm
from planning.constraints.ConstraintsWeak import Weekend, ShiftsRotations
from planning.constraints.ConstraintsStrong import *
from metaheuristic_algorithm.hybrid_metaheuristic import HybridMetaHeuristicGRASP


ALGORITHM_PROFESOR = {
    'staticProfesor': SpecificAlgorithm(),
    'grasp': HybridMetaHeuristicGRASP(),
}

ALGORITHM_STUDENT = {
    'staticStudent': StaticAlgorithm()
}

SHIFT_FOR_PROFESOR = {
    'week': [1, 2, 3, 4, 5],
    'weekend': [1, 2, 3, 4, 5, 7],
}

SHIFT_FOR_STUDENT = {
    'week': [1, 2, 3, 4, 5],
    'weekend': [6, 7, 1, 2, 3, 4],
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
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 8,
    7: 10,
}
