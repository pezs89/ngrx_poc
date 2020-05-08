import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as CoursesActions from './courses.actions';
import { Course } from '../model/course';
import { compareCourses } from './courses.utils';

export interface CoursesState extends EntityState<Course> {
  isLoading: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialState = adapter.getInitialState({ isLoading: false });

export const courseshReducer = createReducer<CoursesState>(
  initialState,
  on(CoursesActions.loadCourses, state => ({
    ...state,
    isLoading: true,
  })),
  on(CoursesActions.loadCoursesSuccess, (state, action) =>
    adapter.addAll(action.courses, { ...state, isLoading: false })
  ),
  on(CoursesActions.updateCourse, (state, action) =>
    adapter.updateOne(action.course, state)
  )
);

export const { selectAll } = adapter.getSelectors();
