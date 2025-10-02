// components/ProfitWidget.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { TrendingUp, Loader2, AlertCircle } from 'lucide-react';

const ProfitWidget = () => {
  const [profit, setProfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/profit')
      .then(res => {
        setProfit(res.data.profit);
        setError(null);
      })
      .catch(err => {
        console.error('Ошибка при получении прибыли:', err);
        setError('Не удалось загрузить данные');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="bg-success/20 rounded-lg w-16 h-16 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-success animate-spin" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-base-content">Общая прибыль</h2>
              <div className="skeleton h-8 w-32 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl border-2 border-error">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="bg-error/20 rounded-lg w-16 h-16 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-error" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-base-content">Общая прибыль</h2>
              <p className="text-sm text-error mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="bg-success/20 rounded-lg w-16 h-16 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-success" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-base-content mb-1">Общая прибыль</h2>
            <p className="text-3xl font-bold text-success">
              ${profit?.toLocaleString() || 0}
            </p>
          </div>
        </div>
        <div className="divider divider-success my-0"></div>
        <div className="flex items-center justify-between text-sm">
          <span className="badge badge-success badge-outline">Активно</span>
          <span className="text-base-content/60">Обновлено сейчас</span>
        </div>
      </div>
    </div>
  );
};

export default ProfitWidget;