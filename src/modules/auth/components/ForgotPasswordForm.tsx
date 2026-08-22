/*
 * ========================================
 * FORGOT PASSWORD FORM
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
import { Mail } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSubmit?: (data: ForgotPasswordFormValues) => void;
  isLoading?: boolean;
}

const ForgotPasswordForm = ({ onSubmit, isLoading = false }: ForgotPasswordFormProps) => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const toast = useToast();
  const [isSent, setIsSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (data: ForgotPasswordFormValues) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      setIsSent(true);
      toast.toast({
        title: isRTL ? 'تم الإرسال' : 'Sent',
        message: isRTL
          ? 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني'
          : 'Reset link sent to your email',
        variant: 'success',
      });
      console.log('Forgot password data:', data);
    }
  };

  if (isSent) {
    return (
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>📧</div>
        <h3
          style={{
            fontSize: 'var(--font-size-md, 16px)',
            fontWeight: 'var(--font-weight-semibold, 600)',
            color: 'var(--color-text, #0f172a)',
            marginBottom: '0.25rem',
          }}
        >
          {isRTL ? 'تم الإرسال!' : 'Email Sent!'}
        </h3>
        <p
          style={{
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text-secondary, #475569)',
          }}
        >
          {isRTL
            ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
            : 'A password reset link has been sent to your email'}
        </p>
        <Button
          variant="outline"
          size="sm"
          style={{ marginTop: '0.5rem' }}
          onClick={() => setIsSent(false)}
        >
          {isRTL ? 'إعادة المحاولة' : 'Try Again'}
        </Button>
      </div>
    );
  }

  return (
    <Form form={form} onSubmit={handleSubmit} schema={forgotPasswordSchema}>
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

      <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
        {isRTL ? 'إرسال رابط إعادة التعيين' : 'Send Reset Link'}
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;