// components/UserCard.jsx
import { User, Mail, Phone } from 'lucide-react';
import OwnerBadge from './OwnerBadge';

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="border rounded p-4 shadow bg-white flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
        <User size={28} />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-bold flex items-center gap-2">
          {user.username}
          {user.isOwner && <OwnerBadge />}
        </h2>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <Mail size={14} /> {user.email}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <Phone size={14} /> {user.phone || '—'}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
