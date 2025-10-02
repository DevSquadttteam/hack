// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('authToken');

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Если пользователь не авторизован, редирект на логин
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
