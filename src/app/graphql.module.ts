import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {WebSocketLink} from 'apollo-link-ws';
import {setContext} from 'apollo-link-context';
import {ApolloLink, split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';
import {onError} from 'apollo-link-error';
import {Router} from '@angular/router';
import {AuthRepository} from "./repositories/auth.repository";

const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, router: Router, authRepository: AuthRepository) {

  // Create a WebSocket link:
  const ws = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
      reconnect: true
    }
  });

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('accessToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
  });

  const err = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // @ts-ignore
        if (message && message.statusCode === 401) {
          router.navigate(['/auth/login']);
          localStorage.removeItem('accessToken');
          authRepository.logout();
        }
      });
    }
  });

  const http = ApolloLink.from([basic, auth, err, httpLink.create({ uri })]);
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      // @ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http
  );

  const defaultOptions = {
    watchQuery: { fetchPolicy: 'network-only' },
  };


  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions
  };
}

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Router, AuthRepository],
    },
  ],
})
export class GraphQLModule {}
