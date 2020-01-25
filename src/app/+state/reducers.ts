import { ActionReducerMap } from '@ngrx/store'
import { RequestReducerModel } from './request/reducer';
import { FilterReducerModel } from './filter/reducer';
import { UIReducerModel } from './ui/reducer';
import { selectFilterReducer } from './filter/selector';

export const APP_REDUCERS: ActionReducerMap<AppReducerModel> = {
    filter: selectFilterReducer,
    request: undefined,
    ui: undefined
}

export interface AppReducerModel {
    filter: FilterReducerModel;
    request: RequestReducerModel;
    ui: UIReducerModel;
}
export function reducerFactory(): ActionReducerMap<any> {
    return APP_REDUCERS;
}