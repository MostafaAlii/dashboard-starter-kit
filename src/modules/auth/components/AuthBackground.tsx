/*
 * ========================================
 * AUTH BACKGROUND - Geometric Shapes
 * ========================================
 */

import { ReactNode } from 'react';
import { useLanguage } from '../../../core/providers/LanguageProvider';
import { useTheme } from '../../../core/providers/ThemeProvider';

interface AuthBackgroundProps {
  children: ReactNode;
}

const AuthBackground = ({ children }: AuthBackgroundProps) => {
  const { direction } = useLanguage();
  const { resolvedTheme } = useTheme();
  const isRTL = direction === 'rtl';
  const isDark = resolvedTheme === 'dark';

  // ===== Colors based on theme =====
  const shapeColors = isDark
    ? {
        primary: 'rgba(255,255,255,0.04)',
        secondary: 'rgba(255,255,255,0.03)',
        accent: 'rgba(255,255,255,0.06)',
        glow: 'rgba(255,255,255,0.02)',
        triangle: 'rgba(255,255,255,0.05)',
      }
    : {
        primary: 'rgba(59, 130, 246, 0.06)',
        secondary: 'rgba(139, 92, 246, 0.04)',
        accent: 'rgba(59, 130, 246, 0.08)',
        glow: 'rgba(59, 130, 246, 0.03)',
        triangle: 'rgba(59, 130, 246, 0.10)',
      };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflow: 'hidden',
        background: 'var(--color-background)',
        direction: isRTL ? 'rtl' : 'ltr',
        width: '100vw',
        height: '100vh',
        height: '100dvh',
      }}
    >
      {/* ===== Geometric Shapes Background ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        {/* ===== Triangles (Opposite) ===== */}

        {/* Triangle Top-Left (pointing down-right) */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            width: 0,
            height: 0,
            borderLeft: '180px solid transparent',
            borderRight: '180px solid transparent',
            borderTop: `250px solid ${shapeColors.triangle}`,
            opacity: isDark ? 0.4 : 0.6,
            transform: 'rotate(15deg)',
            animation: 'floatShape 30s ease-in-out infinite',
          }}
        />

        {/* Triangle Bottom-Right (pointing up-left) */}
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            right: '-5%',
            width: 0,
            height: 0,
            borderLeft: '180px solid transparent',
            borderRight: '180px solid transparent',
            borderBottom: `250px solid ${shapeColors.triangle}`,
            opacity: isDark ? 0.4 : 0.6,
            transform: 'rotate(-15deg)',
            animation: 'floatShape 30s ease-in-out infinite reverse',
            animationDelay: '-10s',
          }}
        />

        {/* Triangle Top-Right (smaller) */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            width: 0,
            height: 0,
            borderLeft: '80px solid transparent',
            borderRight: '80px solid transparent',
            borderTop: `110px solid ${shapeColors.accent}`,
            opacity: isDark ? 0.2 : 0.4,
            transform: 'rotate(45deg)',
            animation: 'floatShape 25s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />

        {/* Triangle Bottom-Left (smaller) */}
        <div
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '6%',
            width: 0,
            height: 0,
            borderLeft: '60px solid transparent',
            borderRight: '60px solid transparent',
            borderBottom: `85px solid ${shapeColors.accent}`,
            opacity: isDark ? 0.2 : 0.4,
            transform: 'rotate(-30deg)',
            animation: 'floatShape 25s ease-in-out infinite reverse',
            animationDelay: '-8s',
          }}
        />

        {/* ===== Floating Shapes ===== */}

        {/* Circle 1 - Large */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '30%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${shapeColors.primary} 0%, transparent 70%)`,
            animation: 'floatShape 20s ease-in-out infinite',
            animationDelay: '-3s',
          }}
        />

        {/* Circle 2 - Medium */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '30%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${shapeColors.secondary} 0%, transparent 70%)`,
            animation: 'floatShape 22s ease-in-out infinite reverse',
            animationDelay: '-7s',
          }}
        />

        {/* Square 1 */}
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '10%',
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: shapeColors.primary,
            transform: 'rotate(45deg)',
            animation: 'floatShape 18s ease-in-out infinite',
            animationDelay: '-12s',
          }}
        />

        {/* Square 2 */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '12%',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: shapeColors.accent,
            transform: 'rotate(25deg)',
            animation: 'floatShape 16s ease-in-out infinite',
            animationDelay: '-4s',
          }}
        />

        {/* Hexagon */}
        <div
          style={{
            position: 'absolute',
            top: '55%',
            right: '6%',
            width: '50px',
            height: '50px',
            background: shapeColors.accent,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            animation: 'floatShape 28s ease-in-out infinite',
            animationDelay: '-15s',
          }}
        />

        {/* ===== Soft Glow ===== */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${shapeColors.glow} 0%, transparent 70%)`,
            opacity: isDark ? 0.3 : 0.5,
          }}
        />
      </div>

      {/* ===== Content ===== */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '420px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes floatShape {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(20px, -15px) scale(1.05) rotate(3deg);
          }
          50% {
            transform: translate(-15px, 20px) scale(0.95) rotate(-3deg);
          }
          75% {
            transform: translate(10px, -8px) scale(1.02) rotate(2deg);
          }
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthBackground;