export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }
  
  export interface ContactInfo {
    email: string;
    phone: string;
  }
  
  export interface Customer {
    id: string;
    name: string;
    password: string;
    address: Address;
    contactInfo: ContactInfo;
  }