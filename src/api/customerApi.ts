import { gql } from '@apollo/client';

export const CREATE_INDIVIDUAL_CUSTOMER = gql`
  mutation CreateIndividualCustomer($input: IndividualCustomerInput!) {
    createIndividualCustomer(input: $input) {
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
      customerDetails
    }
  }
`;

export const CREATE_CORPORATE_CUSTOMER = gql`
  mutation CreateCorporateCustomer($input: CorporateCustomerInput!) {
    createCorporateCustomer(input: $input) {
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
      customerDetails
      fleetSize
      subsidiaries {
        id
        name
      }
    }
  }
`;


export const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($id: ID!) {
    customerById(id: $id) {
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
      customerDetails
    }
  }
`;

export const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    allCustomers {
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
      customerDetails
    }
  }
`;

export const GET_CORPORATE_CUSTOMER_BY_ID = gql`
  query GetCorporateCustomerById($id: ID!) {
    corporateCustomerById(id: $id) {
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
      customerDetails
      fleetSize
      subsidiaries {
        id
        name
      }
    }
  }
`;

export const UPDATE_INDIVIDUAL_CUSTOMER = gql`
  mutation UpdateIndividualCustomer($id: ID!, $input: CustomerInfoInput!) {
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
      customerDetails
    }
  }
`;

export const DELETE_INDIVIDUAL_CUSTOMER = gql`
  mutation DeleteIndividualCustomer($id: ID!) {
    deleteIndividualCustomer(id: $id)
  }
`;
