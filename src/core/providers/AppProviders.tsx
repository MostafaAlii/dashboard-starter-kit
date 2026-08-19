import type { ReactNode } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { DirectionProvider } from "./DirectionProvider";


interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <ThemeProvider>
      <DirectionProvider>
        {children}
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default AppProviders;