import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-blue-50 to-blue-200">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">MyWebsite</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-xl border border-blue-500 text-blue-500 hover:bg-blue-100 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Добро пожаловать!</h2>
        <p className="text-lg text-gray-700 max-w-md">
          Это ваша главная страница. Здесь можно описать ваш сайт, продукт или приложение.
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-gray-600">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
