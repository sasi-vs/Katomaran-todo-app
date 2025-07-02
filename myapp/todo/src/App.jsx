import React from 'react'
import { useAuth } from './hooks/useAuth'
import { AuthCard } from './components/AuthCard'
import { TodoApp } from './components/TodoApp'
import { ToastProvider } from './components/ToastProvider'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <ToastProvider>
      {user ? <TodoApp /> : <AuthCard />}
    </ToastProvider>
  )
}

export default App
