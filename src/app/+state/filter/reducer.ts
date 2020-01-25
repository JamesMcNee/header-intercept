import { Action } from '@ngrx/store';
import { URLFilter } from 'src/app/domain/urlFilter.model';

export interface FilterReducerModel {
    urlFilters: URLFilter[]
}

const defaultState: FilterReducerModel = {
    urlFilters: []
}

export function requestReducer(state: FilterReducerModel = defaultState, action: Action) {
    switch (action.type) {
    }

    return state;
}