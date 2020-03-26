from planning import Algorithm


class SpecificAlgorithm():
    def generate(self, personal, shifts, constraint_strong, constraint_weak):
        for index, shift in enumerate(shifts):
            shift.personal = personal[index]
        return shifts
