import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:8079/SERVICE-VEHICLE/graphql'
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});