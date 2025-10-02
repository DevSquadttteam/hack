import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu
} from 'lucide-react';

const Sidebar = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  // Основные пункты меню
  const mainMenuItems = [
    { id: 'home', icon: Home, label: 'Главная', path: '/app/home' },
    { id: 'dashboard', icon: BarChart3, label: 'Панель управления', path: '/app/dashboard' },
  ];

  // Пункты профиля и настроек (теперь без path — они вызывают модалки)
  const userMenuItems = [
    { id: 'profile', icon: User, label: 'Профиль' },
    { id: 'settings', icon: Settings, label: 'Настройки' },
  ];

  // Определяем активный пункт меню на основе текущего пути
  useEffect(() => {
    const currentPath = location.pathname;
    const allItems = [...mainMenuItems];
    const currentItem = allItems.find(item => currentPath === item.path);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location.pathname]);

  const handleItemClick = (itemId, path) => {
    setActiveItem(itemId);

    if (itemId === 'profile' || itemId === 'settings') {
      onOpenModal?.(itemId); // Открываем модалку
    } else {
      navigate(path); // Навигация по маршруту
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`relative h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    } shadow-2xl border-r border-slate-700`}>

      {/* Кнопка сворачивания */}
      {/* <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-slate-800 hover:bg-slate-700 rounded-full p-1.5 border border-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl z-10"
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-slate-300" />
        ) : (
          <ChevronLeft size={16} className="text-slate-300" />
        )}
      </button> */}

      {/* Заголовок */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Menu size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-xs text-slate-400">v2.0.1</p>
            </div>
          )}
        </div>
      </div>

      {/* Основное меню */}
      <nav className="px-4 py-6 flex-1">
        {/* Основные пункты */}
        <div className="space-y-2 mb-8">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">
            {!isCollapsed && 'Навигация'}
          </div>
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg text-white'
                    : 'hover:bg-slate-800/50 text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full" />
                )}
                <Icon size={20} className={`transition-all duration-200 ${
                  isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'
                }`} />
                {!isCollapsed && (
                  <span className="font-medium text-sm truncate">
                    {item.label}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap border border-slate-600 shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Разделитель */}
        <div className="mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        </div>

        {/* Пользовательские настройки */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">
            {!isCollapsed && 'Аккаунт'}
          </div>
          {userMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg text-white'
                    : 'hover:bg-slate-800/50 text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full" />
                )}
                <Icon size={20} className={`transition-all duration-200 ${
                  isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-white'
                }`} />
                {!isCollapsed && (
                  <span className="font-medium text-sm truncate">
                    {item.label}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap border border-slate-600 shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Кнопка выхода */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 group relative ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={18} />
          {!isCollapsed && (
            <span className="text-sm font-medium">Выйти</span>
          )}
          {isCollapsed && (
            <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap border border-slate-600 shadow-xl">
              Выйти
            </div>
          )}
        </button>

      </div>
    </div>
  );
};

export default Sidebar;