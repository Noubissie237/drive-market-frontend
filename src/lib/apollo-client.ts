import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/SERVICE-VEHICLE/graphql', // Retirez http://localhost:8079 car nous utilisons le proxy
  credentials: 'include', // Ajoutez ceci pour gérer les cookies si nécessaire
});

const loggerLink = new ApolloLink((operation, forward) => {
  console.log(`GraphQL Request: ${operation.operationName}`, {
    variables: operation.variables,
  });

  return forward(operation).map((response) => {
    console.log(`GraphQL Response: ${operation.operationName}`, {
      data: response.data,
      errors: response.errors,
    });
    return response;
  });
});


export const client = new ApolloClient({
  link: ApolloLink.from([loggerLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  }
});