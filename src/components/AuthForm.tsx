'use client'

import { useState } from 'react'
import { createClient } from '@/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Props{
  mode: 'login' | 'signup'
}

export default function AuthForm({mode}:Props) {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>

            <div className="text-sm text-center">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <Link href='/signup'><span
                    className="text-primary cursor-pointer"
                    
                  >
                    Sign Up
                  </span></Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link href='/login'><span
                    className="text-primary cursor-pointer"
                  >
                    Sign In
                  </span></Link>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
