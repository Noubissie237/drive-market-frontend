export interface RegisterIndividualInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }
  
  export interface RegisterCorporationInput {
    name: string;
    registrationNumber: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
    message: string;
    customer?: {
      id: string;
      email: string;
      customerType: string;
    };
  }