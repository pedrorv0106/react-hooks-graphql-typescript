import React from 'react';
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GetToken } from './Screens/Auth/helpers/amplify';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HASURA_GRAPHQL,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await GetToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const Client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default ({ children }: any) => (
  <ApolloProvider client={Client}>{children}</ApolloProvider>
);
