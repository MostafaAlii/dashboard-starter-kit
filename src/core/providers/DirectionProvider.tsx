import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { rtlSupport } from "../../theme/rtl";

export type Direction =
  (typeof rtlSupport.direction)[keyof typeof rtlSupport.direction];

interface DirectionContextValue {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  toggleDirection: () => void;
}

interface DirectionProviderProps {
  children: ReactNode;
  defaultDirection?: Direction;
}

const DirectionContext = createContext<
  DirectionContextValue | undefined
>(undefined);

const STORAGE_KEY = "app-direction";

const getStoredDirection = (): Direction | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedDirection = localStorage.getItem(STORAGE_KEY);

  if (
    storedDirection === rtlSupport.direction.LTR ||
    storedDirection === rtlSupport.direction.RTL
  ) {
    return storedDirection;
  }

  return null;
};

export function DirectionProvider({
  children,
  defaultDirection = rtlSupport.direction.LTR,
}: DirectionProviderProps) {
  const [direction, setDirectionState] = useState<Direction>(() => {
    return getStoredDirection() ?? defaultDirection;
  });

  const setDirection = useCallback((newDirection: Direction) => {
    setDirectionState(newDirection);
  }, []);

  const toggleDirection = useCallback(() => {
    setDirectionState((currentDirection) =>
      currentDirection === rtlSupport.direction.LTR
        ? rtlSupport.direction.RTL
        : rtlSupport.direction.LTR
    );
  }, []);

  /**
   * Apply direction to <html>
   */
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("dir", direction);
    root.setAttribute("lang", direction === "rtl" ? "ar" : "en");
  }, [direction]);

  /**
   * Save direction
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, direction);
  }, [direction]);

  const value = useMemo<DirectionContextValue>(
    () => ({
      direction,
      setDirection,
      toggleDirection,
    }),
    [direction, setDirection, toggleDirection]
  );

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection(): DirectionContextValue {
  const context = useContext(DirectionContext);

  if (!context) {
    throw new Error(
      "useDirection must be used inside a DirectionProvider"
    );
  }

  return context;
}

export default DirectionProvider;