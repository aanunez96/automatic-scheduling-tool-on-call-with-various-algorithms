from planning.Algorithm import Algorithm


class SpecificAlgorithm(Algorithm):
    def generate(self, personal, shifts, constraint_strong, constraint_weak):
        for index, shift in enumerate(shifts):
            shift.personal.append(personal[index])
        return shifts
