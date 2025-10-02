import { useState } from 'react';
import AddCarModal from '../components/AddCarModal';
import CarList from '../components/CarList';
import ProfitWidget from '../components/ProfitWidget';

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🚗 Панель управления</h1>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          ➕ Добавить машину
        </button>
      </div>

      <ProfitWidget />
      <CarList />

      {showAddModal && <AddCarModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default Dashboard;
