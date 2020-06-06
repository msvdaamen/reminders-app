import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ApolloQueryResult} from 'apollo-client';
import {AuthUser} from '../graphql';
import {AuthRepository} from "../repositories/auth.repository";
import {AuthState} from "../states/auth/auth.state";

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  constructor(
    private authRepository: AuthRepository,
    private apollo: Apollo,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authRepository.getAuth().pipe(
      map((auth: AuthState) => {
        if (auth.isAuthenticated) {
          return true;
        }
        if (localStorage.getItem('accessToken')) {
         this.apollo.query({
          query: gql`
              query {
                me {
                  user {
                    id
                    name
                    username
                  }
                  accessToken
                }
              }
          `,
         fetchPolicy: 'network-only',
        }).pipe(
           catchError(() => {
             this.router.navigate(['/auth/login']);
             return of(false);
           })
         ).subscribe((data: ApolloQueryResult<{me: AuthUser}>) => {
          if (!data || !data.data) {
            return this.router.parseUrl('auth/login');
          }
          this.authRepository.setAuth(data.data.me);
          this.router.navigate([state.url.split('?')[0]], { queryParams: route.queryParams });
          return true;
        });

          // this.authRepository.me().pipe(
          //   catchError(() => {
          //     this.router.navigate(['/auth/login']);
          //     return of(false);
          //   })
          // ).subscribe((response) => {
          //   if (!response) {
          //     return this.router.parseUrl('auth/login');
          //   }
          //   this.router.navigate([state.url.split('?')[0]], { queryParams: route.queryParams });
          //   return true;
          // });
        } else {
          return this.router.parseUrl('auth/login');
        }
      })
    );
  }

}
