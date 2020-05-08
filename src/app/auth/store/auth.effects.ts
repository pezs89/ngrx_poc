import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as fromAuth from './auth.actions';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.loginRequest),
      exhaustMap(action => {
        const { email, password } = action.user;
        return this.authService.login(email, password).pipe(
          map(user => fromAuth.loginSuccess({ user })),
          tap(() => this.router.navigate(['/courses'])),
          catchError(() => of(fromAuth.loginFailure()))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.logoutRequest),
      exhaustMap(() => {
        this.router.navigate(['/']);
        return of(fromAuth.logoutSuccess());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
