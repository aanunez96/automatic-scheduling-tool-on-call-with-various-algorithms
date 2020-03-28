from specificAlgorithm.SpecificAlgorithm import SpecificAlgorithm
from student_algorithm.static_algorithm import StaticAlgorithm
from planning.constraints.ConstraintsWeak import Weekend,ShiftsRotations

ALGORITHM_PROFESOR = {
    'metaHeuristic': SpecificAlgorithm()
}

ALGORITHM_STUDENT = {
    'Static': StaticAlgorithm()
}

SHIFT_FOR_PROFESOR = {
    'week': 4,
    'weekend': 6,
}

SHIFT_FOR_STUDENT = {
    'week': 4,
    'weekend': 6,
}

CONSTRAINT_STUDENT_STRONG = {

}

CONSTRAINT_STUDENT_WEAK = {
    ShiftsRotations(),
    Weekend(),
}

CONSTRAINT_PROFESOR_STRONG = {

}

CONSTRAINT_PROFESOR_WEAK = {
    ShiftsRotations(),
    Weekend(),
}
