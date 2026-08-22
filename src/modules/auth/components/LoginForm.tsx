/*
 * ========================================
 * LOGIN FORM
 * ========================================
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../core/providers/LanguageProvider';
import { useToast } from '../../../core/components/ui/Toast';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../../core/components/forms';
import { Input } from '../../../core/components/ui/Input';
import { Button } from '../../../core/components/ui/Button';
import { Checkbox } from '../../../core/components/ui/Input';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const handleSubmit = (data: LoginFormValues) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      toast.toast({
        title: isRTL ? 'جاري تسجيل الدخول...' : 'Logging in...',
        message: isRTL ? 'تم تسجيل الدخول بنجاح' : 'Login successful',
        variant: 'success',
      });
      console.log('Login data:', data);
    }
  };

  return (
    <Form form={form} onSubmit={handleSubmit} schema={loginSchema}>
      {/* ===== Email ===== */}
      <FormField name="email">
        <FormItem>
          <FormLabel required>{isRTL ? 'البريد الإلكتروني' : 'Email'}</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder={isRTL ? 'example@email.com' : 'example@email.com'}
              leftIcon={<Mail size={18} />}
              autoComplete="email"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      {/* ===== Password ===== */}
      <FormField name="password">
        <FormItem>
          <FormLabel required>{isRTL ? 'كلمة المرور' : 'Password'}</FormLabel>
          <FormControl>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
              leftIcon={<Lock size={18} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted, #94a3b8)',
                    padding: 0,
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              autoComplete="current-password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      {/* ===== Remember Me + Forgot Password ===== */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <FormField name="remember">
          <FormItem>
            <FormControl>
              <Checkbox
                label={isRTL ? 'تذكرني' : 'Remember me'}
                style={{
                  fontSize: 'var(--font-size-sm, 14px)',
                  color: 'var(--color-text-secondary, #475569)',
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Link
          to="/auth/forgot-password"
          style={{
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-primary, #3b82f6)',
            textDecoration: 'none',
            fontWeight: 'var(--font-weight-medium, 500)',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-primary-hover, #2563eb)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-primary, #3b82f6)';
          }}
        >
          {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
        </Link>
      </div>

      {/* ===== Submit Button ===== */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
      >
        {isRTL ? 'تسجيل الدخول' : 'Log In'}
      </Button>

      {/* ===== Lock Screen Link ===== */}
      <div style={{ textAlign: 'center' }}>
        <Link
          to="/auth/lock-screen"
          style={{
            fontSize: 'var(--font-size-xs, 12px)',
            color: 'var(--color-text-muted, #94a3b8)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary, #475569)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-muted, #94a3b8)';
          }}
        >
          🔒 {isRTL ? 'قفل الشاشة' : 'Lock Screen'}
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;