import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Course } from './model/course';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../_store/app.reducer';
import * as fromCourses from './store';

@Injectable()
export class CoursesResolver implements Resolve<Array<Course>> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(fromCourses.isCoursesLoading),
      tap(isLoading => {
        if (!isLoading) {
          this.store.dispatch(fromCourses.loadCourses());
        }
      }),
      first()
    );
  }
}
