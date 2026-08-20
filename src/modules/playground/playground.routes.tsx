import type { RouteObject } from "react-router-dom";

import DashboardLayout from "../../core/components/layout/DashboardLayout";
import PlaygroundPage from "./pages/PlaygroundPage";

const playgroundRoutes: RouteObject = {
  path: "/playground",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <PlaygroundPage />,
    },
  ],
};

export default playgroundRoutes;