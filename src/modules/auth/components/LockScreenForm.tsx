/*
 * ========================================
 * LOCK SCREEN FORM
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
import { Avatar } from '../../../core/components/ui/Avatar';
import { Eye, EyeOff, Lock } from 'lucide-react';

const lockScreenSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LockScreenFormValues = z.infer<typeof lockScreenSchema>;

interface LockScreenFormProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userInitials?: string;
  onSubmit?: (data: LockScreenFormValues) => void;
  isLoading?: boolean;
}

const LockScreenForm = ({
  userName = 'Admin User',
  userEmail = 'admin@example.com',
  userAvatar = '',
  userInitials = 'AU',
  onSubmit,
  isLoading = false,
}: LockScreenFormProps) => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LockScreenFormValues>({
    resolver: zodResolver(lockScreenSchema),
    defaultValues: {
      password: '',
    },
  });

  const handleSubmit = (data: LockScreenFormValues) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      toast.toast({
        title: isRTL ? 'تم الفتح' : 'Unlocked',
        message: isRTL ? 'تم فتح الشاشة بنجاح' : 'Screen unlocked successfully',
        variant: 'success',
      });
      console.log('Lock screen data:', data);
    }
  };

  return (
    <>
      {/* ===== User Avatar ===== */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <Avatar
          src={userAvatar || undefined}
          alt={userName}
          fallback={userInitials}
          size="xl"
          status="online"
        />

        <div
          style={{
            marginTop: '0.5rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 'var(--font-size-md, 16px)',
              fontWeight: 'var(--font-weight-semibold, 600)',
              color: 'var(--color-text, #0f172a)',
            }}
          >
            {userName}
          </div>
          <div
            style={{
              fontSize: 'var(--font-size-sm, 14px)',
              color: 'var(--color-text-secondary, #475569)',
            }}
          >
            {userEmail}
          </div>
        </div>
      </div>

      {/* ===== Form ===== */}
      <Form form={form} onSubmit={handleSubmit} schema={lockScreenSchema}>
        <FormField name="password">
          <FormItem>
            <FormLabel required>{isRTL ? 'كلمة المرور' : 'Password'}</FormLabel>
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={isRTL ? 'أدخل كلمة المرور للفتح' : 'Enter password to unlock'}
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

        <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
          {isRTL ? 'فتح الشاشة' : 'Unlock'}
        </Button>
      </Form>
    </>
  );
};

export default LockScreenForm;