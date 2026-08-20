/*
 * ========================================
 * INPUT TYPES
 * ========================================
 */

import {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "outline";
export type InputState = "default" | "error" | "success" | "warning";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  warning?: string;
  hint?: string;
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  containerClassName?: string;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  warning?: string;
  hint?: string;
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  fullWidth?: boolean;
  className?: string;
  containerClassName?: string;
  rows?: number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: string;
  warning?: string;
  hint?: string;
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  fullWidth?: boolean;
  className?: string;
  containerClassName?: string;
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  size?: InputSize;
  state?: InputState;
  className?: string;
  containerClassName?: string;
}

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  size?: InputSize;
  state?: InputState;
  className?: string;
  containerClassName?: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  label?: string;
  error?: string;
  hint?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  size?: "sm" | "md" | "lg";
  state?: InputState;
  className?: string;
  containerClassName?: string;
  thumbIcon?: ReactNode;
}
