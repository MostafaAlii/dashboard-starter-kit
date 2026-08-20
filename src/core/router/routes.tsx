import type { RouteObject } from "react-router-dom";

import dashboardRoutes from "../../modules/dashboard/dashboard.routes";
import playgroundRoutes from "../../modules/playground/playground.routes";

export const routes: RouteObject[] = [
  dashboardRoutes,
  playgroundRoutes,
];