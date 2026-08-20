/*
 * ========================================
 * DROPDOWN COMPONENT
 * ========================================
 */

import { useState, useRef, useEffect, cloneElement, Children } from 'react';
import { createPortal } from 'react-dom';
import type { DropdownProps, DropdownPosition } from './types';

const positionStyles: Record<DropdownPosition, React.CSSProperties> = {
  'bottom-left': {
    top: '100%',
    left: 0,
    transform: 'translateY(8px)',
  },
  'bottom-right': {
    top: '100%',
    right: 0,
    transform: 'translateY(8px)',
  },
  'top-left': {
    bottom: '100%',
    left: 0,
    transform: 'translateY(-8px)',
  },
  'top-right': {
    bottom: '100%',
    right: 0,
    transform: 'translateY(-8px)',
  },
};

const sizeStyles = {
  sm: { minWidth: '160px' },
  md: { minWidth: '200px' },
  lg: { minWidth: '240px' },
};

export const Dropdown = ({
  trigger,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  position = 'bottom-left',
  size = 'md',
  closeOnClickOutside = true,
  closeOnEscape = true,
  closeOnItemClick = true,
  className = '',
  style = {},
  disabled = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = controlledOpen ?? isOpen;

  const setOpen = (value: boolean) => {
    if (disabled) return;
    setIsOpen(value);
    onOpenChange?.(value);
  };

  const toggle = () => setOpen(!open);

  // Click outside handler
  useEffect(() => {
    if (!closeOnClickOutside || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, closeOnClickOutside]);

  // Escape key handler
  useEffect(() => {
    if (!closeOnEscape || !open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape]);

  // Handle item click
  const handleItemClick = () => {
    if (closeOnItemClick) {
      setOpen(false);
    }
  };

  // Clone trigger with onClick
  const triggerElement = cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => {
      trigger.props.onClick?.(e);
      toggle();
    },
    ref: triggerRef,
    'aria-expanded': open,
    'aria-haspopup': true,
  });

  return (
    <>
      <div ref={triggerRef} style={{ display: 'inline-block' }}>
        {triggerElement}
      </div>

      {open && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            zIndex: 'var(--z-dropdown, 1000)',
            ...positionStyles[position],
            ...sizeStyles[size],
            ...style,
            padding: 'var(--spacing-2, 8px)',
            background: 'var(--color-card, #ffffff)',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--color-border, #e2e8f0)',
            boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
            minWidth: sizeStyles[size].minWidth,
            maxWidth: 'calc(100vw - 32px)',
          }}
          className={className}
          role="menu"
        >
          {Children.map(children, (child) =>
            cloneElement(child as React.ReactElement, {
              onClick: (e: React.MouseEvent) => {
                (child as React.ReactElement).props.onClick?.(e);
                handleItemClick();
              },
            })
          )}
        </div>,
        document.body
      )}
    </>
  );
};