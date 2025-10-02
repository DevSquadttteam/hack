// components/TransactionTable.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error('Ошибка при получении транзакций:', err));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Метод оплаты</th>
            <th>Дата</th>
            <th>Машина</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx.type}</td>
              <td>${tx.amount}</td>
              <td>{tx.paymentMethod}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.carId?.make} {tx.carId?.model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
