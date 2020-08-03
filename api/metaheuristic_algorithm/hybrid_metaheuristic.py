from planning.Algorithm import Algorithm
from random import choice
from planning.constraints.ConstraintsStrong import OnlyOnceAMonth
import copy


class HybridMetaHeuristicGRASP(Algorithm):

    def generate(self, personal, shifts, constraint_strong, constraint_weak):
        domain_profesors = self.domain(personal, shifts, constraint_strong)
        profesors = []
        reference_shift = []
        shift_assignment = {}

        for index, shift in enumerate(shifts):
            reference_shift.append(shift.id)
            profesors.append(personal[index].id)
            shift_assignment[personal[index].id] = -1

        empty_shift = copy.deepcopy(reference_shift)
        profesors_outside = copy.deepcopy(profesors)
        cambio = True

        while cambio:
            profesor_1 = False
            turno_1 = False
            profesor_2 = False
            turno_2 = False
            total_heuristic = 1000
            cambio = False

            for profesor in profesors:

                possible_shift = []
                selected_shift = False
                aux_heuristic_1 = 0
                aux_heuristic_2 = 0
                add_profesor = False

                for shift_x_select in domain_profesors[profesor]:
                    if shift_x_select in empty_shift:
                        possible_shift.append(shift_x_select)

                # esto es para que las mujeres y las que tengan niños tengan prioridad en la asiganacion
                suport_woman = len(constraint_weak) + 1 if personal[profesors.index(profesor)].sex == 'F' else 0
                suport_woman = suport_woman * 2 if personal[profesors.index(profesor)].children else suport_woman

                # esto es para compensar la heuristica pa que mientras menos turnos menos heuristica tengas
                suport_heuristic = len(possible_shift) - suport_woman

                if profesor in profesors_outside:
                    if possible_shift:
                        selected_shift = choice(possible_shift)
                        possible_shift.remove(selected_shift)
                        add_profesor = True
                else:
                    selected_shift = copy.deepcopy(shift_assignment[profesor])

                aux_profesor = copy.deepcopy(profesors_outside)

                if profesor in aux_profesor:
                    aux_profesor.remove(profesor)

                new_profesor = False if personal[profesors.index(profesor)].children and personal[profesors.index(profesor)].sex == 'F' else self.search_profesor_for_sustitution(selected_shift, aux_profesor, domain_profesors)

                if new_profesor and possible_shift:
                    new_shift = choice(possible_shift)
                    for constraint in constraint_weak:
                        aux_heuristic_1 += constraint.evaluate_heuristic(shifts[reference_shift.index(new_shift)], personal[profesors.index(profesor)])
                        aux_heuristic_2 += constraint.evaluate_heuristic(shifts[reference_shift.index(selected_shift)], personal[profesors.index(new_profesor)])

                    if total_heuristic > (aux_heuristic_2 + aux_heuristic_1)/2 + suport_heuristic:
                        total_heuristic = (aux_heuristic_2 + aux_heuristic_1)/2 + suport_heuristic
                        profesor_1 = profesor
                        profesor_2 = new_profesor
                        turno_1 = new_shift
                        turno_2 = selected_shift
                elif add_profesor:
                    for constraint in constraint_weak:
                        aux_heuristic_1 += constraint.evaluate_heuristic(
                            shifts[reference_shift.index(selected_shift)], personal[profesors.index(profesor)])

                    if total_heuristic > aux_heuristic_1 + suport_heuristic:
                        total_heuristic = aux_heuristic_1 + suport_heuristic
                        profesor_1 = profesor
                        turno_1 = selected_shift

            if profesor_1 and turno_1:
                cambio = True
                shift_assignment[profesor_1] = turno_1
                if profesor_1 in profesors_outside:
                    profesors_outside.remove(profesor_1)
                if turno_1 in empty_shift:
                    empty_shift.remove(turno_1)
                if profesor_2 and turno_2:
                    shift_assignment[profesor_2] = turno_2
                    if profesor_2 in profesors_outside:
                        profesors_outside.remove(profesor_2)
                    if turno_2 in empty_shift:
                        empty_shift.remove(turno_2)
            print(shift_assignment)
        print('<<<<<<<<asignacion>>>>>>>>>>>')
        for profe, shift in shift_assignment.items():
            if shift != -1:
                turno = shifts[reference_shift.index(shift)]
                profesor = personal[profesors.index(profe)]
                turno.personal.append(profesor)

        return shifts

# TODO hacer lo la permuta al mejor vecino

    def domain(self, personal, shifts, constraint_strong):
        domain_profesors = {}

        for profesor in personal:
            domain_profesor = []
            for shift in shifts:
                shift_valid = True
                for constraint in constraint_strong:
                    if not isinstance(constraint, OnlyOnceAMonth):
                        shift_valid = constraint.validate(shift, profesor)
                    if not shift_valid:
                        break
                if shift_valid:
                    domain_profesor.append(shift.id)
            domain_profesors[profesor.id] = domain_profesor
        return domain_profesors

    def search_profesor_for_sustitution(self, selected_shift, profesors, domain):
        possible_profesor = []
        for profesor in profesors:
            if selected_shift in domain[profesor]:
                possible_profesor.append(profesor)
        if possible_profesor:
            return choice(possible_profesor)
        else:
            return False



