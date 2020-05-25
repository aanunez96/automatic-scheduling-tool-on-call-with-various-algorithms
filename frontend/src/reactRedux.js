import { combineReducers } from 'redux';
//actions
export const PLANIFICATION_START = 'PLANIFICATION_START';
export const PLANIFICATION_END = 'PLANIFICATION_END';
export const REFETCH_LIST_ITERATION = 'REFETCH_LIST_ITERATION';
export const REFETCH_LIST_SHIFT = 'REFETCH_LIST_SHIFT';
export const REFETCH_PLAN = 'REFETCH_PLAN';

//initial state
export const INITIAL_STATE = {
    planificationStart: false,
    planificationEnd: false,
    listIteration: false,
    listShift: false,
    plan: false,
}

const newGuard = {
    planificationStart: false,
    planificationEnd: true,
    listIteration: true,
    listShift: true,
    plan: true,
}

//reducers
export function reducerApp(state = INITIAL_STATE, action) {
    switch (action.type){
        case PLANIFICATION_END:
            return (state.planificationStart)? newGuard : state
        case REFETCH_LIST_ITERATION:
            return { ...state, listIteration: false}
        case REFETCH_LIST_SHIFT:
            return { ...state, listShift: false}
        case REFETCH_PLAN:
            return { ...state, plan: false}
        case PLANIFICATION_START:
            return { ...state, planificationStart: true}
        default:
            return state
    }
}

