import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // импорт твоего axios instance

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loginUser = async (credentials) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      return data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Ошибка при входе');
      }
      throw new Error('Ошибка подключения к серверу');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await loginUser(formData);

      showNotification('Вход выполнен успешно!', 'success');

      const { token, user } = result;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      setFormData({ email: '', password: '' });

      navigate('/app');
    } catch (error) {
      console.error('Ошибка входа:', error);

      if (error.message.includes('Неверный email или пароль')) {
        setErrors({
          email: 'Неверный email или пароль',
          password: 'Неверный email или пароль'
        });
        showNotification('Неверный email или пароль', 'error');
      } else {
        showNotification(error.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Notification = ({ message, type }) => (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 transform transition-all duration-300 ${
        type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
      }`}
    >
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {notification && <Notification {...notification} />}

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Добро пожаловать</h2>
            <p className="text-gray-300">Войдите в свой аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-white/20 focus:ring-purple-500 hover:border-white/30'
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-white/20 focus:ring-purple-500 hover:border-white/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-white/5" />
                <span>Запомнить меня</span>
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Забыли пароль?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Входим...</span>
                </div>
              ) : (
                'Войти'
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">или</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-300">
              Нет аккаунта?{' '}
              <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Зарегистрируйтесь
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [notification, setNotification] = useState(null);
//   const navigate = useNavigate();

//   // URL вашего сервера - замените на свой
//   const API_BASE_URL = 'http://localhost:5000/api';

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Очистка ошибок при изменении поля
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email) {
//       newErrors.email = 'Email обязателен';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Некорректный формат email';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Пароль обязателен';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Пароль должен быть не менее 6 символов';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   // Реальный API запрос для входа
//   const loginUser = async (credentials) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Ошибка при входе');
//       }

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);
    
//     try {
//       const result = await loginUser(formData);
      
//       // Успешный вход
//       showNotification('Вход выполнен успешно!', 'success');
      
//       // Сохраняем токен или данные пользователя в localStorage
//       const { token, user } = result; // Предполагаем, что API возвращает token и user
//       localStorage.setItem('authToken', token); // Сохраняем токен
      
//       // Дополнительно можно сохранить user данные
//       localStorage.setItem('user', JSON.stringify(user));
      
//       // Очищаем форму после успешного входа
//       setFormData({ email: '', password: '' });
      
//       // Редирект на основную страницу (/app)
//       navigate('/app');
      
//     } catch (error) {
//       console.error('Ошибка входа:', error);
      
//       // Показываем конкретную ошибку от сервера
//       if (error.message.includes('Неверный email или пароль')) {
//         setErrors({
//           email: 'Неверный email или пароль',
//           password: 'Неверный email или пароль'
//         });
//         showNotification('Неверный email или пароль', 'error');
//       } else if (error.message.includes('Failed to fetch')) {
//         showNotification('Ошибка подключения к серверу. Проверьте интернет-соединение.', 'error');
//       } else {
//         showNotification(error.message || 'Произошла ошибка при входе', 'error');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const Notification = ({ message, type }) => (
//     <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 transform transition-all duration-300 ${
//       type === 'success' 
//         ? 'bg-green-500 text-white' 
//         : 'bg-red-500 text-white'
//     }`}>
//       {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
//       <span>{message}</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Анимированный фон */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-1/2 -right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
//         <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
//       </div>
      
//       {/* Уведомления */}
//       {notification && <Notification {...notification} />}
      
//       {/* Основная форма */}
//       <div className="relative z-10 w-full max-w-md">
//         {/* Карточка входа */}
//         <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
//           {/* Заголовок */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold text-white mb-2">Добро пожаловать</h2>
//             <p className="text-gray-300">Войдите в свой аккаунт</p>
//           </div>

//           {/* Форма */}
//           <div className="space-y-6">
//             {/* Поле Email */}
//             <div className="space-y-2">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className={`w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Введите email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                   className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
//                     errors.email 
//                       ? 'border-red-500 focus:ring-red-500' 
//                       : 'border-white/20 focus:ring-purple-500 hover:border-white/30'
//                   }`}
//                 />
//               </div>
//               {errors.email && (
//                 <div className="flex items-center space-x-2 text-red-400 text-sm">
//                   <AlertCircle size={16} />
//                   <span>{errors.email}</span>
//                 </div>
//               )}
//             </div>

//             {/* Поле Пароль */}
//             <div className="space-y-2">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className={`w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
//                 </div>
//                 <input
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Введите пароль"
//                   value={formData.password}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                   className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
//                     errors.password 
//                       ? 'border-red-500 focus:ring-red-500' 
//                       : 'border-white/20 focus:ring-purple-500 hover:border-white/30'
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   disabled={isLoading}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors disabled:opacity-50"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <div className="flex items-center space-x-2 text-red-400 text-sm">
//                   <AlertCircle size={16} />
//                   <span>{errors.password}</span>
//                 </div>
//               )}
//             </div>

//             {/* Дополнительные опции */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
//                 <input type="checkbox" className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-white/5" />
//                 <span>Запомнить меня</span>
//               </label>
//               <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
//                 Забыли пароль?
//               </a>
//             </div>

//             {/* Кнопка входа */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               onClick={handleSubmit}
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Входим...</span>
//                 </div>
//               ) : (
//                 'Войти'
//               )}
//             </button>
//           </div>

//           {/* Разделитель */}
//           <div className="flex items-center my-6">
//             <div className="flex-1 border-t border-white/20"></div>
//             <span className="px-4 text-gray-400 text-sm">или</span>
//             <div className="flex-1 border-t border-white/20"></div>
//           </div>

//           {/* Регистрация */}
//           <div className="text-center mt-6">
//             <p className="text-gray-300">
//               Нет аккаунта?{' '}
//               <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
//                 Зарегистрируйтесь
//               </a>
//             </p>
//           </div>

//           {/* Информация для тестирования */}
//           <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
//             <h3 className="text-blue-300 font-medium mb-2">Для тестирования:</h3>
//             <p className="text-blue-200 text-sm">
//               Убедитесь, что ваш сервер запущен на порту 5000 и в базе есть тестовый пользователь
//             </p>
//           </div>
//         </div>

//         {/* Декоративные элементы */}
//         <div className="absolute -z-10 top-0 left-0 w-full h-full">
//           <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
//           <div className="absolute top-12 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
//           <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;