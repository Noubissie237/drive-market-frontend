import { gql } from '@apollo/client';

// Requête pour récupérer les articles du panier
export const GET_CART_ITEMS = gql`
  query GetCartItems($customerId: ID!) {
    getCartItems(customerId: $customerId) {
      id
      productName
      quantity
      price
      image
      options {
        id
        name
        value
      }
    }
  }
`;

// Requête pour récupérer le total du panier
export const GET_CART_TOTAL = gql`
  query GetCartTotal($customerId: ID!) {
    getCartTotal(customerId: $customerId)
  }
`;

// Requête pour récupérer l'historique du panier
export const GET_CART_HISTORY = gql`
  query GetCartHistory($customerId: ID!) {
    getCartHistory(customerId: $customerId) {
      timestamp
      state
      items {
        id
        productName
        quantity
        price
        image
        options {
          id
          name
          value
        }
      }
    }
  }
`;

// Mutation pour ajouter un article au panier
export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($customerId: ID!, $itemInput: CartItemInput) {
    addItemToCart(customerId: $customerId, itemInput: $itemInput) {
      id
      customerId
      items {
        id
        productName
        quantity
        price
        image
        options {
          id
          name
          value
        }
      }
      total
      state
    }
  }
`;


// Mutation pour mettre à jour la quantité
export const UPDATE_QUANTITY = gql`
  mutation UpdateQuantity($customerId: ID!, $itemId: ID!, $newQuantity: Int!) {
    updateQuantity(customerId: $customerId, itemId: $itemId, newQuantity: $newQuantity) {
      id
      customerId
      items {
        id
        productName
        quantity
        price
        image
        options {
          id
          name
          value
        }
      }
      total
      state
    }
  }
`;



// Mutation pour supprimer un article du panier
export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($customerId: ID!, $itemId: ID!) {
    removeItemFromCart(customerId: $customerId, itemId: $itemId) {
      id
      customerId
      items {
        id
        productName
        quantity
        price
        image
        options {
          id
          name
          value
        }
      }
      total
      state
    }
  }
`;

// Mutation pour vider le panier
export const CLEAR_CART = gql`
  mutation ClearCart($customerId: ID!) {
    clearCart(customerId: $customerId) {
      id
      customerId
      items {
        id
        productName
        quantity
        price
        image
        options {
          id
          name
          value
        }
      }
      total
      state
    }
  }
`;

// Mutation pour valider le panier
export const VALIDATE_CART = gql`
  mutation ValidateCart($customerId: ID!) {
    validateCart(customerId: $customerId) {
      id
      customerId
      items {
        id
        productName
        quantity
        price
        image
        options {
          id
          name
          value
        }
      }
      total
      state
    }
  }
`;

// Mutation pour restaurer l'état du panier
export const RESTORE_CART_STATE = gql`
  mutation RestoreCartState($customerId: ID!) {
    restoreCartState(customerId: $customerId) {
      id
      customerId
      items {
        id
        productName
        quantity
        price
        image
        options {
          id
          name
          value
        }
      }
      total
      state
    }
  }
`;