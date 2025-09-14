import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Вход выполнен!');
        console.log(data);
        // Пример: localStorage.setItem('token', data.token);
      } else {
        alert(`❌ Ошибка: ${data.message || 'Неверные данные'}`);
      }
    } catch (err) {
      console.error('Ошибка сети:', err);
      alert('❌ Ошибка сети');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;
