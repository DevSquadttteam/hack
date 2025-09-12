import { Navigate } from 'react-router-dom';

// Пример проверки авторизации (замените на вашу логику)
const isAuthenticated = () => {
  // Проверяем, есть ли токен в localStorage (или используйте ваш метод)
  return !!localStorage.getItem('authToken');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;