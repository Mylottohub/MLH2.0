import Home from "../components/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import Register from "../pages/Register";
import Terms from "../pages/Terms";

export const routes = [
    {
        id: 1,
        path: '/',
        component: Home,
    },
    {
        id: 2,
        path: '/register',
        component: Register,
    },
    {
        id: 3,
        path: '/about-us',
        component: About,
    },
    {
        id: 4,
        path: '/faq',
        component: Faq,
    },
    {
        id: 5,
        path: '/contact-us',
        component: Contact,
    },
    {
        id: 6,
        path: '/terms',
        component: Terms,
    },
];
