import React from 'react';

const Profile = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">Профиль</h2>
        <p className="text-gray-700 mb-6">Информация о пользователе и настройки аккаунта.</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Profile;
