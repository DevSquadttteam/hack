import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Шапка */}
      <Header />

      <div className="flex flex-1">
        {/* Сайдбар (фиксированный) */}
        <div className="w-64 fixed top-0 left-0 h-screen bg-gray-800 text-white shadow-lg">
          <Sidebar />
        </div>

        {/* Контент страниц */}
        <div className="flex-1 ml-64 p-6 bg-gray-900 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Футер */}
      <Footer />
    </div>
  );
};

export default App;
