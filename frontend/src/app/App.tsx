/**
 * @fileoverview Root application component. Wraps the app with providers and routing.
 */
import './i18n/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routing/AppRouter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    }
  }
})

/**
 * Top-level component that composes the data-fetching and routing providers
 * before delegating to {@link AppRouter} for page-level rendering.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
