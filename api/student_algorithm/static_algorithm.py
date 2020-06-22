from planning.Algorithm import Algorithm


class StaticAlgorithm(Algorithm):
    def generate(self, students, shifts, constraint_strong, constraint_weak):
        students_x_shift = len(students)//len(shifts)
        rest = len(students) % len(shifts)
        count = 0
        for index, shift in enumerate(shifts):
            s_x_s = students_x_shift + 1 if (index < rest) else students_x_shift
            for i in range(s_x_s):
                shift.personal.append(students[count])
                count += 1
        return shifts
