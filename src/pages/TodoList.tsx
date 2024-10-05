import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { Button, Checkbox, FormControlLabel, List, ListItem, TextField, Typography } from '@mui/material';

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
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Your To-Do List
      </Typography>
      <form onSubmit={handleAddTodo}>
        <TextField
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          label="New Todo"
          size='small'
        />
        <Button type="submit" variant="contained">Add Todo</Button>
      </form>
      <List>
        {todos?.todos.map((todo) =>
        <ListItem key={todo.id}>
            <FormControlLabel
              label={todo.text}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              control={
                <Checkbox
                  checked={todo.completed}
                  onChange={() => todos.toggleTodo(todo.id)}
                />
              }
            />
        </ListItem>
        )}
      </List>
    </div>
  );
};

export default TodoList;
