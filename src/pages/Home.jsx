// pages/Home.jsx
import { useState } from 'react';
import ProfitWidget from '../components/ProfitWidget';
import CarList from '../components/CarList';
import TransactionTable from '../components/TransactionTable';
import UserCard from '../components/UserCard';
import AddCarModal from '../components/AddCarModal';

const Home = () => {
  const [showAddCar, setShowAddCar] = useState(false);

  // 🚨 Заглушка для юзера (потом заменим на данные из auth/user API)
  const user = {
    username: 'Полат',
    email: 'polat@example.com',
    phone: '+998 90 123-45-67',
    isOwner: true,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Верхняя панель: инфо о пользователе + прибыль */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserCard user={user} />
        <ProfitWidget />
      </div>

      {/* Блок машин */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Машины</h2>
        <button
          onClick={() => setShowAddCar(true)}
          className="btn btn-primary"
        >
          + Добавить машину
        </button>
      </div>
      <CarList />

      {/* Таблица транзакций */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Транзакции</h2>
        <TransactionTable />
      </div>

      {/* Модалка добавления машины */}
      {showAddCar && <AddCarModal onClose={() => setShowAddCar(false)} />}
    </div>
  );
};

export default Home;
