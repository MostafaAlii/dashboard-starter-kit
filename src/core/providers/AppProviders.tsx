import type { ReactNode } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { DirectionProvider } from "./DirectionProvider";
import { LanguageProvider } from "./LanguageProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <ThemeProvider>
      <DirectionProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default AppProviders;