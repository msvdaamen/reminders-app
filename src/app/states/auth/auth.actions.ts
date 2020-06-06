import {createAction, props} from '@ngrx/store';
import {AuthUser} from '../../graphql';


export const setAuth = createAction('[AUTH] Set', props<{auth: AuthUser}>());
export const logout = createAction('[AUTH] Logout');
