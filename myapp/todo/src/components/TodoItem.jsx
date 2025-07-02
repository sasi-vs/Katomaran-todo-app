import React, { useState } from 'react'
import { Check, Edit2, Trash2, Calendar, Flag, Tag, Clock } from 'lucide-react'

const priorityColors = {
  low: 'text-green-600 bg-green-50 border-green-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  high: 'text-red-600 bg-red-50 border-red-200',
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export function TodoItem({ todo, toggleComplete, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || '')

  const handleToggleComplete = async () => {
    try {
      await toggleComplete(todo.id, !todo.completed)
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const handleUpdate = async () => {
    if (!title.trim()) return
    
    try {
      await updateTodo(todo.id, {
        title: title.trim(),
        description: description.trim() || undefined,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(todo.id)
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all duration-200 hover:shadow-xl ${
      todo.completed ? 'border-green-200 bg-green-50/50' : 'border-white/20'
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check className="h-3 w-3" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={`text-lg font-semibold ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {todo.title}
              </h3>
              
              {todo.description && (
                <p className={`mt-1 text-gray-600 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                  priorityColors[todo.priority]
                }`}>
                  <Flag className="h-3 w-3" />
                  {priorityLabels[todo.priority]}
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                  <Tag className="h-3 w-3" />
                  {todo.category}
                </span>

                {todo.due_date && (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isOverdue ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Calendar className="h-3 w-3" />
                    {formatDate(todo.due_date)}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-500 rounded-full text-xs">
                  <Clock className="h-3 w-3" />
                  {formatDate(todo.created_at)}
                </span>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit task"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
