/*
 * ========================================
 * RESET PASSWORD FORM
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
import { Eye, EyeOff, Lock } from 'lucide-react';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token?: string | null;
  onSubmit?: (data: ResetPasswordFormValues & { token?: string }) => void;
  isLoading?: boolean;
}

const ResetPasswordForm = ({ token, onSubmit, isLoading = false }: ResetPasswordFormProps) => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.toast({
        title: isRTL ? 'خطأ' : 'Error',
        message: isRTL ? 'الرمز غير صالح' : 'Invalid token',
        variant: 'error',
      });
      return;
    }

    if (onSubmit) {
      onSubmit({ ...data, token });
    } else {
      setIsSuccess(true);
      toast.toast({
        title: isRTL ? 'تم التغيير' : 'Changed',
        message: isRTL ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully',
        variant: 'success',
      });
      console.log('Reset password data:', { ...data, token });
    }
  };

  if (isSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>✅</div>
        <h3
          style={{
            fontSize: 'var(--font-size-md, 16px)',
            fontWeight: 'var(--font-weight-semibold, 600)',
            color: 'var(--color-text, #0f172a)',
            marginBottom: '0.25rem',
          }}
        >
          {isRTL ? 'تم تغيير كلمة المرور!' : 'Password Changed!'}
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text-secondary, #475569)',
          }}
        >
          {isRTL
            ? 'تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.'
            : 'Your password has been changed successfully. You can now log in.'}
        </p>
        <Link to="/auth/login">
          <Button variant="primary" size="sm" style={{ marginTop: '0.5rem' }}>
            {isRTL ? 'تسجيل الدخول' : 'Log In'}
          </Button>
        </Link>
      </div>
    );
  }

  if (!token) {
    return (
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>⚠️</div>
        <h3
          style={{
            fontSize: 'var(--font-size-md, 16px)',
            fontWeight: 'var(--font-weight-semibold, 600)',
            color: 'var(--color-text, #0f172a)',
            marginBottom: '0.25rem',
          }}
        >
          {isRTL ? 'الرمز غير صالح' : 'Invalid Token'}
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text-secondary, #475569)',
          }}
        >
          {isRTL
            ? 'الرمز غير صالح أو منتهي الصلاحية. يرجى طلب رابط جديد.'
            : 'The token is invalid or expired. Please request a new link.'}
        </p>
        <Link to="/auth/forgot-password">
          <Button variant="primary" size="sm" style={{ marginTop: '0.5rem' }}>
            {isRTL ? 'طلب رابط جديد' : 'Request New Link'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Form form={form} onSubmit={handleSubmit} schema={resetPasswordSchema}>
      <FormField name="password">
        <FormItem>
          <FormLabel required>{isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</FormLabel>
          <FormControl>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={isRTL ? 'أدخل كلمة المرور الجديدة' : 'Enter new password'}
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
              autoComplete="new-password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="confirmPassword">
        <FormItem>
          <FormLabel required>{isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}</FormLabel>
          <FormControl>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={isRTL ? 'أعد إدخال كلمة المرور' : 'Re-enter new password'}
              leftIcon={<Lock size={18} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              autoComplete="new-password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
        {isRTL ? 'تغيير كلمة المرور' : 'Reset Password'}
      </Button>

      <div style={{ textAlign: 'center' }}>
        <Link
          to="/auth/login"
          style={{
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text-secondary, #475569)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text, #0f172a)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary, #475569)';
          }}
        >
          {isRTL ? '← العودة إلى تسجيل الدخول' : '← Back to Login'}
        </Link>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;