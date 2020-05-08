import { createAction, props, UPDATE } from '@ngrx/store';
import { Course } from '../model/course';
import { Update } from '@ngrx/entity';

export const loadCourses = createAction('[Courses] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Array<Course> }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure'
);

export const updateCourse = createAction(
  '[Edit Course Modal] Update Course',
  props<{ course: Update<Course> }>()
);
