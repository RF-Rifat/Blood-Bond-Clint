import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import PrivateRoute from "./PrivateRoute";
import DonorReq from "@/pages/dashboard/DonorReq";
import Fund from "@/pages/dashboard/Fund";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "User list",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Fund Collection",
        path: "/fund",
        element: <Fund />,
      },
      {
        icon: <HandRaisedIcon {...icon} />,
        name: "Donor Request",
        path: "/donorList",
        element: <DonorReq />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
