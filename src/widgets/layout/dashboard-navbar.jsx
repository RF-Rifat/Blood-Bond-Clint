import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { AuthProvider } from "@/pages/auth/Provider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@/pages/auth/UserProvider";
import Spinner from "@/Shared/Spinner";
import EmptyData from "@/Shared/EmptyData";

export function DashboardNavbar() {
  const { user, logOut } = useContext(AuthProvider);
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const filteredUser = useContext(UserContext);
  const [donorsReq, setDonorsReq] = useState([]);

  const { _id } = filteredUser || {};

  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const handleLogOut = async () => {
    try {
      const response = await axios.put(
        `https://blood-bond-server-nine.vercel.app/user/${_id}/update-status`,
        {
          status: false,
        }
      );

      logOut();
      console.log("Updated user status:", response.data);
    } catch (error) {
      console.error("Error updating user status:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://blood-bond-server-nine.vercel.app/bloodDonation"
        );
        setDonorsReq(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {!user ? (
            <Link to="/auth/sign-in">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex normal-case"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                Sign In
              </Button>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </Link>
          ) : (
            <>
              <Button
                onClick={() => handleLogOut()}
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex normal-case"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                Log Out
              </Button>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </>
          )}
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray" className="relative">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
                <span class="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[12px] min-h-[12px]">
                  {donorsReq.length}
                </span>
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              {donorsReq.map((item, idx) => (
                <MenuItem key={idx} className="flex items-center gap-3">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >
                      <strong>New Request</strong> from {item.fullName}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      <ClockIcon className="h-3.5 w-3.5" /> {item.preferredDate}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
