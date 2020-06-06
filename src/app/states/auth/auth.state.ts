import {User} from '../../graphql';


export interface AuthState {
  user: User;
  accessToken: string;
  isAuthenticated: boolean;
}
