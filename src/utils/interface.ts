/* eslint-disable @typescript-eslint/no-explicit-any */
export interface productProps {
  id: any;
  name: string;
  description: string;
  price: number;
  quantity: number;
  // image: string;
  product_image: string;
  size: string;
  hidden: boolean;
  closeFn: () => void;
}

export interface orderProduct {
  product_id: number;
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  price_per_unit: number;
  miscellaneous:number,
  total_price: number;
}


export interface orderCustomItem {
  product_name:string
  quantity: number;
  size: string
}


export interface PaymentOut {
  payment_option: string
  bank: string
  payee_name: string
  delivery_person: string
  amount_paid: number
}


export interface orderProps {
  order_id: string;
  total_price: number;
  customer: string;
  customer_details: {
    id: string;
    email: string;
    name: string;
    phone_no: string;
    user_type: string;
  };
  created_at: string;
  expire_at: string;
  status: string;
  user_receipt_url: string;
  user_bank_verification:string;
  user_payment_name:string
  custom_order_items: orderCustomItem[]
  order_items: orderProduct[],
  payment:PaymentOut
}

export interface userProps {
  accessToken: string;
  refreshToken: string;
  name: string;
  isLogged: boolean
}


export interface ServiceOut {
  id: number;
  name: string;
  description?: string;
  price: number;
  created_by: string;
  last_edited_by?: string;
  created_at: string;
  updated_at: string;
  removed: boolean;
}