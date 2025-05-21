
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/supabase/client' 
export function useLogout(redirectTo: string = '/login') {
  const supabase =createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error:', error.message)
      setLoading(false)
      return
    }

     router.push(redirectTo)
    router.refresh()
    setLoading(false)
  }

  return { logout, loading }
}
