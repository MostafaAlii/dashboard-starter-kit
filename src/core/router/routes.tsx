import type { RouteObject } from "react-router-dom";

import dashboardRoutes from "../../modules/dashboard/dashboard.routes";
import playgroundRoutes from "../../modules/playground/playground.routes";
import authRoutes from "../../modules/auth/auth.routes";
import { NotFound, ServerError } from "../components/Fallback";

export const routes: RouteObject[] = [
  authRoutes,
  dashboardRoutes,
  playgroundRoutes,
    {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "/server-error",
    element: <ServerError />,
  },
    // ===== 404 Route =====
  {
    path: "*",
    element: <NotFound />,
  },
];