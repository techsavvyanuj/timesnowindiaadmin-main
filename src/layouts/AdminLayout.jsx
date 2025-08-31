import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const AdminLayout = ({ children }) => {
  const { isDark } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleSidebarClose}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onSidebarToggle={handleSidebarToggle} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>

        {/* Sidebar Overlay for all screens */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={handleSidebarClose}
          />
        )}
      </div>
    </div>
  )
}

export default AdminLayout
