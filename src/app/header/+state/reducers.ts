import { ActionReducerMap } from '@ngrx/store'

export const HEADER_REDUCERS: ActionReducerMap<HeaderReducerModel> = {
    
}

export interface HeaderReducerModel {

}
export function reducerFactory(): ActionReducerMap<any> {
    return HEADER_REDUCERS;
}