'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

interface BookmarkButtonProps {
  articleId: string
  initialMarked?: boolean
  variant?: 'hero' | 'icon' | 'remove'
  markedColor?: string
  onToggled?: (marked: boolean) => void
}

export default function BookmarkButton({
  articleId,
  initialMarked = false,
  variant = 'icon',
  markedColor = '#16150f',
  onToggled,
}: BookmarkButtonProps) {
  const { status } = useSession()
  const [marked, setMarked] = useState(initialMarked)
  const [pending, setPending] = useState(false)

  async function toggle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (pending) return

    if (status !== 'authenticated') {
      signIn('google')
      return
    }

    setPending(true)
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      })
      if (res.status === 401) {
        signIn('google')
        return
      }
      const data = await res.json()
      setMarked(Boolean(data.marked))
      onToggled?.(Boolean(data.marked))
    } finally {
      setPending(false)
    }
  }

  if (variant === 'hero') {
    return (
      <button
        onClick={toggle}
        className="font-mono text-[11px] tracking-[0.06em] uppercase rounded-[30px] px-[15px] py-[9px] border text-on-dark"
        style={{ background: 'rgba(243,241,236,0.12)', backdropFilter: 'blur(6px)', borderColor: 'rgba(243,241,236,0.25)' }}
      >
        {marked ? '● Sauvé' : '＋ Garder'}
      </button>
    )
  }

  if (variant === 'remove') {
    return (
      <button onClick={toggle} className="font-mono text-[10px] tracking-[0.04em] uppercase text-accent">
        ● Retirer
      </button>
    )
  }

  return (
    <button onClick={toggle} className="font-mono text-[13px] leading-none">
      {marked ? <span style={{ color: markedColor }}>●</span> : <span>＋</span>}
    </button>
  )
}
