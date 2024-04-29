import { lazy } from "react";

const LandingPage = lazy(() => import("./landing"));
const AboutPage = lazy(() => import("./about"));
const ContactPage = lazy(() => import("./contact"));
const SignPage = lazy(() => import("./sign"));
const IngredientsPage = lazy(() => import("./products/ingredients"));

export { LandingPage, AboutPage, ContactPage, SignPage, IngredientsPage };
