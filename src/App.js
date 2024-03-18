/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

*/

// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import AddUser from "layouts/User/AddUser";
import Users from "layouts/User/Html";

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import AddCourse from "layouts/Courses/AddCourse";
import Courses from "layouts/Courses/Html";
import AppliedCourse from "layouts/AppliedCourses/Courses/Html";
import ViewRequest from "layouts/AppliedCourses/Courses/ViewRequest";
import ViewUser from "layouts/User/ViewUser";
import ViewCourse from "layouts/Courses/ViewCourse";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const TABS = useSelector((state) => state?.user?.tab);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <VuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="info"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="white"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </VuiBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand=""
              brandName="VISION UI FREE"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <>
          <Toaster />
          <Switch>
            {getRoutes([
              {
                type: "collapse",
                name: "Dashboard",
                key: "dashboard",
                route: "/dashboard",
                icon: <IoHome size="15px" color="inherit" />,
                component: Dashboard,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Tables",
                key: "tables",
                route: "/tables",
                icon: <IoStatsChart size="15px" color="inherit" />,
                component: Tables,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Billing",
                key: "billing",
                route: "/billing",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: Billing,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Users",
                key: "users",
                route: "/users",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: Users,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "AddUser",
                key: "adduser",
                route: "/add-user",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: AddUser,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "EditUser",
                key: "edituser",
                route: "/edit-user/:id",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: AddUser,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Courses",
                key: "courses",
                route: "/courses",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: Courses,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "AddCourse",
                key: "addcourse",
                route: "/add-course",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: AddCourse,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "EditCourse",
                key: "editcourse",
                route: "/edit-course/:id",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: AddCourse,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Course Request",
                key: "Request",
                route: "/course-request",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: AppliedCourse,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "View Request",
                key: "view-request",
                route: "/view-request/:id",
                icon: <BsCreditCardFill size="15px" color="inherit" />,
                component: ViewRequest,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Sign In",
                key: "sign-in",
                route: "/sign-in",
                icon: <IoIosDocument size="15px" color="inherit" />,
                component: SignIn,
                noCollapse: true,
              },
              {
                type: "collapse",
                name: "Sign Up",
                key: "sign-up",
                route: "/sign-up",
                icon: <IoRocketSharp size="15px" color="inherit" />,
                component: SignUp,
                noCollapse: true,
              },
            ])}
            <Redirect from="*" to="/sign-in" />
          </Switch>
        </>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <div
        id="Loader"
        className="w-[100%] h-full hidden flex justify-center items-center absolute   z-[1000] "
        style={{
          backgroundImage: "url(https://i.stack.imgur.com/kOnzy.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100px,100px",
          backgroundPosition: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* <img
          src="https://i.stack.imgur.com/kOnzy.gif"
          className="w-12 h-12  "
          alt=""
        /> */}
      </div>

      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand=""
            brandName="Rana Consultant"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <>
        <Toaster />
        <Switch>
          {getRoutes([
            {
              type: "collapse",
              name: "Dashboard",
              key: "dashboard",
              route: "/dashboard",
              icon: <IoHome size="15px" color="inherit" />,
              component: Dashboard,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "Tables",
              key: "tables",
              route: "/tables",
              icon: <IoStatsChart size="15px" color="inherit" />,
              component: Tables,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "Billing",
              key: "billing",
              route: "/billing",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: Billing,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "Users",
              key: "users",
              route: "/users",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: Users,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "AddUser",
              key: "adduser",
              route: "/add-user",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: AddUser,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "EditUser",
              key: "edituser",
              route: "/edit-user/:id",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: AddUser,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "Courses",
              key: "courses",
              route: "/courses",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: Courses,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "EditCourse",
              key: "editcourse",
              route: "/edit-course/:id",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: AddCourse,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "Course Request",
              key: "Request",
              route: "/course-request",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: AppliedCourse,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "View Request",
              key: "view-request",
              route: "/view-request/:id",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: ViewRequest,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "View User",
              key: "view-user",
              route: "/view-user/:id",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: ViewUser,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "View Course",
              key: "view-course",
              route: "/view-course/:id",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: ViewCourse,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "AddCourse",
              key: "addcourse",
              route: "/add-course",
              icon: <BsCreditCardFill size="15px" color="inherit" />,
              component: AddCourse,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "RTL",
              key: "rtl",
              route: "/rtl",
              icon: <IoBuild size="15px" color="inherit" />,
              component: RTL,
              noCollapse: true,
            },
            { type: "title", title: "Account Pages", key: "account-pages" },
            {
              type: "collapse",
              name: "Profile",
              key: "profile",
              route: "/profile",
              icon: <BsFillPersonFill size="15px" color="inherit" />,
              component: Profile,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "Sign In",
              key: "sign-in",
              route: "/sign-in",
              icon: <IoIosDocument size="15px" color="inherit" />,
              component: SignIn,
              noCollapse: true,
            },
            {
              type: "collapse",
              name: "Sign Up",
              key: "sign-up",
              route: "/sign-up",
              icon: <IoRocketSharp size="15px" color="inherit" />,
              component: SignUp,
              noCollapse: true,
            },
          ])}
          <Redirect from="*" to="/sign-in" />
        </Switch>
      </>
    </ThemeProvider>
  );
}
