/*
 * ========================================
 * DROPDOWN COMPONENT
 * ========================================
 *
 * Features:
 * - Controlled / uncontrolled
 * - RTL / LTR support
 * - Logical positioning
 * - Portal rendering
 * - Viewport collision detection
 * - Click outside
 * - Escape key
 * - Resize support
 * - Dynamic dropdown dimensions
 * - Open/Close animations
 *
 * DirectionProvider is the single source
 * of truth for direction.
 */

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import type {
  DropdownPosition,
  DropdownProps,
} from "./types";

import { useDirection } from "../../../providers/DirectionProvider";

/*
 * ========================================
 * Constants
 * ========================================
 */

const sizeStyles = {
  sm: {
    minWidth: "160px",
  },

  md: {
    minWidth: "200px",
  },

  lg: {
    minWidth: "240px",
  },
} as const;

const PADDING = 16;
const GAP = 8;

// ===== Animation duration =====
const ANIMATION_DURATION = 200; // ms

/*
 * ========================================
 * Component
 * ========================================
 */

export const Dropdown = ({
  trigger,
  children,

  open: controlledOpen,
  defaultOpen = false,

  onOpenChange,

  position = "bottom-end",
  size = "md",

  closeOnClickOutside = true,
  closeOnEscape = true,
  closeOnItemClick = true,

  className = "",
  style,

  disabled = false,
}: DropdownProps) => {
  /*
   * ========================================
   * Direction
   * ========================================
   */

  const { direction } = useDirection();

  const isRTL = direction === "rtl";

  /*
   * ========================================
   * State
   * ========================================
   */

  const [isOpen, setIsOpen] =
    useState<boolean>(defaultOpen);

  const [triggerRect, setTriggerRect] =
    useState<DOMRect | null>(null);

  const [positionStyle, setPositionStyle] =
    useState<React.CSSProperties>({
      position: "fixed",
      top: 0,
      left: 0,
      visibility: "hidden",
      opacity: 0,
      transform: "scale(0.95) translateY(-8px)",
      transition: `opacity ${ANIMATION_DURATION}ms ease, transform ${ANIMATION_DURATION}ms ease`,
    });

  /*
   * ========================================
   * Refs
   * ========================================
   */

  const triggerRef =
    useRef<HTMLDivElement>(null);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  /*
   * ========================================
   * Open State
   * ========================================
   */

  const open =
    controlledOpen !== undefined
      ? controlledOpen
      : isOpen;

  /*
   * ========================================
   * Set Open
   * ========================================
   */

  const setOpen = useCallback(
    (value: boolean) => {
      if (disabled) {
        return;
      }

      if (controlledOpen === undefined) {
        setIsOpen(value);
      }

      onOpenChange?.(value);
    },
    [
      disabled,
      controlledOpen,
      onOpenChange,
    ]
  );

  /*
   * ========================================
   * Toggle
   * ========================================
   */

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }

    const nextOpen = !open;

    if (nextOpen && triggerRef.current) {
      setTriggerRect(
        triggerRef.current.getBoundingClientRect()
      );
    }

    setOpen(nextOpen);
  }, [
    disabled,
    open,
    setOpen,
  ]);

  /*
   * ========================================
   * Update Trigger Rect
   * ========================================
   */

  const updateTriggerRect =
    useCallback(() => {
      if (!triggerRef.current) {
        return;
      }

      setTriggerRect(
        triggerRef.current.getBoundingClientRect()
      );
    }, []);

  /*
   * ========================================
   * Update Trigger Rect
   *
   * When dropdown opens or direction changes.
   * ========================================
   */

  useEffect(() => {
    if (!open) {
      return;
    }

    updateTriggerRect();
  }, [
    open,
    direction,
    updateTriggerRect,
  ]);

  /*
   * ========================================
   * Click Outside
   * ========================================
   */

  useEffect(() => {
    if (
      !closeOnClickOutside ||
      !open
    ) {
      return;
    }

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      if (
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      if (
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    const timer = window.setTimeout(() => {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }, 0);

    return () => {
      window.clearTimeout(timer);

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [
    open,
    closeOnClickOutside,
    setOpen,
  ]);

  /*
   * ========================================
   * Escape
   * ========================================
   */

  useEffect(() => {
    if (
      !closeOnEscape ||
      !open
    ) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    open,
    closeOnEscape,
    setOpen,
  ]);

  /*
   * ========================================
   * Handle Item Click
   * ========================================
   */

  const handleItemClick = useCallback(() => {
    if (closeOnItemClick) {
      setOpen(false);
    }
  }, [
    closeOnItemClick,
    setOpen,
  ]);

  /*
   * ========================================
   * Filter Children
   * ========================================
   */

  const filteredChildren =
    Children.toArray(children).filter(
      (child) =>
        child !== null &&
        child !== undefined &&
        child !== false
    );

  /*
   * ========================================
   * Calculate Position
   * ========================================
   */

  const calculatePosition = useCallback(
    (
      dropdownWidth: number,
      dropdownHeight: number
    ): React.CSSProperties => {
      if (!triggerRect) {
        return {
          position: "fixed",
          visibility: "hidden",
          opacity: 0,
          transform: "scale(0.95) translateY(-8px)",
        };
      }

      const {
        top,
        left,
        width,
        height,
      } = triggerRect;

      const triggerRight =
        left + width;

      const isStart =
        position === "bottom-start" ||
        position === "top-start";

      let leftPosition: number;

      if (isStart) {
        if (isRTL) {
          leftPosition =
            triggerRight -
            dropdownWidth;
        } else {
          leftPosition = left;
        }
      } else {
        if (isRTL) {
          leftPosition = left;
        } else {
          leftPosition =
            triggerRight -
            dropdownWidth;
        }
      }

      const isTop =
        position === "top-start" ||
        position === "top-end";

      let topPosition: number;

      if (isTop) {
        topPosition =
          top -
          dropdownHeight -
          GAP;
      } else {
        topPosition =
          top +
          height +
          GAP;
      }

      const windowWidth =
        window.innerWidth;

      const windowHeight =
        window.innerHeight;

      if (
        leftPosition <
        PADDING
      ) {
        leftPosition =
          PADDING;
      }

      if (
        leftPosition +
          dropdownWidth >
        windowWidth -
          PADDING
      ) {
        leftPosition =
          windowWidth -
          dropdownWidth -
          PADDING;
      }

      if (
        topPosition <
        PADDING
      ) {
        const bottomPosition =
          top +
          height +
          GAP;

        if (
          bottomPosition +
            dropdownHeight <=
          windowHeight -
            PADDING
        ) {
          topPosition =
            bottomPosition;
        } else {
          topPosition =
            PADDING;
        }
      }

      if (
        topPosition +
          dropdownHeight >
        windowHeight -
          PADDING
      ) {
        const topAlternative =
          top -
          dropdownHeight -
          GAP;

        if (
          topAlternative >=
          PADDING
        ) {
          topPosition =
            topAlternative;
        } else {
          topPosition =
            Math.max(
              PADDING,
              windowHeight -
                dropdownHeight -
                PADDING
            );
        }
      }

      /*
       * ========================================
       * Animation Direction
       * ========================================
       *
       * Determine animation direction based on position.
       * - If dropdown opens downward: animate from top
       * - If dropdown opens upward: animate from bottom
       */
      const isBottom =
        position === "bottom-start" ||
        position === "bottom-end";

      const translateY = isBottom
        ? "-8px"  // من فوق للتحت
        : "8px";  // من تحت للفوق

      return {
        position: "fixed",

        top: topPosition,

        left: leftPosition,

        zIndex:
          "var(--z-dropdown, 1000)",

        ...sizeStyles[size],

        ...style,

        padding:
          "var(--spacing-2, 8px)",

        background:
          "var(--color-card, #ffffff)",

        borderRadius:
          "var(--radius-md, 8px)",

        border:
          "1px solid var(--color-border, #e2e8f0)",

        boxShadow:
          "var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))",

        maxWidth:
          "calc(100vw - 32px)",

        // ===== Animation Styles =====
        visibility: "visible",
        opacity: 1,
        transform: `scale(1) translateY(0)`,
        transition: `opacity ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1), transform ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
        transformOrigin: isBottom ? "top center" : "bottom center",
      };
    },
    [
      triggerRect,
      position,
      size,
      style,
      isRTL,
    ]
  );

  /*
   * ========================================
   * Measure + Position
   * ========================================
   */

  useLayoutEffect(() => {
    if (
      !open ||
      !triggerRect ||
      !dropdownRef.current
    ) {
      // ===== Reset to hidden when closed =====
      if (!open) {
        setPositionStyle((prev) => ({
          ...prev,
          visibility: "hidden",
          opacity: 0,
          transform: "scale(0.95) translateY(-8px)",
        }));
      }
      return;
    }

    const dropdownRect =
      dropdownRef.current.getBoundingClientRect();

    const nextPositionStyle =
      calculatePosition(
        dropdownRect.width,
        dropdownRect.height
      );

    setPositionStyle(
      nextPositionStyle
    );
  }, [
    open,
    triggerRect,
    direction,
    position,
    size,
    calculatePosition,
  ]);

  /*
   * ========================================
   * Resize
   * ========================================
   */

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleResize = () => {
      updateTriggerRect();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    open,
    updateTriggerRect,
  ]);

  /*
   * ========================================
   * Scroll
   * ========================================
   */

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleScroll = () => {
      updateTriggerRect();
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      true
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
        true
      );
    };
  }, [
    open,
    updateTriggerRect,
  ]);

  /*
   * ========================================
   * Render
   * ========================================
   */

  return (
    <>
      {/* Trigger */}

      <div
        ref={triggerRef}
        style={{
          display: "inline-block",
        }}
        onClick={(event) => {
          event.stopPropagation();

          toggle();
        }}
      >
        {trigger}
      </div>

      {/* Dropdown */}

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            dir={direction}
            style={positionStyle}
            className={className}
            role="menu"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {filteredChildren.map(
              (child, index) => {
                if (
                  !isValidElement(child)
                ) {
                  return child;
                }

                return cloneElement(
                  child,
                  {
                    key: child.key ?? index,

                    onClick: (
                      event: React.MouseEvent
                    ) => {
                      child.props.onClick?.(
                        event
                      );

                      handleItemClick();
                    },
                  }
                );
              }
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default Dropdown;