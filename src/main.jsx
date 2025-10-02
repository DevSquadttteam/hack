import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DevConsole from './pages/DevConsole.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: !!localStorage.getItem('authToken') ? <Navigate to="/app/home" replace /> : <Login />,
  },
  {
    path: '/app',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      { path: 'home', element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'car-table', element: <DevConsole /> },
      { path: '', element: <Navigate to="home" replace /> }, // редирект с /app на /app/home
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
