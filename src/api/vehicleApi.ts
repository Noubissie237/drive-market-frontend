import { gql } from '@apollo/client';

// Requête pour récupérer un véhicule précis
export const GET_VEHICLE = gql`
  query GetVehicle($id: ID!) {
    vehicle(id: $id) {
      id
      name
      price
      type
      propulsion
      specifications
      batteryCapacity
      chargingTime
      batteryRange
      fuelCapacity
      consumption
      emissionClass
      images {
        url
      }
      options {
        id
        name
        description
        price
        incompatibleOptions {
          id
        }
      }
    }
  }
`;


// Requête pour récupérer tous les véhicules
export const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      id
      name
      price
      type
      propulsion
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
  mutation AddVehicle(
    $type: VehicleType!
    $propulsion: PropulsionType!
    $name: String
    $price: Float
    $stock: Int
    $specifications: String
    $images: [VehicleImageInput]
    $options: [VehicleOptionInput]
  ) {
    createVehicle(
      type: $type
      propulsion: $propulsion
      name: $name
      price: $price
      stock: $stock
      specifications: $specifications
      images: $images
      options: $options
    ) {
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
      }
    }
  }
`;

// Mutation pour mettre à jour un véhicule
export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle(
    $id: ID!
    $name: String
    $price: Float
    $stock: Int
    $specifications: String
    $images: [VehicleImageInput]
    $options: [VehicleOptionInput]
  ) {
    updateVehicle(
      id: $id
      name: $name
      price: $price
      stock: $stock
      specifications: $specifications
      images: $images
      options: $options
    ) {
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
      }
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
      incompatibleOptions {
        id
        name
      }
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

// Requête pour récupérer les véhicules par statut
export const GET_VEHICLES_BY_STATUS = gql`
  query GetVehiclesByStatus($status: VehicleStatus!) {
    vehiclesByStatus(status: $status) {
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