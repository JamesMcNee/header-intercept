import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { HeaderReducerModel } from './reducers';

export const selectHeadersFeature: MemoizedSelector<object, HeaderReducerModel> = createFeatureSelector('header');