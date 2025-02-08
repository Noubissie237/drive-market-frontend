import { gql } from '@apollo/client';

export const GET_CUSTOMER_BY_EMAIL = gql`
  query GetCustomerByEmail($email: String!) {
    customerByEmail(email: $email) {
      id
      name
      password
      address {
        street
        city
        state
        country
        postalCode
      }
      contactInfo {
        email
        phone
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $input: CustomerInfoInput!) {
    updateIndividualCustomer(id: $id, input: $input) {
      id
      name
      address {
        street
        city
        state
        country
        postalCode
      }
      contactInfo {
        email
        phone
      }
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteIndividualCustomer(id: $id)
  }
`;