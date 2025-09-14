import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
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
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Регистрация прошла успешно!');
        console.log(data);
      } else {
        alert(`❌ Ошибка: ${data.message || 'Не удалось зарегистрироваться'}`);
      }
    } catch (err) {
      console.error('Ошибка сети:', err);
      alert('❌ Ошибка сети');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="ФИО" onChange={handleChange} required />
      <input name="username" placeholder="Имя пользователя" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Register;
