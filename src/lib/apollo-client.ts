import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const vehicleLink = createHttpLink({
  uri: '/SERVICE-VEHICLE/graphql', 
  credentials: 'include', 
});

const customerLink = createHttpLink({
  uri: '/SERVICE-CUSTOMER/graphql', 
  credentials: 'include', 
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


export const vehicleClient = new ApolloClient({
  link: ApolloLink.from([loggerLink, vehicleLink]),
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

export const customerClient = new ApolloClient({
  link: ApolloLink.from([loggerLink, customerLink]),
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