import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const SignupForm = () => {
  const { signup, isLoading, error, clearError } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { name: '', email: '', password: '', confirmPassword: '' } });
  const password = watch('password');

  const onSubmit = async (data) => { clearError(); await signup({ name: data.name, email: data.email, password: data.password }); };

  const inputCls = 'w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900/80 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all';

  return (
    <div className="flex min-h-screen" style={{ background: '#09090b' }}>
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/8 via-transparent to-indigo-600/8" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px]" />
        <div className="relative text-center px-12 z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-lg mx-auto shadow-lg shadow-indigo-500/20">IP</div>
          <h2 className="mt-6 text-3xl font-bold text-zinc-100 tracking-tight">Start Preparing Smarter</h2>
          <p className="mt-3 text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">Join thousands of engineers who use Interview Preparation Tracker to ace their technical interviews.</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm mb-8 mx-auto">IP</div>
          <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">Create your account</h1>
          <p className="mt-1.5 text-sm text-zinc-500">Start tracking your interview preparation</p>

          {error && <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/5 px-3.5 py-2.5 text-sm text-red-400">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider">Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="text" {...register('name', { required: 'Name is required' })} className={inputCls} placeholder="Your name" />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })}
                  className={inputCls} placeholder="you@example.com" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="password" {...register('password', { required: 'Required', minLength: { value: 8, message: 'Min 8 chars' } })}
                  className={inputCls} placeholder="••••••••" />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="password" {...register('confirmPassword', { required: 'Required', validate: (v) => v === password || 'Passwords do not match' })}
                  className={inputCls} placeholder="••••••••" />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" loading={isLoading} className="w-full" size="lg">Create Account <ArrowRight size={15} /></Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
