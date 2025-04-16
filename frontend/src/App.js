import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5225/todos") 
      .then(res => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ToDo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
