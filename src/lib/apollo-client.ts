import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

// Créer des liens HTTP pour chaque service
const vehicleLink = createHttpLink({
  uri: '/SERVICE-VEHICLE/graphql',
  credentials: 'include',
});

const customerLink = createHttpLink({
  uri: '/SERVICE-CUSTOMER/graphql',
  credentials: 'include',
});

const cartLink = createHttpLink({
  uri: '/SERVICE-CART/graphql',
  credentials: 'include',
});

const orderLink = createHttpLink({
  uri: '/SERVICE-ORDER/graphql',
  credentials: 'include',
});

const paymentLink = createHttpLink({
  uri: '/SERVICE-PAYMENT/graphql',
  credentials: 'include',
});

const documentLink = createHttpLink({
  uri: '/SERVICE-DOCUMENT/graphql',
  credentials: 'include',
});

// Logger pour les requêtes GraphQL (optionnel)
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

// Créer un client Apollo unifié
const unifiedLink = ApolloLink.split(
  (operation) => operation.getContext().service === 'customer',
  customerLink,
  ApolloLink.split(
    (operation) => operation.getContext().service === 'cart',
    cartLink,
    ApolloLink.split(
      (operation) => operation.getContext().service === 'order',
      orderLink,
      ApolloLink.split(
        (operation) => operation.getContext().service === 'payment',
        paymentLink,
        ApolloLink.split(
          (operation) => operation.getContext().service === 'document',
          documentLink,
          vehicleLink // Par défaut, utiliser vehicleLink
        )
      )
    )
  )
);

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([loggerLink, unifiedLink]),
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
  },
});