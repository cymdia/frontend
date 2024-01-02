import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { GenericNotFound, NotFound, Redirect } from "./pages";
import PrivateRoute from "components/PrivateRoute";
import Loader from "components/Loader";

import "./App.scss";

const Home = lazy(() => import("./pages/Home/Home"));
const News = lazy(() => import("./pages/News/News"));
const WrapperNews = lazy(() => import("./pages/News/WrapperNews"));
const EditNew = lazy(() => import("./pages/News/EditNew/EditNew"));
const Events = lazy(() => import("./pages/Events/Events"));
const WrapperEvents = lazy(() => import("./pages/Events/WrapperNews"));
const EditEvent = lazy(() => import("./pages/Events/EditEvent/EditEvent"));
const Login = lazy(() => import("pages/Login/Login"));

type RouteT = { path: string; element: JSX.Element; isIndex?: boolean };
type CustomRouteT = RouteT & { children?: RouteT[] };

const routes: CustomRouteT[] = [
  {
    path: "news",
    element: <WrapperNews />,
    children: [
      {
        path: "newsP",
        element: <News />,
        isIndex: true,
      },
      {
        path: "edit",
        element: <EditNew />,
      },
    ],
  },
  {
    path: "events",
    element: <WrapperEvents />,
    children: [
      {
        path: "eventsP",
        element: <Events />,
        isIndex: true,
      },
      {
        path: "edit",
        element: <EditEvent />,
      },
    ],
  },

  {
    path: "404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <GenericNotFound />,
  },
  {
    path: "",
    element: <Redirect />,
  },
];

const App = () => {
  const location = useLocation();
  dayjs.extend(localizedFormat);
  dayjs.locale("uk");
  return (
    <Suspense fallback={<Loader size={"large"} fullscreen={true} />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />}></Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          {routes.map((route) => CustomRoute(route))}
        </Route>
      </Routes>
    </Suspense>
  );
};

const CustomRoute = (route: CustomRouteT) => (
  <Route path={route.path} element={route.element} key={route.path}>
    {route.children?.map((childRoute) => (
      <>
        {childRoute.isIndex ? (
          <Route index element={childRoute.element} key={childRoute.path} />
        ) : (
          <Route {...childRoute} key={childRoute.path} />
        )}
      </>
    ))}
  </Route>
);

export default App;
