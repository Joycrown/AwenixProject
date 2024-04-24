import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
const DefaultRoutes = lazy(() => import("./layout/defaultRoutes"));

// Routes
import { AboutPage, ContactPage, LandingPage } from "./pages";
import RouteIdentifier from "./layout/routeIdentifier";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RouteIdentifier />}>
          <Route element={<DefaultRoutes />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
