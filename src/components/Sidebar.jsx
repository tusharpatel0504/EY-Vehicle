import React, { useState } from 'react';

export default function Sidebar({ userType, currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = {
    oem: [
      { id: 'dashboard', name: 'Dashboard', icon: '◆' },
      { id: 'vehicles', name: 'Vehicles', icon: '▲' },
    ],
    serviceCenter: [
      { id: 'dashboard', name: 'Dashboard', icon: '◆' },
      { id: 'vehicles', name: 'Vehicles', icon: '▲' },
      { id: 'bookings', name: 'Bookings', icon: '■' },
      { id: 'completed', name: 'Completed', icon: '✓' },
    ]
  };

  const items = menuItems[userType] || menuItems.serviceCenter;
  const title = userType === 'oem' ? 'OEM' : 'Service Center';

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out fixed left-0 top-0 z-40 ${isOpen ? 'w-64' : 'w-20'}`}>
      <button
        className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md p-2 transition-colors w-10 h-10 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? '−' : '≡'}
      </button>

      <nav className="flex flex-col h-full pt-20 px-4">
        <div className="mb-8 px-4">
          {isOpen && <h2 className="text-2xl font-bold text-blue-400">{title}</h2>}
        </div>

        <ul className="list-none flex-1">
          {items.map((item) => (
            <li key={item.id} className="mb-3">
              <button
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="font-medium text-left">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
