import { useState } from 'react';
import { serviceVehicles } from '../data/serviceVehicles';

export default function ServiceCenterVehicles({ username, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [expandedIssue, setExpandedIssue] = useState(null);

  const filteredVehicles = serviceVehicles.filter(
    (vehicle) =>
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'Medium':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'Low':
        return 'bg-green-50 border-l-4 border-green-500';
      default:
        return 'bg-gray-50';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedVehicle) {
    return (
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen transition-all duration-300">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <button
              onClick={() => {
                setSelectedVehicle(null);
                setExpandedIssue(null);
              }}
              className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              ◀ Back to Vehicles
            </button>
            <h1 className="text-4xl font-bold text-gray-900">{selectedVehicle.model}</h1>
          </div>
          <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Logout
          </button>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Owner:</span> {selectedVehicle.owner}</p>
                <p><span className="font-semibold">Registration:</span> {selectedVehicle.regNumber}</p>
                <p><span className="font-semibold">Engine:</span> {selectedVehicle.engineType}</p>
                <p><span className="font-semibold">Mileage:</span> {selectedVehicle.mileage} km</p>
                <p><span className="font-semibold">Last Service:</span> {selectedVehicle.lastService}</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-semibold mb-2">▲ ISSUES DETECTED</p>
              <p className="text-3xl font-bold text-blue-600">{selectedVehicle.issues.length}</p>
              <p className="text-gray-600 mt-2">Vehicle requires attention</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Issues & Solutions</h3>
          {selectedVehicle.issues.map((issue) => (
            <div key={issue.id} className={`rounded-lg p-4 cursor-pointer transition ${getSeverityColor(issue.severity)}`}>
              <div
                onClick={() =>
                  setExpandedIssue(expandedIssue === issue.id ? null : issue.id)
                }
                className="flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-gray-800">{issue.type}</h4>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getSeverityBadge(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{issue.description}</p>
                </div>
                <span className="text-xl text-gray-600 ml-4">
                  {expandedIssue === issue.id ? '▼' : '▶'}
                </span>
              </div>

              {expandedIssue === issue.id && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="font-semibold text-gray-800 mb-3">Recommended Solutions:</p>
                  <ul className="space-y-2">
                    {issue.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen transition-all duration-300">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Center Vehicles</h1>
          <p className="text-lg text-gray-600">Welcome, {username}</p>
        </div>
        <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Logout
        </button>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by vehicle model, registration, or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer p-5 border-l-4 border-blue-600"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{vehicle.model}</h3>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p><span className="font-semibold">Owner:</span> {vehicle.owner}</p>
              <p><span className="font-semibold">Reg:</span> {vehicle.regNumber}</p>
              <p><span className="font-semibold">Engine:</span> {vehicle.engineType}</p>
              <p><span className="font-semibold">Mileage:</span> {vehicle.mileage} km</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold text-lg">●</span>
                <span className="text-gray-700 font-semibold">{vehicle.issues.length} Issues</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">View ▶</button>
            </div>
          </div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No vehicles found matching your search.</p>
        </div>
      )}
    </div>
  );
}
