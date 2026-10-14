import React from 'react';

export const FloatingContacts: React.FC = () => {
  return (
    <aside className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Telegram Fast Connect */}
      <a
        className="group flex items-center gap-space-xs bg-[#229ED9] hover:bg-[#1E88E5] text-white pl-space-sm pr-space-md py-2 rounded-full shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        href="https://t.me/DYDProperty"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">send</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-label-sm text-label-sm font-bold leading-none">Instant Telegram</span>
          <span className="font-caption text-[10px] text-blue-100 opacity-90 leading-tight">Chat with Real Estate Advisor</span>
        </div>
      </a>

      {/* WhatsApp Fast Connect */}
      <a
        className="group flex items-center gap-space-xs bg-[#25D366] hover:bg-[#20BA5A] text-white pl-space-sm pr-space-md py-2 rounded-full shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
        href="https://wa.me/85512888999"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px]">chat</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-label-sm text-label-sm font-bold leading-none">WhatsApp Connect</span>
          <span className="font-caption text-[10px] text-green-100 opacity-90 leading-tight">Expat &amp; Foreign Buyer Desk</span>
        </div>
      </a>
    </aside>
  );
};
