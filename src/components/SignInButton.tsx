'use client'

import { signIn } from 'next-auth/react'

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="font-mono text-[11px] tracking-[0.06em] uppercase rounded-[30px] px-5 py-3 border border-ink mt-6"
    >
      Se connecter avec Google
    </button>
  )
}
