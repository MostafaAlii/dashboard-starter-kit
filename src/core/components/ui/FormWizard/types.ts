/*
 * ========================================
 * FORM WIZARD TYPES
 * ========================================
 */

import { ReactNode } from "react";

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  icon?: ReactNode;
  isOptional?: boolean;
  isValid?: boolean;
}

export interface FormWizardProps {
  steps: Step[];
  currentStep?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  className?: string;
  showNavigation?: boolean;
  showStepNumbers?: boolean;
  orientation?: "horizontal" | "vertical";
  nextLabel?: string;
  prevLabel?: string;
  completeLabel?: string;
}
