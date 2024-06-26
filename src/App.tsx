import { Suspense, lazy } from "react";
import { AuthProvider } from "./utils/authProvider";
import RouteIdentifier from "./layout/routeIdentifier";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
const DefaultRoutes = lazy(() => import("./layout/defaultRoutes"));
const ProtectedRoutes = lazy(() => import("./layout/protectedRoutes"));

// Routes
import {
  AboutPage,
  ContactPage,
  IngredientsPage,
  LandingPage,
  SignPage,
} from "./pages/default";
import {
  HomePage,
  Cart,
  PaymentStatus,
  Dashboard,
  CustomOrder,
  Product,
} from "./pages/protected";
import Preloader from "./components/preloader";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route element={<RouteIdentifier />}>
              <Route element={<DefaultRoutes />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/account/*" element={<SignPage />} />
                <Route
                  path="/products/ingredients"
                  element={<IngredientsPage />}
                />
              </Route>

              <Route element={<ProtectedRoutes />}>
                <Route path="/account/home" element={<HomePage />} />
                <Route
                  path="/account/products/custom-order"
                  element={<CustomOrder />}
                />
                <Route path="/account/products" element={<Product />} />
                <Route path="/account/cart" element={<Cart />} />
                {/* <Route
                  path="/account/payment/*"
                  element={<PaymentCredentials />}
                /> */}
                <Route
                  path="/account/payment/payment-status"
                  element={<PaymentStatus />}
                />
                <Route path="/account/dashboard/*" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
