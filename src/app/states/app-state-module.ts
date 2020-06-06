import {MetaReducer, StoreModule} from '@ngrx/store';
import {ModuleWithProviders} from '@angular/core';
import {environment} from '../../environments/environment';
import {AppState} from './app-state.interface';
import * as fromAuth from './auth/auth.reducer';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];


export const AppStateModule: ModuleWithProviders = StoreModule.forRoot({
  auth: fromAuth.reducer
}, { metaReducers, runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  } });
