import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TodoList from './pages/TodoList';

const PrivateRoute: React.FC<{ component: React.FC, path: string }> = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      element={(auth?.currentUser ? <Component /> : <Navigate  to="/login" />)}
    />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <TodoProvider>
            <PrivateRoute path="/dashboard" component={TodoList} />
          </TodoProvider>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
