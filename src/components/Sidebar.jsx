import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  FileText, 
  FolderOpen, 
  Image, 
  ScrollText, 
  Settings, 
  Users, 
  BarChart3, 
  Palette,
  Menu,
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Posters Management', href: '/posters', icon: Image },
    { name: 'Breaking News', href: '/breaking-news', icon: ScrollText },
    { name: 'News Management', href: '/news', icon: FileText },
    { name: 'Categories', href: '/categories', icon: FolderOpen },
    { name: 'Media', href: '/media', icon: Image },
    { name: 'Ticker', href: '/ticker', icon: ScrollText },
    { name: 'Tools Data', href: '/tools', icon: BarChart3 },
    { name: 'Static Pages', href: '/pages', icon: FileText },
    { name: 'Ads Management', href: '/ads', icon: Palette },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const isActive = (href) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/'
    }
    return location.pathname === href
  }

  return (
    <>
      {/* Sidebar Close Button (always visible when open) */}
      {isOpen && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 sm:px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-timesnow-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div className="admin-mobile-hidden">
              <h1 className="admin-mobile-text-lg font-bold text-gray-900">Times Now</h1>
              <p className="admin-mobile-text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center px-3 py-2 admin-mobile-text-sm font-medium rounded-lg transition-colors
                    ${isActive(item.href)
                      ? 'bg-timesnow-red text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`
                      mr-3 flex-shrink-0
                      ${isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}
                    `} 
                  />
                  <span className="admin-mobile-hidden">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 admin-mobile-hidden">
          <div className="text-center">
            <p className="admin-mobile-text-sm text-gray-500">© 2024 Times Now India</p>
            <p className="admin-mobile-text-sm text-gray-400 mt-1">Admin Panel v2.0</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
