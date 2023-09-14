import Home from "../components/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import ForgetPassword from "../pages/ForgetPassword";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import Register from "../pages/Register";
import Terms from "../pages/Terms";

export const routes = [
  {
    id: 1,
    path: "/",
    component: Home,
    protected: true, // This route is protected
  },
  {
    id: 2,
    path: "/register",
    component: Register,
  },
  {
    id: 3,
    path: "/about-us",
    component: About,
  },
  {
    id: 4,
    path: "/faq",
    component: Faq,
  },
  {
    id: 5,
    path: "/contact-us",
    component: Contact,
  },
  {
    id: 6,
    path: "/terms",
    component: Terms,
  },
  {
    id: 7,
    path: "/login",
    component: Login,
  },
  {
    id: 8,
    path: "/otp",
    component: Otp,
  },
  {
    id: 9,
    path: "/forgot-password",
    component: ForgetPassword,
  },
];
