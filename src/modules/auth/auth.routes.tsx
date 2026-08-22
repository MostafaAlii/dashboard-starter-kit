import type { RouteObject } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import LockScreenPage from './pages/LockScreenPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const authRoutes: RouteObject = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'lock-screen',
      element: <LockScreenPage />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />,
    },
  ],
};

export default authRoutes;