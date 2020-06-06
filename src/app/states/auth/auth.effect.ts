import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffect {


  constructor(
    private actions$: Actions,
    private router: Router
  ) {}


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        this.router.navigate(['./auth/login']);
        localStorage.removeItem('accessToken');
      })
    ), {dispatch: false}
  );

}
