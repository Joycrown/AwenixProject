import { createContext, lazy } from "react";
import RouteIdentifier from "./layout/routeIdentifier";
import { useLocalStorage } from "./utils/storageProvider";
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
import { HomePage } from "./pages/protected";

export const AuthContext = createContext({ user: "", setUser: "" });

function App() {
  const [user, setUser] = useLocalStorage("awenix-profiler-user", "");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
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
              <Route path="/protected/home" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
