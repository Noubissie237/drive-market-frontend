import { gql } from '@apollo/client';

// Types de base
export type EngineType = 'ELECTRIC' | 'GASOLINE' | 'DIESEL' | 'HYBRID';

export interface Specification {
  label: string;
  value: string;
}

export interface Dimension {
  label: string;
  value: string;
}

export interface Option {
  id: string;
  name: string;
  price: number;
  description: string;
  incompatibleWith?: string[];
}

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

// Spécifications spécifiques aux véhicules électriques
export interface ElectricSpecs {
  batteryCapacity: number; // en kWh
  range: number; // en km
  chargingTime: {
    normal: number; // en heures
    fast: number; // en minutes
  };
  powerConsumption: number; // en kWh/100km
}

// Spécifications spécifiques aux véhicules thermiques
export interface GasolineSpecs {
  engineDisplacement: number; // en cm3
  fuelTankCapacity: number; // en litres
  fuelConsumption: number; // en L/100km
  co2Emissions: number; // en g/km
}

// Interface principale du véhicule
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  engineType: EngineType;
  price: number;
  year: number;
  colors: {
    id: string;
    name: string;
    hexCode: string;
    price: number;
  }[];
  description: string;
  
  // Spécifications techniques
  specs: {
    performance: Specification[];
    dimensions: Dimension[];
    features: string[];
  };
  
  // Spécifications spécifiques au type de moteur
  engineSpecs: ElectricSpecs | GasolineSpecs;
  
  // Images
  images: VehicleImage[];
  
  // Options disponibles
  options: Option[];
  
  // Informations additionnelles
  warranty: {
    years: number;
    kilometers: number;
  };
  availability: {
    inStock: boolean;
    deliveryTime: number; // en semaines
  };
}

// Queries GraphQL
export const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      id
      brand
      model
      engineType
      price
      year
      colors {
        id
        name
        hexCode
        price
      }
      description
      specs {
        performance {
          label
          value
        }
        dimensions {
          label
          value
        }
        features
      }
      engineSpecs {
        ... on ElectricSpecs {
          batteryCapacity
          range
          chargingTime {
            normal
            fast
          }
          powerConsumption
        }
        ... on GasolineSpecs {
          engineDisplacement
          fuelTankCapacity
          fuelConsumption
          co2Emissions
        }
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
    }
  }
`;

export const GET_VEHICLES_BY_ENGINE_TYPE = gql`
  query GetVehiclesByEngineType($engineType: EngineType!) {
    vehiclesByEngineType(engineType: $engineType) {
      id
      brand
      model
      engineType
      price
      year
      colors {
        id
        name
        hexCode
        price
      }
      description
      specs {
        performance {
          label
          value
        }
        dimensions {
          label
          value
        }
        features
      }
      engineSpecs {
        ... on ElectricSpecs {
          batteryCapacity
          range
          chargingTime {
            normal
            fast
          }
          powerConsumption
        }
        ... on GasolineSpecs {
          engineDisplacement
          fuelTankCapacity
          fuelConsumption
          co2Emissions
        }
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
    }
  }
`;

// Query pour obtenir un véhicule spécifique
export const GET_VEHICLE_BY_ID = gql`
  query GetVehicleById($id: ID!) {
    vehicle(id: $id) {
      id
      brand
      model
      engineType
      price
      year
      colors {
        id
        name
        hexCode
        price
      }
      description
      specs {
        performance {
          label
          value
        }
        dimensions {
          label
          value
        }
        features
      }
      engineSpecs {
        ... on ElectricSpecs {
          batteryCapacity
          range
          chargingTime {
            normal
            fast
          }
          powerConsumption
        }
        ... on GasolineSpecs {
          engineDisplacement
          fuelTankCapacity
          fuelConsumption
          co2Emissions
        }
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
    }
  }
`;