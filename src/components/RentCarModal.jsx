// components/RentCarModal.jsx
import { useState } from 'react';
import axios from '../api/axios';
import { X, Calendar, DollarSign, Loader2, AlertCircle } from 'lucide-react';

const RentCarModal = ({ car, onClose }) => {
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`/cars/${car._id}`, {
        saleType: 'monthly',
        monthlyPayment: parseFloat(monthlyPayment),
      });

      onClose();
    } catch (err) {
      console.error('Ошибка при аренде машины:', err);
      setError(err.response?.data?.message || 'Не удалось оформить аренду');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-warning rounded-lg w-10 h-10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning-content" />
              </div>
              <div>
                <h2 className="card-title text-xl">Аренда</h2>
                <p className="text-sm text-base-content/70">
                  {car.make} {car.model} ({car.year})
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="btn btn-ghost btn-sm btn-circle"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Car Info */}
          <div className="bg-base-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/70">Цена покупки:</span>
              <span className="font-semibold">${car.pricePurchase?.toLocaleString()}</span>
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/70">Статус:</span>
              <span className="badge badge-outline">{car.status || 'В наличии'}</span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRent} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Ежемесячный платёж
                </span>
                <span className="label-text-alt">USD</span>
              </label>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => {
                  setMonthlyPayment(e.target.value);
                  setError(null);
                }}
                className="input input-bordered w-full"
                placeholder="500"
                step="0.01"
                min="0"
                required
                disabled={loading}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Рекомендуемая сумма: ${Math.round(car.pricePurchase * 0.05)}/мес
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="card-actions justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
                disabled={loading}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="btn btn-warning"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    Сдать в аренду
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentCarModal;