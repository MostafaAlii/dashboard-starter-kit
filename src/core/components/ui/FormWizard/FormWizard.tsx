/*
 * ========================================
 * FORM WIZARD COMPONENT
 * ========================================
 */

import { forwardRef, useState, useEffect } from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { FormWizardProps } from './types';
import { Button } from '../Button';
import { Badge } from '../Badge';

export const FormWizard = forwardRef<HTMLDivElement, FormWizardProps>(
  (
    {
      steps,
      currentStep: controlledCurrentStep,
      defaultStep = 0,
      onStepChange,
      onComplete,
      className = '',
      showNavigation = true,
      showStepNumbers = true,
      orientation = 'horizontal',
      nextLabel,
      prevLabel,
      completeLabel,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const [internalCurrentStep, setInternalCurrentStep] = useState(defaultStep);
    const currentStep = controlledCurrentStep ?? internalCurrentStep;

    const isHorizontal = orientation === 'horizontal';
    const totalSteps = steps.length;
    const isLastStep = currentStep === totalSteps - 1;
    const currentStepData = steps[currentStep];

    const handleStepChange = (step: number) => {
      if (step < 0 || step >= totalSteps) return;
      if (controlledCurrentStep === undefined) {
        setInternalCurrentStep(step);
      }
      onStepChange?.(step);
    };

    const handleNext = () => {
      if (isLastStep) {
        onComplete?.();
      } else {
        handleStepChange(currentStep + 1);
      }
    };

    const handlePrev = () => {
      handleStepChange(currentStep - 1);
    };

    const goToStep = (index: number) => {
      if (index < currentStep) {
        handleStepChange(index);
      }
    };

    const defaultNextLabel = isRTL ? 'التالي' : 'Next';
    const defaultPrevLabel = isRTL ? 'السابق' : 'Previous';
    const defaultCompleteLabel = isRTL ? 'إكمال' : 'Complete';

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {/* ===== Steps Progress ===== */}
        <div
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            alignItems: isHorizontal ? 'center' : 'flex-start',
            gap: isHorizontal ? '0' : '0.75rem',
            position: 'relative',
          }}
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isClickable = index < currentStep;

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  flex: isHorizontal ? 1 : 'auto',
                  width: isHorizontal ? 'auto' : '100%',
                  cursor: isClickable ? 'pointer' : 'default',
                }}
                onClick={() => isClickable && goToStep(index)}
              >
                {/* Step Circle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? 'var(--color-success, #22c55e)'
                      : isActive
                      ? 'var(--color-primary, #3b82f6)'
                      : 'var(--color-background-secondary, #f1f5f9)',
                    color: isCompleted || isActive ? '#ffffff' : 'var(--color-text-secondary, #475569)',
                    fontWeight: 'var(--font-weight-semibold, 600)',
                    fontSize: 'var(--font-size-sm, 14px)',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? (
                    <Check size={18} />
                  ) : showStepNumbers ? (
                    index + 1
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Step Info */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-sm, 14px)',
                      fontWeight: isActive ? 'var(--font-weight-semibold, 600)' : 'var(--font-weight-normal, 400)',
                      color: isActive || isCompleted ? 'var(--color-text, #0f172a)' : 'var(--color-text-secondary, #475569)',
                    }}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs, 12px)',
                        color: 'var(--color-text-muted, #94a3b8)',
                      }}
                    >
                      {step.description}
                    </span>
                  )}
                </div>

                {/* Optional Badge */}
                {step.isOptional && (
                  <Badge variant="ghost" size="xs">
                    {isRTL ? 'اختياري' : 'Optional'}
                  </Badge>
                )}

                {/* Separator Line */}
                {isHorizontal && index < totalSteps - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      background: index < currentStep
                        ? 'var(--color-success, #22c55e)'
                        : 'var(--color-border, #e2e8f0)',
                      transition: 'background 0.3s ease',
                      minWidth: '20px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ===== Step Content ===== */}
        <div
          style={{
            padding: '1.5rem',
            background: 'var(--color-card, #ffffff)',
            borderRadius: 'var(--radius-lg, 12px)',
            border: '1px solid var(--color-border, #e2e8f0)',
            minHeight: '200px',
          }}
        >
          {currentStepData.content}
        </div>

        {/* ===== Navigation ===== */}
        {showNavigation && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--color-border, #e2e8f0)',
            }}
          >
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              leftIcon={isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            >
              {prevLabel || defaultPrevLabel}
            </Button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'var(--font-size-sm, 14px)',
                color: 'var(--color-text-muted, #94a3b8)',
              }}
            >
              <span>
                {currentStep + 1} {isRTL ? 'من' : 'of'} {totalSteps}
              </span>
            </div>

            <Button
              variant="primary"
              onClick={handleNext}
              rightIcon={isLastStep ? undefined : (isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />)}
            >
              {isLastStep ? (completeLabel || defaultCompleteLabel) : (nextLabel || defaultNextLabel)}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

FormWizard.displayName = 'FormWizard';

export default FormWizard;