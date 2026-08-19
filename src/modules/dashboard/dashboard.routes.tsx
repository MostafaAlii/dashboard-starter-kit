import type { RouteObject } from "react-router-dom";

import DashboardLayout from "../../core/components/layout/DashboardLayout";

import DashboardPage from "./pages/DashboardPage";

const dashboardRoutes: RouteObject = {
  path: "/",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <DashboardPage />,
    },
  ],
};

export default dashboardRoutes;