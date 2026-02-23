import { useState } from 'react'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import OEMDashboard from './components/OEMDashboard'
import VehicleOEM from './components/VehicleOEM'
import ServiceCenterVehicles from './components/ServiceCenterVehicles'
import ServiceBookings from './components/ServiceBookings'
import CompletedServices from './components/CompletedServices'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState(null)
  const [username, setUsername] = useState('')
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleLogin = (type, user) => {
    setUserType(type)
    setUsername(user)
    setIsAuthenticated(true)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserType(null)
    setUsername('')
    setCurrentPage('dashboard')
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar userType={userType} currentPage={currentPage} onNavigate={setCurrentPage} />
      {userType === 'oem' ? (
        <>
          {currentPage === 'dashboard' && (
            <OEMDashboard username={username} onLogout={handleLogout} onNavigate={setCurrentPage} />
          )}
          {currentPage === 'vehicles' && (
            <VehicleOEM username={username} onLogout={handleLogout} />
          )}
        </>
      ) : (
        <>
          {currentPage === 'dashboard' && (
            <Dashboard username={username} onLogout={handleLogout} />
          )}
          {currentPage === 'vehicles' && (
            <ServiceCenterVehicles username={username} onLogout={handleLogout} />
          )}
          {currentPage === 'bookings' && (
            <ServiceBookings username={username} onLogout={handleLogout} />
          )}
          {currentPage === 'completed' && (
            <CompletedServices username={username} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  )
}

export default App
