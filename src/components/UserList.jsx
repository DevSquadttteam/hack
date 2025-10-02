// components/UserList.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import UserCard from './UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Ошибка при получении пользователей:', err));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers(); // обновляем список
    } catch (err) {
      console.error('Ошибка при удалении пользователя:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="grid gap-4">
      {users.map(user => (
        <UserCard key={user._id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UserList;
