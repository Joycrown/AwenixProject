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
  total_price: number;
}


export interface orderCustomItem {
  product_name:string
  quantity: number;
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
}

export interface userProps {
  accessToken: string;
  refreshToken: string;
  name: string;
  isLogged: boolean
}