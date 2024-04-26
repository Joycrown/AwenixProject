import { lazy } from "react";

const LandingPage = lazy(() => import("./landing"));
const AboutPage = lazy(() => import("./about"));
const ContactPage = lazy(() => import("./contact"));
const SignPage = lazy(() => import("./sign"));

export { LandingPage, AboutPage, ContactPage, SignPage };
