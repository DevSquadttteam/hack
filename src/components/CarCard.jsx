// components/CarCard.jsx
import { useState } from 'react';
import { Pencil, DollarSign, Car } from 'lucide-react';

const CarCard = ({ car, onSell, onRent }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          {car.make} {car.model} ({car.year})
        </h2>
        <span className={`px-2 py-1 rounded text-xs ${
          car.status === 'available' ? 'bg-green-100 text-green-700' :
          car.status === 'sold' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {car.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">Цена покупки: ${car.pricePurchase}</p>
      {car.priceSale && <p className="text-sm text-gray-600">Цена продажи: ${car.priceSale}</p>}
      {car.monthlyPayment && <p className="text-sm text-gray-600">Ежемесячно: ${car.monthlyPayment}</p>}

      <div className="mt-2 flex gap-2">
        {car.status === 'available' && (
          <>
            <button onClick={() => onSell(car)} className="btn btn-sm btn-success flex items-center gap-1">
              <DollarSign size={16} /> Продать
            </button>
            <button onClick={() => onRent(car)} className="btn btn-sm btn-warning flex items-center gap-1">
              <Car size={16} /> Сдать в аренду
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarCard;
