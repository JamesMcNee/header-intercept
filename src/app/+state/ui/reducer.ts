import { Action } from '@ngrx/store';
import { URLFilter } from 'src/app/domain/urlFilter.model';

export interface UIReducerModel {
    selectedUrlFilter: URLFilter;
}

const defaultState: UIReducerModel = {
    selectedUrlFilter: undefined
}

export function requestReducer(state: UIReducerModel = defaultState, action: Action) {
    switch (action.type) {
    }

    return state;
}