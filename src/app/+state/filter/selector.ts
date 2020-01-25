import { MemoizedSelector, createSelector } from '@ngrx/store';
import { FilterReducerModel } from './reducer';
import { selectAppFeature } from '../selectors';
import { URLFilter } from 'src/app/domain/urlFilter.model';

export const selectFilterReducer: MemoizedSelector<object, FilterReducerModel> = createSelector(selectAppFeature, app => {
    return app.filter;
});

export const selectURLFilters: MemoizedSelector<object, URLFilter[]> = createSelector(selectFilterReducer, filterReducer => {
    return filterReducer.urlFilters;
});