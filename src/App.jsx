import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function wait(params) {
  return new Promise((resolve) => {
    setTimeout(resolve, params);
  });
}

import Login from "./pages/login";

const SharedLayout = lazy(() =>
  wait(500).then(() => import("./layout/SharedLayout"))
);

const Dashboard = lazy(() => wait(500).then(() => import("./pages/Dashboard")));
const Menu = lazy(() => wait(500).then(() => import("./pages/Menu")));
const Error = lazy(() => wait(500).then(() => import("./pages/Error")));

function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route element={<SharedLayout />} path="/">
        <Route element={<Dashboard />} index />
        <Route element={<Menu />} path="menu" />
        <Route element={<Error />} path="*" />
      </Route>

      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default App;
