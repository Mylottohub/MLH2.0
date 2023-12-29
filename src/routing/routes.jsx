import Home from "../components/Home";
import OperatorMobile from "../components/OperatorMobile/OperatorMobile";
import PlayGames from "../components/PlayGames/PlayGames";
import TransactionHistory from "../components/Transactions/TransactionHistory";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Terms from "../pages/Terms";
import TimeTable from "../pages/TimeTable";
import ViewMoreResults from "../pages/ViewMoreResults";
import UserProfile from "../components/UserProfile";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <Home />,
    protected: false,
  },
  {
    id: 2,
    path: "/register",
    element: <Register />,
    protected: false,
  },
  {
    id: 3,
    path: "/about-us",
    element: <About />,
    protected: false,
  },
  {
    id: 4,
    path: "/faq",
    element: <Faq />,
    protected: false,
  },
  {
    id: 5,
    path: "/contact-us",
    element: <Contact />,
    protected: true,
  },
  {
    id: 6,
    path: "/terms",
    element: <Terms />,
    protected: false,
  },
  {
    id: 7,
    path: "/login",
    element: <Login />,
    protected: false,
  },
  {
    id: 8,
    path: "/otp",
    element: <Otp />,
    protected: false,
  },
  {
    id: 9,
    path: "/forgot-password",
    element: <ForgetPassword />,
    protected: false,
  },
  {
    id: 16,
    path: "/reset-password",
    element: <ResetPassword />,
    protected: false,
  },
  {
    id: 10,
    path: "/transactions",
    element: <TransactionHistory />,
    protected: true,
  },
  {
    id: 11,
    path: "/play-game/:id",
    element: <PlayGames />,
    protected: true,
  },
  {
    id: 12,
    path: "/timetable",
    element: <TimeTable />,
    protected: false,
  },
  {
    id: 13,
    path: "/result",
    element: <Result />,
    protected: true,
  },
  {
    id: 14,
    path: "/play-lotto",
    element: <OperatorMobile />,
    protected: true,
  },
  {
    id: 15,
    path: "/view-more/:id",
    element: <ViewMoreResults />,
    protected: true,
  },
  {
    id: 16,
    path: "/profile",
    element: <UserProfile />,
    protected: true,
  },
];
