import { Action } from '@ngrx/store';
import { HeaderOverride } from 'src/app/domain/headerOverride.model';

const namespace = '[RequestCommand]';
export const ADD_REQUEST_HEADER_OVERRIDE = `${namespace} ADD_REQUEST_HEADER_OVERRIDE`;

export class AddRequestHeaderOverride implements Action {
    readonly type = ADD_REQUEST_HEADER_OVERRIDE;

    constructor(readonly payload: HeaderOverride) {}
}