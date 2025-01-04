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

  