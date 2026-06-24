/**
 * LoginForm Component
 * 
 * React Hook Form Concepts:
 * - useForm(): Returns register, handleSubmit, formState (errors)
 * - register(): Connects inputs to the form (name, validation rules)
 * - handleSubmit(): Wraps onSubmit, validates before calling
 * - formState.errors: Contains validation error messages
 * - Validation rules: { required, minLength, pattern } on each field
 */

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const LoginForm = () => {
  const { login, isLoading, error, clearError } = useAuth();

  // useForm provides form state management and validation
  const {
    register,       // Registers an input field with validation rules
    handleSubmit,   // Wrapper that validates before calling your submit handler
    formState: { errors }, // Object containing validation errors per field
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Called only if validation passes
  const onSubmit = async (data) => {
    clearError();
    await login(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
            IP
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-400">Sign in to your Interview Prep Tracker</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                // register() returns { onChange, onBlur, ref, name } — connects input to RHF
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" loading={isLoading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
