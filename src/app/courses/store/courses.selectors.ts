import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const getCoursesState = createFeatureSelector<fromCourses.CoursesState>(
  'courses'
);

export const selectAllCourses = createSelector(getCoursesState, state =>
  fromCourses.selectAll(state)
);

export const selectBeginnerCourses = createSelector(selectAllCourses, state =>
  state.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(selectAllCourses, state =>
  state.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  state => state.filter(course => course.promo).length
);

export const isCoursesLoading = createSelector(
  getCoursesState,
  state => state.isLoading
);
