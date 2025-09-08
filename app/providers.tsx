'use client'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import NextAuthProvider from '@/components/providers/NextAuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <Provider store={store}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="toast-container"
        />
      </Provider>
    </NextAuthProvider>
  )
}