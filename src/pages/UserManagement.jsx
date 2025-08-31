import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Users, Shield, UserCheck, UserX, X, Mail, Phone, MapPin } from 'lucide-react'

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@timesnowindia.com',
      role: 'super admin',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-01-15 14:30',
      permissions: ['all'],
      phone: '+91 9926890112',
      department: 'Administration'
    },
    {
      id: 2,
      name: 'Editor User',
      email: 'editor@timesnowindia.com',
      role: 'editor',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-01-15 12:15',
      permissions: ['news_edit', 'content_manage'],
      phone: '+91 9876543210',
      department: 'Editorial'
    },
    {
      id: 3,
      name: 'Content Manager',
      email: 'content@timesnowindia.com',
      role: 'content manager',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-01-15 10:45',
      permissions: ['content_manage', 'media_upload'],
      phone: '+91 9876543211',
      department: 'Content'
    },
    {
      id: 4,
      name: 'Moderator',
      email: 'moderator@timesnowindia.com',
      role: 'moderator',
      status: 'inactive',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      lastLogin: '2024-01-14 16:20',
      permissions: ['comment_moderate'],
      phone: '+91 9876543212',
      department: 'Moderation'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'editor',
    status: 'active',
    phone: '',
    department: '',
    permissions: []
  })

  const roles = [
    { value: 'super admin', label: 'Super Admin', color: 'bg-red-100 text-red-800' },
    { value: 'admin', label: 'Admin', color: 'bg-purple-100 text-purple-800' },
    { value: 'editor', label: 'Editor', color: 'bg-blue-100 text-blue-800' },
    { value: 'content manager', label: 'Content Manager', color: 'bg-green-100 text-green-800' },
    { value: 'moderator', label: 'Moderator', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'viewer', label: 'Viewer', color: 'bg-gray-100 text-gray-800' }
  ]

  const permissions = [
    { value: 'news_edit', label: 'News Edit' },
    { value: 'content_manage', label: 'Content Management' },
    { value: 'media_upload', label: 'Media Upload' },
    { value: 'user_manage', label: 'User Management' },
    { value: 'comment_moderate', label: 'Comment Moderation' },
    { value: 'analytics_view', label: 'Analytics View' },
    { value: 'settings_edit', label: 'Settings Edit' }
  ]

  const handleAddUser = () => {
    setEditingUser(null)
    setUserForm({
      name: '',
      email: '',
      role: 'editor',
      status: 'active',
      phone: '',
      department: '',
      permissions: []
    })
    setShowAddModal(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      department: user.department || '',
      permissions: user.permissions || []
    })
    setShowAddModal(true)
  }

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id))
      console.log('User deleted:', id)
    }
  }

  const handlePermissionChange = (permission) => {
    setUserForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { 
              ...user, 
              ...userForm,
              lastLogin: user.lastLogin,
              avatar: user.avatar
            }
          : user
      )
      setUsers(updatedUsers)
      console.log('User updated:', { id: editingUser.id, ...userForm })
    } else {
      // Add new user
      const newUser = {
        ...userForm,
        id: Date.now(),
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=40&h=40&fit=crop&crop=face`,
        lastLogin: 'Never',
        permissions: userForm.permissions
      }
      setUsers([...users, newUser])
      console.log('New user added:', newUser)
    }

    setShowAddModal(false)
    setEditingUser(null)
    setUserForm({
      name: '',
      email: '',
      role: 'editor',
      status: 'active',
      phone: '',
      department: '',
      permissions: []
    })
  }

  const getRoleColor = (role) => {
    const roleObj = roles.find(r => r.value === role)
    return roleObj ? roleObj.color : 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalStats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    inactiveUsers: users.filter(user => user.status === 'inactive').length,
    superAdmins: users.filter(user => user.role === 'super admin').length
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage admin users and their permissions</p>
        </div>
        <button
          onClick={handleAddUser}
          className="admin-btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto mt-4 sm:mt-0"
        >
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-blue-600">{totalStats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-green-600">{totalStats.activeUsers}</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-red-600">{totalStats.superAdmins}</div>
          <div className="text-sm text-gray-600">Super Admins</div>
        </div>
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-purple-600">{totalStats.inactiveUsers}</div>
          <div className="text-sm text-gray-600">Inactive Users</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="admin-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          
          <button
            onClick={() => {
              setSearchTerm('')
              setFilterRole('all')
              setFilterStatus('all')
            }}
            className="admin-btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.department && (
                          <div className="text-xs text-gray-400">{user.department}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {roles.find(r => r.value === user.role)?.label || user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="text-sm text-gray-900">{user.lastLogin}</div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit User"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterRole !== 'all' || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first user'
            }
          </p>
          {!searchTerm && filterRole === 'all' && filterStatus === 'all' && (
            <button
              onClick={handleAddUser}
              className="admin-btn-primary"
            >
              <Plus size={20} className="mr-2" />
              Add First User
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingUser ? 'Edit User' : 'Add New User'}
                  </h2>
                  <p className="text-gray-600">
                    {editingUser ? 'Update user information' : 'Create a new admin user'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="admin-input"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="admin-input"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    required
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="admin-select"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                    className="admin-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="admin-input"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={userForm.department}
                    onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
                    className="admin-input"
                    placeholder="Enter department"
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissions.map((permission) => (
                    <label key={permission.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={userForm.permissions.includes(permission.value)}
                        onChange={() => handlePermissionChange(permission.value)}
                        className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
                      />
                      <span className="text-sm text-gray-700">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary w-full sm:w-auto"
                >
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
