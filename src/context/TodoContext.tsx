import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { useAuth } from './AuthContext';
import firebase from 'firebase/compat/app';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => useContext(TodoContext);

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = firestore
      .collection('todos')
      .where('userId', '==', auth?.currentUser?.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Todo[];
        setTodos(todosData);
      });
    return unsubscribe;
  }, [auth?.currentUser]);

  const addTodo = async (text: string) => {
    const newTodo = { 
      text,
      completed: false,
      userId: auth?.currentUser?.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    const docRef = await firestore.collection('todos').add(newTodo);
    setTodos([...todos, { id: docRef.id, ...newTodo }]);
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await firestore.collection('todos').doc(id).update(updatedTodo);
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  return <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>{children}</TodoContext.Provider>;
};