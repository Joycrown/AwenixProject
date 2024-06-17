import { lazy } from "react";

const HomePage = lazy(() => import("./landing"));
const Dashboard = lazy(() => import("./dashboard"));
const Cart = lazy(() => import("./cart/cart"));
const PaymentCredentials = lazy(() => import("./cart/payment"));
const PaymentStatus = lazy(() => import("./cart/paymentStatus"));

export { HomePage, Cart, PaymentCredentials, PaymentStatus, Dashboard };
