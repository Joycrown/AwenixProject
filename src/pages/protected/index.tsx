import { lazy } from "react";

const HomePage = lazy(() => import("./landing"));
const Dashboard = lazy(() => import("./dashboard"));
const Product = lazy(() => import("./product"));
const Cart = lazy(() => import("./cart/cart"));
const PaymentCredentials = lazy(() => import("./cart/payment"));
const PaymentStatus = lazy(() => import("./cart/paymentStatus"));
const CustomOrder = lazy(() => import("./product/customOrder"));

export {
  HomePage,
  Cart,
  Product,
  PaymentCredentials,
  PaymentStatus,
  Dashboard,
  CustomOrder,
};
