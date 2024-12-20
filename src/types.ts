export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    image_url?: string;
  }
  
  export interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
  }
  
  export interface Order {
    id: number;
    status: string;
    total_amount: number;
    items: OrderItem[];
  }
  
  export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }

  // Add this type for cart items
export interface CartProduct extends Product {
    quantity: number; // Add the quantity property here
  }

  // OrderItem structure
export interface OrderItem {
    id: number; // Unique identifier for the item
    order_id: number; // Will be assigned during order creation
    product_id: number; // From CartProduct.id
    product_name: string; // From CartProduct.name
    quantity: number; // From CartProduct.quantity
    price: number; // From CartProduct.price
  }
  
  // Order structure
  export interface Order {
    id: number;
    status: string;
    total_amount: number;
    items: OrderItem[]; // Array of OrderItem
  }
  