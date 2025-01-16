import { gql } from '@apollo/client';

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($orderId: ID!) {
    orderById(orderId: $orderId) {
      orderId
      customerInfo {
        customerId
        name
        email
        phone
        address {
          street
          city
          state
          country
          zipCode
        }
        paymentInfo {
          paymentMethod
          accountNumber
          routingNumber
        }
      }
      items {
        id
        vehicleId
        vehicleName
        vehicleBasePrice
        quantity
        options {
          optionId
          name
          description
          price
        }
        subtotal
      }
      status
      deliveryCountry
      createdAt
      updatedAt
      total
      subtotal
      taxes
      shipping
      discounts
      orderType
    }
  }
`;

export const GET_ORDERS_BY_CUSTOMER = gql`
  query GetOrdersByCustomer($customerId: ID!) {
    ordersByCustomer(customerId: $customerId) {
      orderId
      customerInfo {
        customerId
        name
        email
        phone
        address {
          street
          city
          state
          country
          zipCode
        }
        paymentInfo {
          paymentMethod
          accountNumber
          routingNumber
        }
      }
      items {
        id
        vehicleId
        vehicleName
        vehicleBasePrice
        quantity
        options {
          optionId
          name
          description
          price
        }
        subtotal
      }
      status
      deliveryCountry
      createdAt
      updatedAt
      total
      subtotal
      taxes
      shipping
      discounts
      orderType
    }
  }
`;

export const GET_ORDERS_BY_STATUS = gql`
  query GetOrdersByStatus($status: OrderStatus) {
    orders(status: $status) {
      orderId
      customerInfo {
        customerId
        name
        email
        phone
        address {
          street
          city
          state
          country
          zipCode
        }
        paymentInfo {
          paymentMethod
          accountNumber
          routingNumber
        }
      }
      items {
        id
        vehicleId
        vehicleName
        vehicleBasePrice
        quantity
        options {
          optionId
          name
          description
          price
        }
        subtotal
      }
      status
      deliveryCountry
      createdAt
      updatedAt
      total
      subtotal
      taxes
      shipping
      discounts
      orderType
    }
  }
`;


// Mutations
export const CREATE_CASH_ORDER = gql`
  mutation CreateCashOrder($input: CreateCashOrderInput!) {
    createCashOrder(input: $input) {
      orderId
      # customerInfo {
      #   customerId
      #   name
      #   email
      #   phone
      #   address {
      #     street
      #     city
      #     state
      #     country
      #     zipCode
      #   }
      #   paymentInfo {
      #     paymentMethod
      #     accountNumber
      #     routingNumber
      #   }
      # }
      # items {
      #   id
      #   vehicleId
      #   vehicleName
      #   vehicleBasePrice
      #   quantity
      #   options {
      #     optionId
      #     name
      #     description
      #     price
      #   }
      #   subtotal
      # }
      # status
      # deliveryCountry
      # createdAt
      # updatedAt
      # total
      # subtotal
      # taxes
      # shipping
      # discounts
      # orderType
      # paymentDate
      # cashDiscountPercentage
    }
  }
`;

export const CREATE_CREDIT_ORDER = gql`
  mutation CreateCreditOrder($input: CreateCreditOrderInput!) {
    createCreditOrder(input: $input) {
      orderId
      # customerInfo {
      #   customerId
      #   name
      #   email
      #   phone
      #   address {
      #     street
      #     city
      #     state
      #     country
      #     zipCode
      #   }
      #   paymentInfo {
      #     paymentMethod
      #     accountNumber
      #     routingNumber
      #   }
      # }
      # items {
      #   id
      #   vehicleId
      #   vehicleName
      #   vehicleBasePrice
      #   quantity
      #   options {
      #     optionId
      #     name
      #     description
      #     price
      #   }
      #   subtotal
      # }
      # status
      # deliveryCountry
      # createdAt
      # updatedAt
      # total
      # subtotal
      # taxes
      # shipping
      # discounts
      # orderType
      # creditDuration
      # interestRate
      # monthlyPayment
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      orderId
      status
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: ID!) {
    cancelOrder(orderId: $orderId) {
      orderId
      status
    }
  }
`;