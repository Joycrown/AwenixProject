import { lazy } from "react";

const LandingPage = lazy(() => import("./landing"));
const AboutPage = lazy(() => import("./about"));
const ContactPage = lazy(() => import("./contact"));

export { LandingPage, AboutPage, ContactPage };
