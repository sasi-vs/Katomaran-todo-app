import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .or('user_id.eq.' + user?.id + ',shared_with.cs.{'+ user?.email +'}')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchTodos()
    }
  }, [user, fetchTodos])

  const addTodo = async (todo) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert({
          ...todo,
          user_id: user?.id,
          shared_with: todo.shared_with || []
        })
        .select()
        .single()

      if (error) throw error
      await fetchTodos()
      return data
    } catch (error) {
      console.error('Error adding todo:', error)
      throw error
    }
  }

  const updateTodo = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single()

      if (error) throw error
      await fetchTodos()
      return data
    } catch (error) {
      console.error('Error updating todo:', error)
      throw error
    }
  }

  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error
      await fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
      throw error
    }
  }

  const toggleComplete = async (id, completed) => {
    try {
      // Optimistic UI update for immediate UI feedback
      setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed } : todo))

      const { data, error } = await supabase
        .from('todos')
        .update({ completed })
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single()

      if (error) {
        console.error('Supabase toggleComplete error:', error)
        throw error
      }
      // Replace optimistic todo with actual data from backend
      setTodos(prev => prev.map(todo => todo.id === id ? data : todo))
      return data
    } catch (error) {
      console.error('Error toggling complete:', error)
      throw error
    }
  }

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    refetch: fetchTodos,
  }
}
