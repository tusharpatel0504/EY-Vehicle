import React, { useState } from 'react';
import { vehicleData } from '../data/vehicleOEM';

export default function VehicleOEM({ username, onLogout }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showAnomalies, setShowAnomalies] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicleData.filter((vehicle) =>
    vehicle.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.engineType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Production':
        return 'bg-green-100 text-green-800';
      case 'End of Life':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Vehicle Models</h1>
          <p className="text-lg text-gray-600">Designed and Manufactured by OEM</p>
        </div>
        {onLogout && (
          <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Logout
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <input
          type="text"
          placeholder="Search by model name or engine type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
        />
      </div>

      {!selectedVehicle ? (
        // Vehicle List View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.modelName}</h3>
                    <p className="text-sm text-gray-600">{vehicle.description.substring(0, 80)}...</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Engine:</span>
                    <span>{vehicle.engineDisplacement} {vehicle.engineType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Power:</span>
                    <span>{vehicle.horsepower}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Mileage:</span>
                    <span>{vehicle.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Improvements:</span>
                    <span className="font-bold text-blue-600">{vehicle.anomalies.length}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !showAnomalies ? (
        // Vehicle Detail View
        <div className="bg-white rounded-lg shadow-md p-8">
          <button
            onClick={() => setSelectedVehicle(null)}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-6 flex items-center gap-2"
          >
            ← Back to Models
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{selectedVehicle.modelName}</h1>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${getStatusColor(selectedVehicle.status)}`}>
                {selectedVehicle.status}
              </span>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{selectedVehicle.description}</p>
                <p className="text-sm text-gray-600 mt-2">Launched: {selectedVehicle.launchYear}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Engine Specifications</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Engine Type</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.engineType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Displacement</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.engineDisplacement}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Power Output</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.horsepower}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Torque</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.torque}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Details</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Transmission</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.transmission}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fuel Type</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fuel Efficiency</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.mileage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Seating Capacity</p>
                      <p className="font-semibold text-gray-900">{selectedVehicle.seatingCapacity} Seats</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAnomalies(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
              >
                Show Future Improvements ({selectedVehicle.anomalies.length})
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Improvement Opportunities</h3>
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <p className="text-sm text-gray-600">Total Improvements</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedVehicle.anomalies.length}</p>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-3xl font-bold text-red-600">
                    {selectedVehicle.anomalies.filter(a => a.severity === 'High').length}
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-sm text-gray-600">Medium Priority</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {selectedVehicle.anomalies.filter(a => a.severity === 'Medium').length}
                  </p>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-sm text-gray-600">Low Priority</p>
                  <p className="text-3xl font-bold text-green-600">
                    {selectedVehicle.anomalies.filter(a => a.severity === 'Low').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Anomalies View
        <div className="bg-white rounded-lg shadow-md p-8">
          <button
            onClick={() => setShowAnomalies(false)}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-6 flex items-center gap-2"
          >
            ← Back to Details
          </button>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">Future Improvements</h1>
          <p className="text-lg text-gray-600">{selectedVehicle.modelName} - Next Generation Enhancement Opportunities</p>

          <div className="space-y-6">
            {selectedVehicle.anomalies.map((improvement) => (
              <div key={improvement.id} className={`border-l-4 rounded-lg p-6 ${getSeverityColor(improvement.severity)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{improvement.issue}</h3>
                    <p className="text-sm opacity-75">{improvement.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getSeverityColor(improvement.severity)}`}>
                    {improvement.severity} Priority
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <span className="text-lg">✓</span> Implementation Options:
                  </h4>
                  <ul className="space-y-2 ml-6">
                    {improvement.solutions.map((solution, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="font-bold">•</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-900">
              <span className="font-bold">🚀 Innovation Strategy:</span> These improvements represent our roadmap for future vehicle generations. 
              We're committed to enhancing weight efficiency, safety features, sustainability, and technology integration to deliver next-generation vehicles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
