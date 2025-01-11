import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      id
      brand
      model
      price
      year
      engineType
      description
      availableColors {
        id
        name
        hexCode
        price
      }
      images {
        id
        url
        alt
        isPrimary
      }
      options {
        id
        name
        price
        description
        incompatibleWith
      }
      warranty {
        years
        kilometers
      }
      availability {
        inStock
        deliveryTime
      }
      features
      specs {
        performance {
          label
          value
        }
        dimensions {
          label
          value
        }
      }
      ... on ElectricCar {
        batteryCapacity
        range
        chargingTime {
          normal
          fast
        }
        powerConsumption
      }
      ... on GasolineCar {
        engineDisplacement
        fuelTankCapacity
        fuelConsumption
        co2Emissions
      }
    }
  }
`;

export const ADD_ELECTRIC_CAR = gql`
  mutation AddElectricCar($vehicle: ElectricCarInput!) {
    addElectricCar(vehicle: $vehicle) {
      id
      # ... autres champs
    }
  }
`;

export const ADD_GASOLINE_CAR = gql`
  mutation AddGasolineCar($vehicle: GasolineCarInput!) {
    addGasolineCar(vehicle: $vehicle) {
      id
      # ... autres champs
    }
  }
`;

export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($id: ID!, $vehicle: VehicleInput!) {
    updateVehicle(id: $id, vehicle: $vehicle) {
      id
      # ... autres champs
    }
  }
`;

export const REMOVE_VEHICLE = gql`
  mutation RemoveVehicle($id: ID!) {
    removeVehicle(id: $id)
  }
`;