'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useUIStore } from '@/store/ui'
import { fetchSavedSlugs, fetchUserRole } from '@/lib/db'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const signIn = useUIStore(s => s.signIn)
  const signOut = useUIStore(s => s.signOut)
  const loadSaved = useUIStore(s => s.loadSaved)
  const setAuthReady = useUIStore(s => s.setAuthReady)

  useEffect(() => {
    const fallback = setTimeout(() => setAuthReady(true), 5000)

    if (!supabase) { clearTimeout(fallback); setAuthReady(true); return }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        if (session?.user) {
          const role = await fetchUserRole(session.user.id).catch(() => 'user' as const)
          signIn(session.user.id, session.user.email ?? '', role)
          fetchSavedSlugs(session.user.id).then(loadSaved).catch(() => {})
        } else {
          setAuthReady(true)
        }
      } finally {
        clearTimeout(fallback)
      }
    }).catch(() => { setAuthReady(true); clearTimeout(fallback) })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const role = await fetchUserRole(session.user.id).catch(() => 'user' as const)
        signIn(session.user.id, session.user.email ?? '', role)
        fetchSavedSlugs(session.user.id).then(loadSaved).catch(() => {})
      } else {
        signOut()
      }
    })

    return () => { clearTimeout(fallback); subscription.unsubscribe() }
  }, [signIn, signOut, loadSaved, setAuthReady])

  return <>{children}</>
}
