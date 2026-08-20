import type { ReactNode } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { DirectionProvider } from "./DirectionProvider";
import { LanguageProvider } from "./LanguageProvider";
import { ToastContainer } from "../components/ui/Toast";

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
          <ToastContainer>
            {children}
          </ToastContainer>
        </LanguageProvider>
      </DirectionProvider>
    </ThemeProvider>
  );
}

export default AppProviders;