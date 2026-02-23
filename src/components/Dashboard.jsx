import React from 'react';

export default function ServiceCenterDashboard({ username, onLogout }) {
  const stats = [
    { title: 'Total Tickets', value: '342', change: '+12%', color: 'bg-blue-100', textColor: 'text-blue-600' },
    { title: 'Completed Jobs', value: '1,256', change: '+8%', color: 'bg-green-100', textColor: 'text-green-600' },
    { title: 'Pending Repairs', value: '89', change: '+5%', color: 'bg-purple-100', textColor: 'text-purple-600' },
    { title: 'Customer Rating', value: '4.8/5', change: '+0.2', color: 'bg-orange-100', textColor: 'text-orange-600' },
  ];

  const recentTickets = [
    { id: 'TKT-2024-501', customer: 'John Smith', status: 'In Progress', date: '1 hour ago' },
    { id: 'TKT-2024-500', customer: 'Jane Doe', status: 'Completed', date: '3 hours ago' },
    { id: 'TKT-2024-499', customer: 'Mike Johnson', status: 'Pending', date: '1 day ago' },
  ];

  return (
    <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen transition-all duration-300">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Center Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome, {username}</p>
        </div>
        <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-shadow">
            <div className={`w-12 h-12 rounded-lg ${stat.color} ${stat.textColor} flex items-center justify-center font-bold text-lg`}>●</div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-2">{stat.value}</h3>
              <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-green-100 text-green-800">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Tickets</h2>
        <div className="space-y-4">
          {recentTickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0">
              <div>
                <p className="text-gray-900 font-medium">{ticket.id}</p>
                <p className="text-sm text-gray-600">{ticket.customer}</p>
                <time className="text-sm text-gray-500">{ticket.date}</time>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                ticket.status === 'Completed' ? 'bg-green-100 text-green-800' :
                ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
