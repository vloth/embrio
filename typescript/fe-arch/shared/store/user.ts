import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Domain } from '../types'

type UserStore = {
  user: Domain.User | undefined
  fetchCurrentUser: () => Promise<void>
  updateName: (newName: string) => void
}

export const useUserStore = create<UserStore>(
  persist(
    (set, get) => ({
      user: undefined,

      fetchCurrentUser: async () => {
        if (get().user) return
        const response = await fetch('/api/me')
        set({ user: await response.json() })
      },

      updateName: name => set(state => ({ user: { ...state.user, name } }))
    }),
    { name: 'aqoiueruwe' }
  )
)
