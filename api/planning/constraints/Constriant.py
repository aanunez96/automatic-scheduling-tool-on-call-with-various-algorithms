class Constraint:
    description = 'this attribute is to describe the Constraint'

    def validate(self, shift, personal):
        return False

    def evaluate_heuristic(self, shift, personal):
        heuristic = 0
        if not self.validate(shift, personal):
            heuristic += 1
        return heuristic

