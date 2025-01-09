import { gql } from '@apollo/client';

// Types
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  engineType: string;
  price: number;
  color: string;
  year: number;
}

// Queries
export const GET_VEHICLES = gql`
  query {
    vehicles {
      id
      brand
      model
      engineType
      price
      color
      year
    }
  }
`;

export const GET_VEHICLES_BY_ENGINE_TYPE = gql`
  query GetVehiclesByEngineType($engineType: String!) {
    vehiclesByEngineType(engineType: $engineType) {
      id
      brand
      model
      engineType
      price
      color
      year
    }
  }
`;