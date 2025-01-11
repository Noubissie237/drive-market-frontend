export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  engineType: string;
  description: string;
  availableColors: VehicleColor[];
  images: VehicleImage[];
  options: VehicleOption[];
  warranty: Warranty;
  availability: Availability;
  features: string[];
  specs: Specifications;
}

export interface VehicleColor {
  id?: string;
  name: string;
  hexCode: string;
  price: number;
}

export interface VehicleImage {
  id?: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface VehicleOption {
  id?: string;
  name: string;
  price: number;
  description: string;
  incompatibleWith: string[];
}

export interface Warranty {
  years: number;
  kilometers: number;
}

export interface Availability {
  inStock: boolean;
  deliveryTime: number;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Specifications {
  performance: Specification[];
  dimensions: Specification[];
}

export interface ElectricCar extends Vehicle {
  batteryCapacity: number;
  range: number;
  chargingTime: {
    normal: number;
    fast: number;
  };
  powerConsumption: number;
}

export interface GasolineCar extends Vehicle {
  engineDisplacement: number;
  fuelTankCapacity: number;
  fuelConsumption: number;
  co2Emissions: number;
}