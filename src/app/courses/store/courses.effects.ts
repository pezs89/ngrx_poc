import { Injectable } from '@angular/core';
import { CoursesHttpService } from '../services/courses-http.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromCourses from '../store';
import { concatMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { EmptyError } from 'rxjs';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCourses.loadCourses),
      concatMap(() =>
        this.coursesService.findAllCourses().pipe(
          map(
            courses => fromCourses.loadCoursesSuccess({ courses }),
            catchError(() => EmptyError)
          )
        )
      )
    )
  );

  updateCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromCourses.updateCourse),
        concatMap(action =>
          this.coursesService.saveCourse(
            action.course.id,
            action.course.changes
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private coursesService: CoursesHttpService,
    private actions$: Actions
  ) {}
}
