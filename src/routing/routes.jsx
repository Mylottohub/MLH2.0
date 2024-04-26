import Home from "../components/Home";
import OperatorMobile from "../components/OperatorMobile/OperatorMobile";
import PlayGames from "../components/PlayGames/PlayGames";
import TransactionHistory from "../components/Transactions/TransactionHistory";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
// import Login from "../pages/Login";
import Otp from "../pages/Otp";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Terms from "../pages/Terms";
import TimeTable from "../pages/TimeTable";
import ViewMoreResults from "../pages/ViewMoreResults";
import UserProfile from "../components/UserProfile";
import Referral from "../components/Referral";
import Tutorial from "../pages/Tutorial";
import BetHistory from "../components/BetHistory/BetHistory";
import DepositHistory from "../components/Transactions/DepositHistory";
import Betting from "../components/SportsBetting/Betting";
import ListAllWallets from "../components/Wallets/ListAllWallets";
import PlayBet from "../components/SportsBetting/PlayBet";
import Forecast from "../pages/Forecast";
import Instance from "../pages/Instance";
import Chart from "../pages/Chart";
import BettingTomorrow from "../components/SportsBetting/bettingTomorrow";
import SportHistory from "../components/Transactions/SportHistory";
import BettingYesterday from "../components/SportsBetting/BettingYesterday";

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
    protected: false,
  },
  {
    id: 6,
    path: "/terms",
    element: <Terms />,
    protected: false,
  },
  // {
  //   id: 7,
  //   path: "/login",
  //   element: <Login />,
  //   protected: false,
  // },
  {
    id: 8,
    path: "/verify",
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
    protected: false,
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
  {
    id: 17,
    path: "/referral",
    element: <Referral />,
    protected: true,
  },
  {
    id: 18,
    path: "/tutorials",
    element: <Tutorial />,
    protected: false,
  },
  {
    id: 19,
    path: "/bet-history/:id",
    element: <BetHistory />,
    protected: true,
  },
  {
    id: 20,
    path: "/deposit-history",
    element: <DepositHistory />,
    protected: true,
  },
  {
    id: 21,
    path: "/betting",
    element: <Betting />,
    protected: true,
  },
  {
    id: 22,
    path: "/wallet",
    element: <ListAllWallets />,
    protected: true,
  },
  {
    id: 23,
    path: "/play-bet/:id",
    element: <PlayBet />,
    protected: true,
  },
  {
    id: 24,
    path: "/forecast",
    element: <Forecast />,
    protected: true,
  },
  {
    id: 25,
    path: "/instant",
    element: <Instance />,
    protected: true,
  },
  {
    id: 26,
    path: "/create-chart",
    element: <Chart />,
    protected: true,
  },
  {
    id: 27,
    path: "/bettingTomorrow",
    element: <BettingTomorrow />,
    protected: true,
  },
  {
    id: 28,
    path: "/sport-transaction",
    element: <SportHistory />,
    protected: true,
  },
  {
    id: 29,
    path: "/betting-yesterday",
    element: <BettingYesterday />,
    protected: true,
  },
];
