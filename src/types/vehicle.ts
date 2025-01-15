// Types d'énumération pour le statut et le type de véhicule
export type VehicleStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'LOW_STOCK' | 'CLEARANCE';
export type VehicleType = 'CAR' | 'MOTORCYCLE' | 'SCOOTER';
export type PropulsionType = 'ELECTRIC' | 'GASOLINE' | 'HYBRID';

enum VehiculeType {
  CAR,
  SCOOTER
}

enum PropulsionTyp {
  CAR,
  SCOOTER
}

// Interface principale pour un véhicule
export interface Vehicle {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: VehicleStatus;
  specifications: string;
  type: VehiculeType;
  propulsion: PropulsionTyp;
  images: VehicleImage[];
  options: VehicleOption[];
}

// Interface pour les images
export interface VehicleImage {
  id: string;
  url: string;
  caption: string;
  order: number;
}

// Interface pour les options
export interface VehicleOption {
  id: string;
  name: string;
  description: string;
  price: number;
  incompatibleOptions: {
    id: string;
    name: string;
  }[];
}

// Interface pour les critères de recherche
export interface SearchCriteria {
  minPrice?: number;
  maxPrice?: number;
  type?: VehicleType;
  propulsion?: PropulsionType;
  inStock?: boolean;
  status?: VehicleStatus[];
}

// Interface pour l'entrée d'option de véhicule
export interface VehicleOptionInput {
  name: string;
  description: string;
  price: number;
  incompatibleOptionIds?: string[];
}

// Interface pour la réponse de l'API de recherche
export interface SearchResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  pageSize: number;
}