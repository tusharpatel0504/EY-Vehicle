import { useState } from 'react';
import { completedServices } from '../data/completedServices';

export default function CompletedServices({ username, onLogout }) {
  const [expandedService, setExpandedService] = useState(null);
  const [reportingFor, setReportingFor] = useState(null);

  const generateReport = (service) => {
    const reportContent = `
    SERVICE COMPLETION REPORT
    ═══════════════════════════════════════════
    
    Report ID: ${service.id}
    Completion Date: ${service.completionDate}
    
    VEHICLE INFORMATION
    ────────────────────
    Owner: ${service.owner}
    Vehicle Model: ${service.model}
    Registration: ${service.regNumber}
    Mileage at Service: ${service.mileage} km
    
    SERVICE DETAILS
    ────────────────────
    Service Type: ${service.serviceType}
    Technician: ${service.technician}
    Total Cost: ₹${service.totalCost}
    
    ISSUES FIXED
    ────────────────────
    ${service.issuesFixed.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}
    
    PARTS USED
    ────────────────────
    ${service.partsUsed.map((part, i) => `${i + 1}. ${part}`).join('\n')}
    
    RECOMMENDATIONS
    ────────────────────
    • Regular maintenance every 5000 km
    • Next service due: ${new Date(new Date(service.completionDate).getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
    • Check tire pressure monthly
    • Use recommended fuel grade only
    
    Generated: ${new Date().toLocaleString()}
    ═══════════════════════════════════════════
    `;

    return reportContent;
  };

  const sendReportToOEM = (service) => {
    const report = generateReport(service);
    alert(`Report will be sent to OEM for:\n\n${service.model}\nRegistration: ${service.regNumber}\n\nReport Preview:\n${report}`);
    setReportingFor(null);
  };

  const downloadReport = (service) => {
    const report = generateReport(service);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', `Service_Report_${service.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen transition-all duration-300">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Completed Services</h1>
          <p className="text-lg text-gray-600">Welcome, {username}</p>
        </div>
        <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Logout
        </button>
      </header>
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-700">
            <span className="font-bold text-green-600">{completedServices.length}</span> service(s) completed
          </p>
        </div>
      </div>

      {reportingFor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Send Report to OEM - {reportingFor.model}
            </h2>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                {generateReport(reportingFor)}
              </pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => sendReportToOEM(reportingFor)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                ▶ Send to OEM
              </button>
              <button
                onClick={() => downloadReport(reportingFor)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                ▼ Download Report
              </button>
              <button
                onClick={() => setReportingFor(null)}
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {completedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-green-500 p-5"
          >
            <div
              onClick={() =>
                setExpandedService(expandedService === service.id ? null : service.id)
              }
              className="flex items-start justify-between cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{service.model}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    ✓ Complete
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <p><span className="font-semibold">Owner:</span> {service.owner}</p>
                    <p><span className="font-semibold">Reg:</span> {service.regNumber}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Completed:</span> {service.completionDate}</p>
                    <p><span className="font-semibold">Technician:</span> {service.technician}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Service Type:</span> {service.serviceType}</p>
                    <p><span className="font-bold text-blue-600">Cost: ₹{service.totalCost}</span></p>
                  </div>
                </div>
              </div>

              <span className="text-2xl text-gray-600 ml-4 flex-shrink-0">
                {expandedService === service.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedService === service.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Issues Fixed:</p>
                  <ul className="space-y-1">
                    {service.issuesFixed.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Parts Used:</p>
                  <ul className="space-y-1">
                    {service.partsUsed.map((part, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600">•</span>
                        <span>{part}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-800">Mileage at Service</p>
                    <p className="text-gray-700 text-lg">{service.mileage} km</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Total Cost</p>
                    <p className="text-gray-700 text-lg font-bold text-blue-600">₹{service.totalCost}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    onClick={() => setReportingFor(service)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    📄 Generate Report
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
                    📞 Contact Customer
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                    ☆ Add Review
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
