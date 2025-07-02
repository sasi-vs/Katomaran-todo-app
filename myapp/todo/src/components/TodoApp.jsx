import React from 'react'
import { TodoHeader } from './TodoHeader'
import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { useTodos } from '../hooks/useTodos'

export function TodoApp() {
  const {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    refetch,
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <TodoHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          loading={loading}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          refetch={refetch}
        />
      </main>
    </div>
  )
}
