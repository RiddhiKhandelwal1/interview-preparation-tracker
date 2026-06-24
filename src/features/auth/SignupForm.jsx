/**
 * SignupForm Component
 * 
 * Registration form with React Hook Form validation.
 * Demonstrates password confirmation matching using RHF's validate function.
 */

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const SignupForm = () => {
  const { signup, isLoading, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    watch,            // watch() lets us observe another field's value for cross-field validation
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    clearError();
    await signup({ name: data.name, email: data.email, password: data.password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-1/4 h-[800px] w-[800px] rounded-full bg-purple-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
            IP
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="mt-1 text-sm text-gray-400">Start your interview preparation journey</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm p-8">
          {error && (
            <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
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
              {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                })}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1.5 text-xs text-rose-400">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="signup-confirm" className="mb-1.5 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                id="signup-confirm"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  // Custom validation: cross-field validation using watch()
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-rose-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" loading={isLoading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
