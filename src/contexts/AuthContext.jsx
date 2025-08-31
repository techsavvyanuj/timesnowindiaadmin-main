import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('admin-auth')
    return saved ? JSON.parse(saved) : false
  })

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admin-user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    localStorage.setItem('admin-auth', JSON.stringify(isAuthenticated))
    if (user) {
      localStorage.setItem('admin-user', JSON.stringify(user))
    }
  }, [isAuthenticated, user])

  const login = (email, password) => {
    // Demo authentication - replace with actual API call
    if (email === 'admin@timesnowindia.com' && password === 'admin123') {
      const userData = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
      setUser(userData)
      setIsAuthenticated(true)
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('admin-auth')
    localStorage.removeItem('admin-user')
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
