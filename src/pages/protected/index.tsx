import { lazy } from "react";

const HomePage = lazy(() => import("./landing"));
// const AboutPage = lazy(() => import("./default/about"));
// const ContactPage = lazy(() => import("./default/contact"));
// const SignPage = lazy(() => import("./default/sign"));
// const IngredientsPage = lazy(() => import("./default/products/ingredients"));

export { HomePage };
