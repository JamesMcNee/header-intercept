import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import { AppReducerModel } from './reducers';

export const selectAppFeature: MemoizedSelector<object, AppReducerModel> = createFeatureSelector('app');