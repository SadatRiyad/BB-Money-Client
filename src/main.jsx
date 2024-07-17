import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
// import AuthProvider from './components/ContextAPI/AuthProvider/AuthProvider'
AOS.init();
// Tanstack Query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { router } from './components/Routes/Routes'
import AuthProvider from './components/ContextAPI/AuthProvider/AuthProvider'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)