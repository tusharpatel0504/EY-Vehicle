import { useState } from 'react';
import { serviceBookings } from '../data/serviceBookings';

export default function ServiceBookings({ username, onLogout }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedBooking, setExpandedBooking] = useState(null);

  const filteredBookings = 
    filterStatus === 'All'
      ? serviceBookings
      : serviceBookings.filter((booking) => booking.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'Pending':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'Cancelled':
        return 'bg-red-50 border-l-4 border-red-500';
      default:
        return 'bg-gray-50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen transition-all duration-300">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Bookings / Slots</h1>
          <p className="text-lg text-gray-600">Welcome, {username}</p>
        </div>
        <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Logout
        </button>
      </header>

      <div className="mb-6 flex gap-4 flex-wrap">
        {['All', 'Confirmed', 'Pending'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-gray-700">
          <span className="font-bold text-blue-600">{filteredBookings.length}</span> booking(s) found
        </p>
      </div>

      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className={`rounded-lg p-5 shadow-md hover:shadow-lg transition cursor-pointer ${getStatusColor(
              booking.status
            )}`}
          >
            <div
              onClick={() =>
                setExpandedBooking(expandedBooking === booking.id ? null : booking.id)
              }
              className="flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{booking.model}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p><span className="font-semibold">Owner:</span> {booking.owner}</p>
                    <p><span className="font-semibold">Registration:</span> {booking.regNumber}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Date:</span> {booking.bookingDate}</p>
                    <p><span className="font-semibold">Time:</span> {booking.timeSlot}</p>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded">
                    {booking.serviceType}
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded">
                    Est. {booking.estimatedTime}
                  </span>
                </div>
              </div>

              <span className="text-2xl text-gray-600 ml-4 flex-shrink-0">
                {expandedBooking === booking.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedBooking === booking.id && (
              <div className="mt-4 pt-4 border-t border-gray-300 space-y-3">
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Problem Description:</p>
                  <p className="text-gray-700 bg-white rounded p-3">{booking.problemDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-800">Service Type</p>
                    <p className="text-gray-700">{booking.serviceType}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Estimated Time</p>
                    <p className="text-gray-700">{booking.estimatedTime}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                    ✓ Start Service
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    ☎ Contact Owner
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                    ✕ Reschedule
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bookings found for this status.</p>
        </div>
      )}
    </div>
  );
}
