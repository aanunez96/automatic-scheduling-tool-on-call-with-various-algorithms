from repo_plan.models import Shift


class FacadeRepo:
    def get_last_shift_for_person(self, personal, type_guard):
        return Shift.manager.get_last_shift_for_person(personal, type_guard)

    def total_whitout_weekend_for_person(self, personal, type_guard):
        return Shift.manager.total_whitout_weekend_for_person(personal, type_guard)

    def last_shift_last_iteration(self, type_guard):
        return Shift.manager.last_shift_last_iteration(type_guard)
