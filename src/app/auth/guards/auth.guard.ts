import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../_store/app.reducer';
import * as fromAuth from '../store';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.isLoggedIn),
      map((isLoggedIn) => {
        console.log(route, state);
        if (!isLoggedIn) {
          this.router.navigate(['/']);
        }
        return true;
      })
    );
  }
}
