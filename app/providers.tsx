'use client'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import NextAuthProvider from '@/components/providers/NextAuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </NextAuthProvider>
  )
}