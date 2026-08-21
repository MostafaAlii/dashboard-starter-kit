/*
 * ========================================
 * FORMS TYPES
 * ========================================
 */

import { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { ZodSchema } from "zod";
export type FieldPath<TFieldValues extends FieldValues> = keyof TFieldValues &
  string;

export type FieldError = {
  type: string;
  message?: string;
  ref?: any;
};

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  children: ReactNode;
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  className?: string;
  schema?: ZodSchema<TFieldValues>;
}

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  children: ReactNode;
  className?: string;
}

export interface FormItemProps {
  children: ReactNode;
  className?: string;
}

export interface FormLabelProps {
  children: ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}

export interface FormControlProps {
  children: ReactNode;
  className?: string;
}

export interface FormMessageProps {
  children?: ReactNode;
  className?: string;
}

export interface FormDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface FormFieldContextValue {
  name: string;
  error?: FieldError;
}

export interface FormItemContextValue {
  id: string;
}
