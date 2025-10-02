import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ArrowRight, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // URL вашего API - измените на реальный адрес сервера
  const API_BASE_URL = 'http://localhost:5000/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибок при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'ФИО обязательно';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'ФИО должно содержать минимум 2 символа';
    }
    
    if (!formData.username) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Имя пользователя должно содержать минимум 3 символа';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Только латинские буквы, цифры и символ _';
    }
    
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
    setTimeout(() => setNotification(null), 5000);
  };

  const redirectToLogin = () => {
    setTimeout(() => {
      showNotification('Перенаправление на страницу входа...', 'success');
      // Реальное перенаправление на страницу логина
      window.location.href = '/login';
    }, 2000);
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }

      return data;
    } catch (error) {
      // Обработка различных типов ошибок
      if (error.message.includes('fetch')) {
        throw new Error('Ошибка подключения к серверу. Проверьте соединение.');
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    console.log('Кнопка нажата, начинаем регистрацию...', formData);
    
    if (!validateForm()) {
      console.log('Ошибки валидации:', errors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      console.log('Отправляем запрос на сервер...');
      const result = await registerUser(formData);
      
      console.log('Успешная регистрация:', result);
      setIsSuccess(true);
      showNotification(result.message || 'Регистрация прошла успешно!', 'success');
      
      // Очищаем форму
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: ''
      });
      
      // Перенаправление на логин после успешной регистрации
      redirectToLogin();
      
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      
      // Обработка специфичных ошибок сервера
      const errorMessage = error.message;
      
      if (errorMessage.includes('email уже существует')) {
        setErrors({ email: 'Пользователь с таким email уже зарегистрирован' });
        showNotification('Пользователь с таким email уже существует', 'error');
      } else if (errorMessage.includes('username')) {
        setErrors({ username: 'Это имя пользователя уже занято' });
        showNotification('Имя пользователя уже занято', 'error');
      } else if (errorMessage.includes('подключения')) {
        showNotification('Не удается подключиться к серверу', 'error');
      } else {
        showNotification(errorMessage || 'Произошла ошибка при регистрации', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength <= 1) return 'Очень слабый';
    if (strength <= 2) return 'Слабый';
    if (strength <= 3) return 'Средний';
    if (strength <= 4) return 'Хороший';
    return 'Отличный';
  };

  const Notification = ({ message, type }) => (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 transform transition-all duration-300 max-w-md ${
      type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span className="text-sm">{message}</span>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center transform animate-pulse">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Успешно!</h3>
        <p className="text-gray-600 mb-4">
          Ваш аккаунт создан. Сейчас вы будете перенаправлены на страницу входа.
        </p>
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Перенаправление...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Уведомления */}
      {notification && <Notification {...notification} />}
      
      {/* Модальное окно успеха */}
      {isSuccess && <SuccessModal />}
      
      {/* Основная форма */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Создать аккаунт</h2>
            <p className="text-gray-300">Заполните данные для регистрации</p>
          </div>

          {/* Форма */}
          <div className="space-y-6">
            {/* Поле ФИО */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`w-5 h-5 ${errors.fullName ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Введите ФИО"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
                    errors.fullName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-emerald-500 hover:border-white/30'
                  }`}
                />
              </div>
              {errors.fullName && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            {/* Поле имя пользователя */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className={`text-sm font-mono ${errors.username ? 'text-red-400' : 'text-gray-400'}`}>@</span>
                </div>
                <input
                  name="username"
                  type="text"
                  placeholder="Введите имя пользователя"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
                    errors.username 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-emerald-500 hover:border-white/30'
                  }`}
                />
              </div>
              {errors.username && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.username}</span>
                </div>
              )}
            </div>

            {/* Поле Email */}
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
                      : 'border-white/20 focus:ring-emerald-500 hover:border-white/30'
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

            {/* Поле Пароль */}
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
                      : 'border-white/20 focus:ring-emerald-500 hover:border-white/30'
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
              
              {/* Индикатор силы пароля */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= getPasswordStrength() 
                            ? getStrengthColor(getPasswordStrength())
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-300">
                    Сила пароля: <span className="font-medium">{getStrengthText(getPasswordStrength())}</span>
                  </p>
                </div>
              )}
              
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Соглашение */}
            <div className="flex items-start space-x-2 text-sm">
              <input 
                type="checkbox" 
                id="terms"
                className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 bg-white/5 mt-0.5" 
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-gray-300 leading-relaxed">
                Я согласен с{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  условиями использования
                </a>{' '}
                и{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  политикой конфиденциальности
                </a>
              </label>
            </div>

            {/* Кнопка регистрации */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Регистрация...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Зарегистрироваться</span>
                  <ArrowRight size={18} />
                </div>
              )}
            </button>
          </div>

          {/* Разделитель */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">или</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Вход */}
          <div className="text-center mt-6">
            <p className="text-gray-300">
              Уже есть аккаунт?{' '}
              <a href="/login" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                Войдите
              </a>
            </p>
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-12 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;