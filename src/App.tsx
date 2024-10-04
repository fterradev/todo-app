import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TodoList from './pages/TodoList';

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    auth?.currentUser ? (
      <TodoProvider>
        <Component />
      </TodoProvider>
    ) : (
      <Navigate to="/login" />
    )
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute component={TodoList} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
