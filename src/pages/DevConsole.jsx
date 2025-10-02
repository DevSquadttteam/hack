import { useState } from 'react';
import api from '../api/axios';

function DevConsole() {
  const [log, setLog] = useState([]);
  const [response, setResponse] = useState(null);

  const logRequest = (method, route, description, payload = null) => {
    setLog(prev => [
      ...prev,
      {
        method,
        route,
        description,
        payload,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const sendRequest = async (method, route, description, payload = null) => {
    try {
      let res;
      if (method === 'GET') res = await api.get(route);
      if (method === 'POST') res = await api.post(route, payload);
      if (method === 'PUT') res = await api.put(route, payload);
      if (method === 'DELETE') res = await api.delete(route);

      setResponse(res.data);
      logRequest(method, route, description, payload);
    } catch (err) {
      setResponse({ error: err.message });
      logRequest(method, route, description, payload);
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🧪 Dev Console</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* USERS */}
        <div>
          <h2 className="text-lg font-semibold mb-2">👤 Users</h2>
          <button onClick={() => sendRequest('GET', '/users', 'Получить всех пользователей')} className="btn">GET /users</button>
          <button onClick={() => sendRequest('POST', '/users/register', 'Регистрация пользователя', {
            fullName: 'Test User',
            username: 'testuser',
            email: 'test@example.com',
            password: '123456'
          })} className="btn">POST /users/register</button>
          <button onClick={() => sendRequest('POST', '/users/login', 'Логин пользователя', {
            email: 'test@example.com',
            password: '123456'
          })} className="btn">POST /users/login</button>
          <button onClick={() => sendRequest('DELETE', '/users/123', 'Удаление пользователя')} className="btn">DELETE /users/:id</button>
        </div>

        {/* CARS */}
        <div>
          <h2 className="text-lg font-semibold mb-2">🚗 Cars</h2>
          <button onClick={() => sendRequest('GET', '/cars', 'Получить список машин')} className="btn">GET /cars</button>
          <button onClick={() => sendRequest('POST', '/cars', 'Добавить машину', {
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            pricePurchase: 12000
          })} className="btn">POST /cars</button>
          <button onClick={() => sendRequest('PUT', '/cars/123/sell', 'Продать машину', {
            priceSale: 15000,
            saleType: 'cash'
          })} className="btn">PUT /cars/:id/sell</button>
          <button onClick={() => sendRequest('PUT', '/cars/123/rent', 'Сдать машину', {
            monthlyPayment: 500
          })} className="btn">PUT /cars/:id/rent</button>
        </div>

        {/* PROFIT */}
        <div>
          <h2 className="text-lg font-semibold mb-2">💰 Profit</h2>
          <button onClick={() => sendRequest('GET', '/profit', 'Получить общую прибыль')} className="btn">GET /profit</button>
        </div>
      </div>

      {/* Ответ сервера */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📦 Ответ сервера</h2>
        <pre className="bg-slate-800 p-4 rounded max-h-96 overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>

      {/* Лог запросов */}
      <div>
        <h2 className="text-xl font-semibold mb-2">📜 Лог запросов</h2>
        <ul className="space-y-2">
          {log.map((entry, idx) => (
            <li key={idx} className="bg-slate-800 p-3 rounded">
              <div><strong>{entry.method}</strong> {entry.route}</div>
              <div className="text-sm text-slate-400">{entry.description}</div>
              <div className="text-xs text-slate-500">⏱ {entry.timestamp}</div>
              {entry.payload && (
                <pre className="text-xs mt-2 bg-slate-700 p-2 rounded">
                  {JSON.stringify(entry.payload, null, 2)}
                </pre>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DevConsole;
