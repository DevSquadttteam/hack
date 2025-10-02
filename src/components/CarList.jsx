// components/CarList.jsx
import { useEffect, useState } from 'react';
import { Loader2, Car, AlertCircle } from 'lucide-react';
import axios from '../api/axios';
import CarCard from './CarCard';
import SellCarModal from './SellCarModal';
import RentCarModal from './RentCarModal';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    axios.get('/cars')
      .then(res => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cars:', err);
        setError('Не удалось загрузить список автомобилей');
        setLoading(false);
      });
  }, []);

  const handleSell = (car) => {
    setSelectedCar(car);
    setModalType('sell');
  };

  const handleRent = (car) => {
    setSelectedCar(car);
    setModalType('rent');
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCar(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-300 text-lg font-medium">Загрузка автомобилей...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="card bg-base-100 shadow-2xl w-full max-w-md">
          <div className="card-body items-center text-center">
            <div className="avatar placeholder mb-4">
              <div className="bg-error rounded-full w-16">
                <AlertCircle className="w-8 h-8 text-error-content" />
              </div>
            </div>
            <h3 className="card-title text-xl">Ошибка загрузки</h3>
            <p className="text-base-content/70">{error}</p>
            <div className="card-actions mt-4">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary btn-block"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary rounded-lg w-12 h-12 flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-content" />
              </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
              Наши автомобили
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Выберите автомобиль для покупки или аренды
          </p>
          <div className="divider divider-primary w-20 mt-3"></div>
        </div>

        {/* Cars Grid */}
        {cars.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center py-12">
              <div className="avatar placeholder mb-4">
                <div className="bg-base-300 rounded-full w-20">
                  <Car className="w-10 h-10 text-base-content/40" />
                </div>
              </div>
              <h3 className="card-title text-2xl">
                Нет доступных автомобилей
              </h3>
              <p className="text-base-content/70">
                Пожалуйста, зайдите позже
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <CarCard 
                key={car._id} 
                car={car} 
                onSell={handleSell} 
                onRent={handleRent} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modalType === 'sell' && selectedCar && (
        <SellCarModal 
          car={selectedCar} 
          onClose={closeModal} 
        />
      )}
      {modalType === 'rent' && selectedCar && (
        <RentCarModal 
          car={selectedCar} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default CarList; 