import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as AuthActions from '../states/auth/auth.actions';
import {AuthUser} from '../graphql';
import {AppState} from "../states/app-state.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {

  private isAuthenticated$ = this.store.pipe(select(appState => appState.auth.isAuthenticated));
  private auth$ = this.store.pipe(select(appState => appState.auth));

  constructor(
    private store: Store<AppState>
  ) {}

  getAuth() {
    return this.auth$;
  }

  isAuthenticated() {
    return this.isAuthenticated$;
  }

  setAuth(auth: AuthUser) {
    this.store.dispatch(AuthActions.setAuth({auth}));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
