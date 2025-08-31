import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const Header = ({ onSidebarToggle }) => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const profileRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  const handleProfileClick = () => {
    setShowProfileDropdown(false)
    navigate('/profile')
  }

  const handleSettingsClick = () => {
    setShowProfileDropdown(false)
    navigate('/settings')
  }

  const notifications = [
    {
      id: 1,
      title: 'New user registered',
      message: 'A new editor has joined the platform',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      title: 'News article published',
      message: 'Breaking news article has been published',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'System update',
      message: 'Admin panel has been updated to v2.0',
      time: '3 hours ago',
      unread: false
    }
  ]

  return (
    <header className="admin-mobile-header bg-white border-b border-gray-200 shadow-sm">
      <div className="admin-mobile-container-fluid">
        <div className="admin-mobile-flex-between">
          {/* Sidebar Toggle Button - always visible */}
          <button
            onClick={onSidebarToggle}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mr-2"
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          {/* Left Side - Search */}
          <div className="flex-1 max-w-lg admin-mobile-hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search in admin panel..."
                className="admin-input"
              />
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="admin-mobile-flex-center admin-mobile-gap">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                title="Notifications"
              >
                <Bell size={20} />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 admin-mobile-modal">
                  <div className="admin-mobile-p border-b border-gray-200">
                    <h3 className="admin-mobile-text-lg font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`admin-mobile-p border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="admin-mobile-flex-start">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <h4 className="admin-mobile-text-sm font-medium text-gray-900">{notification.title}</h4>
                            <p className="admin-mobile-text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="admin-mobile-text-sm text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="admin-mobile-p border-t border-gray-200">
                    <button className="admin-mobile-text-sm text-timesnow-red hover:text-red-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="admin-mobile-flex-center admin-mobile-gap p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-timesnow-red rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="admin-mobile-hidden admin-mobile-text-left">
                  <div className="admin-mobile-text-sm font-medium text-gray-900">
                    {user?.name || 'Mr. Shubham Meena'}
                  </div>
                  <div className="admin-mobile-text-sm text-gray-500">
                    {user?.role || 'Reporter'}
                  </div>
                </div>
                <ChevronDown size={16} className="text-gray-400 admin-mobile-hidden" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 admin-mobile-modal">
                  <div className="admin-mobile-p border-b border-gray-200">
                    <div className="admin-mobile-flex-center admin-mobile-gap">
                      <div className="w-12 h-12 bg-timesnow-red rounded-full flex items-center justify-center">
                        <User size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="admin-mobile-text-sm font-medium text-gray-900">
                          {user?.name || 'Mr. Shubham Meena'}
                        </div>
                        <div className="admin-mobile-text-sm text-gray-500">
                          {user?.email || 'reporter@timesnowindia.com'}
                        </div>
                        <div className="admin-mobile-text-sm text-gray-500">
                          {user?.role || 'Reporter'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-mobile-p">
                    <button
                      onClick={handleProfileClick}
                      className="admin-mobile-flex-center admin-mobile-gap admin-mobile-px admin-mobile-py admin-mobile-text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors w-full"
                    >
                      <User size={16} />
                      <span>View Profile</span>
                    </button>
                    
                    <button
                      onClick={handleSettingsClick}
                      className="admin-mobile-flex-center admin-mobile-gap admin-mobile-px admin-mobile-py admin-mobile-text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors w-full"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="admin-mobile-p border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="admin-mobile-flex-center admin-mobile-gap admin-mobile-px admin-mobile-py admin-mobile-text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors w-full"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
