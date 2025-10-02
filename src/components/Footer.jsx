import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="px-4 py-3 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
        <span>© 2025 Dashboard</span>
        <div className="flex items-center space-x-1">
          {/* <span>Сделано с</span>
          <Heart size={14} className="text-red-500 fill-current" />
          <span>в России</span> */}
        </div>
        <span className="text-slate-500">
          Обновлено: {new Date().toLocaleTimeString('ru-RU')}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
