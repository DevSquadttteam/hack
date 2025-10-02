// components/SellCarModal.jsx
import { useState } from 'react';
import axios from '../api/axios';
import { X, DollarSign, CreditCard, Wallet, Loader2, AlertCircle, TrendingUp } from 'lucide-react';

const SellCarModal = ({ car, onClose }) => {
  const [priceSale, setPriceSale] = useState('');
  const [saleType, setSaleType] = useState('cash');
  const [downPayment, setDownPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`/cars/${car._id}`, {
        priceSale: parseFloat(priceSale),
        saleType,
        downPayment: saleType !== 'cash' ? parseFloat(downPayment) : 0,
        monthlyPayment: saleType !== 'cash' ? parseFloat(monthlyPayment) : 0,
      });

      onClose();
    } catch (err) {
      console.error('Ошибка при продаже машины:', err);
      setError(err.response?.data?.message || 'Не удалось оформить продажу');
    } finally {
      setLoading(false);
    }
  };

  const getSaleTypeIcon = () => {
    switch (saleType) {
      case 'cash': return <Wallet className="w-4 h-4" />;
      case 'monthly': return <CreditCard className="w-4 h-4" />;
      case 'monthlyWithDownPayment': return <DollarSign className="w-4 h-4" />;
      default: return null;
    }
  };

  const calculatedProfit = priceSale ? (parseFloat(priceSale) - car.pricePurchase).toFixed(2) : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="card-body">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg w-10 h-10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-content" />
              </div>
              <div>
                <h2 className="card-title text-xl">Продажа</h2>
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
            {priceSale && (
              <>
                <div className="divider my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Прибыль:
                  </span>
                  <span className={`font-bold ${calculatedProfit >= 0 ? 'text-success' : 'text-error'}`}>
                    ${parseFloat(calculatedProfit).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error mb-4">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Цена продажи
                </span>
                <span className="label-text-alt">USD</span>
              </label>
              <input
                type="number"
                value={priceSale}
                onChange={(e) => {
                  setPriceSale(e.target.value);
                  setError(null);
                }}
                className="input input-bordered w-full"
                placeholder={car.pricePurchase}
                step="0.01"
                min="0"
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Тип продажи</span>
              </label>
              <select
                value={saleType}
                onChange={(e) => setSaleType(e.target.value)}
                className="select select-bordered w-full"
                disabled={loading}
              >
                <option value="cash">💵 Наличные</option>
                <option value="monthly">💳 В рассрочку</option>
                <option value="monthlyWithDownPayment">💰 Рассрочка с первым взносом</option>
              </select>
            </div>

            {saleType !== 'cash' && (
              <div className="bg-base-200 rounded-lg p-4 space-y-4">
                {saleType === 'monthlyWithDownPayment' && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Первоначальный взнос</span>
                      <span className="label-text-alt">USD</span>
                    </label>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => {
                        setDownPayment(e.target.value);
                        setError(null);
                      }}
                      className="input input-bordered w-full"
                      placeholder="5000"
                      step="0.01"
                      min="0"
                      required
                      disabled={loading}
                    />
                  </div>
                )}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Ежемесячный платёж</span>
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
                </div>
              </div>
            )}

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
                    Обработка...
                  </>
                ) : (
                  <>
                    {getSaleTypeIcon()}
                    Продать машину
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >

    
  );
};

export default SellCarModal;