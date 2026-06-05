import { Customer } from "./customer";
import { Product } from "./product";


export interface ProductItem {
  id: number;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface Bill {
  id: number;
  billingDate: Date;
  customerId: number;
  customer: Customer;
  productItems: ProductItem[];
}