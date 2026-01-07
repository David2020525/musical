import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Locale } from '../types'
import { defaultLocale } from '../lib/i18n'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

// Auth store
export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      updateUser: user =>
        set(state => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Locale store
export const useLocaleStore = create<LocaleState>()(
  persist(
    set => ({
      locale: defaultLocale,
      setLocale: locale => set({ locale }),
    }),
    {
      name: 'locale-storage',
    }
  )
)

// UI store
export const useUIStore = create<UIState>()(set => ({
  sidebarOpen: false,
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: open => set({ sidebarOpen: open }),
}))
