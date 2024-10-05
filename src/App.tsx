import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Container>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute component={TodoList} />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
};

export default App;
