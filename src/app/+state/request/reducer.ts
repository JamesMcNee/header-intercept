import { URLFilter } from 'src/app/domain/urlFilter.model';
import { Action } from '@ngrx/store';
import { ADD_REQUEST_HEADER_OVERRIDE, AddRequestHeaderOverride } from './command.actions';

export interface RequestReducerModel {
    urlFilters: URLFilter[]
}

const defaultState: RequestReducerModel = {
    urlFilters: []
}

export function requestReducer(state: RequestReducerModel = defaultState, action: Action) {
    switch (action.type) {
        case ADD_REQUEST_HEADER_OVERRIDE:
            const typedAction: AddRequestHeaderOverride = (action as AddRequestHeaderOverride);

            return Object.assign({}, state, {
                // urlFilters: state.urlFilters.push(typedAction.payload)
            });
    }

    return state;
}