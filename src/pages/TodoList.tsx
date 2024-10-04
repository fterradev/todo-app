import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';

const TodoList: React.FC = () => {
  const todos = useTodos();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      todos?.addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <h2>Your To-Do List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos?.todos.map((todo) =>
        <li key={todo.id}>
            <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todos.toggleTodo(todo.id)}
            />
            {todo.text}
            </label>
        </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
