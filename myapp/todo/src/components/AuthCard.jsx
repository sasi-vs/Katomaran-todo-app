import React from 'react'
import { Mail, CheckSquare } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export function AuthCard() {
  const { signInWithGoogle } = useAuth()

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TodoFlow</h1>
          <p className="text-gray-600">Organize your tasks with style</p>
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
        >
          <Mail className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          Sign in to sync your todos across all devices
        </div>
      </div>
    </div>
  )
}