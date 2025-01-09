import { gql } from '@apollo/client';

export const REGISTER_INDIVIDUAL = gql`
  mutation RegisterIndividual($input: IndividualInput!) {
    createIndividual(input: $input) {
      id
      email
      firstName
      lastName
      customerType
    }
  }
`;

export const REGISTER_CORPORATION = gql`
  mutation RegisterCorporation($input: CorporationInput!) {
    createCorporation(input: $input) {
      id
      email
      name
      registrationNumber
      customerType
    }
  }
`;