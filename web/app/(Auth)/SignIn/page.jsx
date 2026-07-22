'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setGlobalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGlobalError('');

    try {
      const res = await fetch('http://localhost:4000/api/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 400) {
        // Zod fieldErrors — object of { field: [messages] }
        const fieldErrors = {};
        for (const [field, messages] of Object.entries(data.errors)) {
          fieldErrors[field] = messages[0];
        }
        setErrors(fieldErrors);
        return;
      }

      if (res.status === 401) {
        setGlobalError(data.message);
        return;
      }

      if (!res.ok) {
        setGlobalError('Something went wrong. Please try again.');
        return;
      }

      router.push('/Home');

    } catch {
      setGlobalError('Unable to connect. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    background: errors[field] ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
    color: 'white',
  });

  const handleFocus = (e, field) => {
    if (!errors[field]) {
      e.target.style.border = '1px solid rgba(147,51,234,0.6)';
      e.target.style.boxShadow = '0 0 20px rgba(147,51,234,0.12)';
    }
  };

  const handleBlur = (e, field) => {
    if (!errors[field]) {
      e.target.style.border = '1px solid rgba(255,255,255,0.08)';
      e.target.style.boxShadow = 'none';
    }
  };

  return (
    <main className="min-h-screen bg-black flex">

      {/* LEFT: Form */}
      <div className="relative flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-16 py-16 overflow-hidden">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(109,40,217,0.12)' }} />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(88,28,135,0.15)' }} />

        <div className="relative z-10 max-w-[420px] w-full mx-auto flex flex-col gap-8">

          <Link href="/" className="flex-shrink-0 w-fit">
            <Image src="/EchoverseLogo.svg" alt="Echoverse" width={110} height={70} className="object-contain" />
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="font-['Cinzel',serif] text-[2rem] font-black leading-tight tracking-tight" style={{ color: '#a855f7' }}>
              Welcome Back.
            </h1>
            <p className="text-[0.9rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              The Verse has been waiting for you.
            </p>
          </div>

          {/* Global error */}
          {globalError && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              <p className="text-[0.82rem]" style={{ color: 'rgba(239,68,68,0.9)' }}>{globalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.72rem] font-bold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                onFocus={e => handleFocus(e, 'email')}
                onBlur={e => handleBlur(e, 'email')}
                className="w-full rounded-xl px-4 py-3 text-[0.9rem] outline-none transition-all duration-200"
                style={inputStyle('email')}
              />
              {errors.email && (
                <p className="text-[0.72rem] flex items-center gap-1.5" style={{ color: 'rgba(239,68,68,0.8)' }}>
                  <span>✕</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[0.72rem] font-bold tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Password
                </label>
                <a href="#" className="text-[0.72rem] font-semibold" style={{ color: 'rgba(168,85,247,0.6)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(168,85,247,0.6)'}
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••••••"
                value={form.password}
                onChange={handleChange}
                onFocus={e => handleFocus(e, 'password')}
                onBlur={e => handleBlur(e, 'password')}
                className="w-full rounded-xl px-4 py-3 text-[0.9rem] outline-none transition-all duration-200"
                style={inputStyle('password')}
              />
              {errors.password && (
                <p className="text-[0.72rem] flex items-center gap-1.5" style={{ color: 'rgba(239,68,68,0.8)' }}>
                  <span>✕</span> {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-3.5 rounded-xl text-[0.85rem] font-bold tracking-[0.1em] uppercase text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea, #6b21a8)' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 0 30px rgba(147,51,234,0.5)'; }}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {loading ? 'Entering...' : 'Enter the Verse'}
            </button>

          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
              or continue with
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-[0.85rem] font-semibold tracking-[0.04em] transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-[0.82rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Don't have an account?{' '}
            <Link href="/SignUp" className="font-semibold" style={{ color: 'rgba(168,85,247,0.7)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#a855f7'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(168,85,247,0.7)'}
            >
              Create one
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT: Image */}
      <div className="hidden lg:block relative w-1/2 flex-shrink-0">
        <Image src="/SignInImage.png" alt="The Portal" fill className="object-cover object-center" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.3) 40%, transparent 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
        <div className="absolute bottom-12 left-8 right-8 z-10">
          <p className="font-['Cinzel',serif] text-[1.1rem] font-semibold leading-relaxed" style={{ color: '#a855f7' }}>
            "You've been here before.<br />You just don't remember which version."
          </p>
          <p className="mt-2 text-[0.75rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
            — The Verse, Echoverse
          </p>
        </div>
      </div>

    </main>
  );
}