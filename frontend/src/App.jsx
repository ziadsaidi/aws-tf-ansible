// src/App.jsx
import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle, Trash, PlusCircle, Edit, X } from 'lucide-react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');

  const API_URL = "http://44.202.148.89/api"; // Updated to match your port

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Failed to load todos. Is the server running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newTodoTitle.trim(),
          isCompleted: false
        })
      });
      
      if (!response.ok) throw new Error("Failed to add todo");
      
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: todo.id,
          title: todo.title,
          isCompleted: !todo.isCompleted
        })
      });
      
      if (!response.ok) throw new Error("Failed to update todo");
      
      setTodos(todos.map(t => 
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      ));
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error("Failed to delete todo");
      
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    }
  };

  // Start editing a todo
  const startEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditText(todo.title);
  };

  // Save edited todo
  const saveEdit = async () => {
    if (!editText.trim()) return;
    
    const todo = todos.find(t => t.id === editingTodo);
    
    try {
      const response = await fetch(`${API_URL}/todos/${editingTodo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingTodo,
          title: editText,
          isCompleted: todo.isCompleted
        })
      });
      
      if (!response.ok) throw new Error("Failed to update todo");
      
      setTodos(todos.map(t => 
        t.id === editingTodo ? { ...t, title: editText } : t
      ));
      setEditingTodo(null);
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTodo(null);
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <div className="todo-card">
        <div className="card-header">
          <h1>Todo App</h1>
        </div>
        
        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button type="submit" className="add-button">
            <PlusCircle size={20} />
          </button>
        </form>
        
        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Loading State */}
        {loading ? (
          <div className="loading-message">
            Loading todos...
          </div>
        ) : (
          // Todo List
          <ul className="todo-list">
            {todos.length === 0 ? (
              <li className="empty-message">
                No todos yet. Add one above!
              </li>
            ) : (
              todos.map(todo => (
                <li key={todo.id} className="todo-item">
                  {editingTodo === todo.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-input"
                        autoFocus
                      />
                      <button 
                        onClick={saveEdit} 
                        className="save-button"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button 
                        onClick={cancelEdit} 
                        className="cancel-button"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => toggleTodo(todo)} 
                        className={`toggle-button ${todo.isCompleted ? 'completed' : ''}`}
                      >
                        {todo.isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                      </button>
                      <span 
                        className={`todo-title ${todo.isCompleted ? 'completed-text' : ''}`}
                      >
                        {todo.title}
                      </span>
                      <div className="action-buttons">
                        <button 
                          onClick={() => startEdit(todo)} 
                          className="edit-button"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteTodo(todo.id)} 
                          className="delete-button"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        )}
        
        {/* Footer */}
        <div className="card-footer">
          {!loading && todos.length > 0 && (
            <span>
              {todos.filter(t => t.isCompleted).length} of {todos.length} tasks completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;