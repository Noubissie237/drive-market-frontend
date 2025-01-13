import { gql } from '@apollo/client';

// Requête pour récupérer tous les véhicules
export const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      id
      name
      price
      stock
      status
      specifications
      images {
        id
        url
        caption
        order
      }
      options {
        id
        name
        description
        price
        incompatibleOptions {
          id
          name
        }
      }
    }
  }
`;

// Mutation pour créer un véhicule
export const ADD_VEHICLE = gql`
  mutation AddVehicle($type: VehicleType!, $propulsion: PropulsionType!) {
    createVehicle(type: $type, propulsion: $propulsion) {
      id
      name
      price
      stock
      status
    }
  }
`;

// Mutation pour mettre à jour un véhicule
export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($id: ID!, $name: String, $price: Float, $stock: Int) {
    updateVehicle(id: $id, name: $name, price: $price, stock: $stock) {
      id
      name
      price
      stock
      status
    }
  }
`;

// Mutation pour supprimer un véhicule
export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($id: ID!) {
    deleteVehicle(id: $id)
  }
`;

// Mutation pour ajouter une option à un véhicule
export const ADD_OPTION_TO_VEHICLE = gql`
  mutation AddOptionToVehicle($vehicleId: ID!, $optionInput: VehicleOptionInput!) {
    addOptionToVehicle(vehicleId: $vehicleId, optionInput: $optionInput) {
      id
      name
      description
      price
    }
  }
`;

// Requête pour récupérer les véhicules par critères
export const GET_VEHICLES_BY_CRITERIA = gql`
  query GetVehiclesByCriteria($criteria: SearchCriteriaInput!) {
    vehiclesByCriteria(criteria: $criteria) {
      id
      name
      price
      stock
      status
      specifications
      images {
        id
        url
      }
    }
  }
`;

// Requête pour récupérer les véhicules par statut
export const GET_VEHICLES_BY_STATUS = gql`
  query GetVehiclesByStatus($status: VehicleStatus!) {
    vehiclesByStatus(status: $status) {
      id
      name
      price
      stock
      status
    }
  }
`;
