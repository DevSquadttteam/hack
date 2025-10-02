// components/UserCard.jsx
import { Trash2, ShieldCheck } from 'lucide-react';

const UserCard = ({ user, onDelete }) => {
  return (
    <div className="border rounded p-4 shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{user.fullName}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500">Роль: {user.role}</p>
        {user.isBanned && (
          <span className="text-red-500 text-xs">Заблокирован</span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDelete(user._id)}
          className="btn btn-sm btn-error flex items-center gap-1"
        >
          <Trash2 size={16} /> Удалить
        </button>
        {user.role === 'owner' && (
          <ShieldCheck size={20} className="text-blue-600" title="Владелец" />
        )}
      </div>
    </div>
  );
};

export default UserCard;
