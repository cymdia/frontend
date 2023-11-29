import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Events, GenericNotFound, News, NotFound, Redirect } from "./pages";

import "./App.scss";

const Home = lazy(() => import("./pages/Home"));
type RouteT = { path: string; element: JSX.Element };

const routes: RouteT[] = [
  {
    path: "news",
    element: <News />,
  },
  {
    path: "events",
    element: <Events />,
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />}>
          {routes.map((route) => CustomRoute(route.path === "news", route))}
        </Route>
      </Routes>
    </Suspense>
  );
};

const CustomRoute = (isIndexPage: boolean, route: RouteT) => {
  return isIndexPage ? (
    <Route index element={route.element} key={route.path} path={route.path} />
  ) : (
    <Route path={route.path} element={route.element} key={route.path} />
  );
};

export default App;
