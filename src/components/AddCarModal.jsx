// components/AddCarModal.jsx
import { useState } from 'react';
import axios from '../api/axios';
import { X, Car, Loader2, AlertCircle } from 'lucide-react';

const AddCarModal = ({ onClose }) => {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    pricePurchase: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/cars', {
        ...form,
        year: parseInt(form.year),
        pricePurchase: parseFloat(form.pricePurchase),
      });

      onClose();
    } catch (err) {
      console.error('Ошибка при добавлении машины:', err);
      setError(err.response?.data?.message || 'Не удалось добавить автомобиль');
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
              <div className="bg-primary rounded-lg w-10 h-10 flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-content" />
              </div>
              <h2 className="card-title text-xl">Добавить автомобиль</h2>
            </div>
            <button 
              onClick={onClose} 
              className="btn btn-ghost btn-sm btn-circle"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Марка</span>
              </label>
              <input
                type="text"
                name="make"
                placeholder="Например: Toyota"
                value={form.make}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Модель</span>
              </label>
              <input
                type="text"
                name="model"
                placeholder="Например: Camry"
                value={form.model}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Год выпуска</span>
              </label>
              <input
                type="number"
                name="year"
                placeholder="2024"
                value={form.year}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="1900"
                max="2100"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Цена покупки ($)</span>
              </label>
              <input
                type="number"
                name="pricePurchase"
                placeholder="25000"
                value={form.pricePurchase}
                onChange={handleChange}
                className="input input-bordered w-full"
                step="0.01"
                min="0"
                required
                disabled={loading}
              />
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
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Добавление...
                  </>
                ) : (
                  'Добавить'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarModal;