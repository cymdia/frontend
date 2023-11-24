import { Route, Routes, useLocation } from "react-router-dom";
import { Events, Home, News } from "./pages";

import "./App.scss";

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
];

const App = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />}>
        {routes.map((route) => CustomRoute(route.path === "news", route))}
      </Route>
    </Routes>
  );
};

const CustomRoute = (isIndexPage: boolean, route: RouteT) => {
  return isIndexPage ? (
    <Route index path={route.path} element={route.element} key={route.path} />
  ) : (
    <Route path={route.path} element={route.element} key={route.path} />
  );
};

export default App;
