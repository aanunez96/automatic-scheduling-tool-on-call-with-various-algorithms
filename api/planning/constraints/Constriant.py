class Constraint:

    def validate(self, shift, person):
        return False

    def evaluate_heuristic(self, shifts):
        heuristic = 0
        for shift in shifts:
            for personal in shift.personal:
                print(self.validate(shift, personal))
                if not self.validate(shift, personal):
                    heuristic += 1
        return heuristic

