import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Image, Calendar, BarChart3, X, Eye, EyeOff, MapPin } from 'lucide-react'

const AdsManagement = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: 'Side Banner - Electronics',
      type: 'side-banner',
      location: 'right-sidebar',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      clicks: 1250,
      impressions: 15000,
      ctr: '8.33%',
      budget: 5000,
      spent: 3200
    },
    {
      id: 2,
      title: 'Footer Ad - Insurance',
      type: 'footer',
      location: 'footer',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      clicks: 890,
      impressions: 12000,
      ctr: '7.42%',
      budget: 3000,
      spent: 2100
    },
    {
      id: 3,
      title: 'Side Banner - Fashion',
      type: 'side-banner',
      location: 'left-sidebar',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      status: 'paused',
      startDate: '2024-01-12',
      endDate: '2024-02-12',
      clicks: 650,
      impressions: 8000,
      ctr: '8.13%',
      budget: 4000,
      spent: 1800
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAd, setEditingAd] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [adForm, setAdForm] = useState({
    title: '',
    type: 'side-banner',
    location: 'right-sidebar',
    image: '',
    status: 'active',
    startDate: '',
    endDate: '',
    budget: '',
    description: ''
  })

  const handleAddAd = () => {
    setEditingAd(null)
    setAdForm({
      title: '',
      type: 'side-banner',
      location: 'right-sidebar',
      image: '',
      status: 'active',
      startDate: '',
      endDate: '',
      budget: '',
      description: ''
    })
    setShowAddModal(true)
  }

  const handleEditAd = (ad) => {
    setEditingAd(ad)
    setAdForm({
      title: ad.title,
      type: ad.type,
      location: ad.location,
      image: ad.image,
      status: ad.status,
      startDate: ad.startDate,
      endDate: ad.endDate,
      budget: ad.budget,
      description: ad.description || ''
    })
    setShowAddModal(true)
  }

  const handleDeleteAd = (id) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      setAds(ads.filter(ad => ad.id !== id))
      console.log('Ad deleted:', id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingAd) {
      // Update existing ad
      const updatedAds = ads.map(ad => 
        ad.id === editingAd.id 
          ? { 
              ...ad, 
              ...adForm,
              budget: parseFloat(adForm.budget),
              clicks: ad.clicks,
              impressions: ad.impressions,
              ctr: ad.ctr,
              spent: ad.spent
            }
          : ad
      )
      setAds(updatedAds)
      console.log('Ad updated:', { id: editingAd.id, ...adForm })
    } else {
      // Add new ad
      const newAd = {
        ...adForm,
        id: Date.now(),
        clicks: 0,
        impressions: 0,
        ctr: '0%',
        spent: 0,
        budget: parseFloat(adForm.budget)
      }
      setAds([...ads, newAd])
      console.log('New ad added:', newAd)
    }

    setShowAddModal(false)
    setEditingAd(null)
    setAdForm({
      title: '',
      type: 'side-banner',
      location: 'right-sidebar',
      image: '',
      status: 'active',
      startDate: '',
      endDate: '',
      budget: '',
      description: ''
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'side-banner': return 'bg-blue-100 text-blue-800'
      case 'footer': return 'bg-purple-100 text-purple-800'
      case 'header': return 'bg-indigo-100 text-indigo-800'
      case 'popup': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || ad.type === filterType
    const matchesStatus = filterStatus === 'all' || ad.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const totalStats = {
    totalAds: ads.length,
    activeAds: ads.filter(ad => ad.status === 'active').length,
    totalClicks: ads.reduce((sum, ad) => sum + ad.clicks, 0),
    totalImpressions: ads.reduce((sum, ad) => sum + ad.impressions, 0),
    totalBudget: ads.reduce((sum, ad) => sum + ad.budget, 0),
    totalSpent: ads.reduce((sum, ad) => sum + ad.spent, 0)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ads Management</h1>
          <p className="text-gray-600">Manage advertisements and promotional content</p>
        </div>
        <button
          onClick={handleAddAd}
          className="admin-btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto mt-4 sm:mt-0"
        >
          <Plus size={20} />
          <span>Add Advertisement</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-timesnow-red">{totalStats.totalAds}</div>
          <div className="text-sm text-gray-600">Total Ads</div>
        </div>
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-green-600">{totalStats.activeAds}</div>
          <div className="text-sm text-gray-600">Active Ads</div>
        </div>
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-blue-600">{totalStats.totalClicks.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Clicks</div>
        </div>
        <div className="admin-card text-center">
          <div className="text-2xl font-bold text-purple-600">{totalStats.totalImpressions.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Impressions</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="admin-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Types</option>
            <option value="side-banner">Side Banner</option>
            <option value="footer">Footer</option>
            <option value="header">Header</option>
            <option value="popup">Popup</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
          
          <button
            onClick={() => {
              setSearchTerm('')
              setFilterType('all')
              setFilterStatus('all')
            }}
            className="admin-btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAds.map((ad) => (
          <div key={ad.id} className="admin-card hover:shadow-lg transition-shadow duration-200">
            {/* Ad Image */}
            <div className="relative mb-4">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-40 object-contain rounded-lg"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEditAd(ad)}
                  className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  title="Edit Ad"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteAd(ad.id)}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  title="Delete Ad"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Ad Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{ad.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(ad.type)}`}>
                    {ad.type}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                    {ad.status}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{ad.location}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{ad.startDate} to {ad.endDate}</span>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{ad.clicks.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Clicks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{ad.impressions.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Impressions</div>
                </div>
              </div>

              {/* CTR and Budget */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-sm font-medium text-purple-600">{ad.ctr}</div>
                  <div className="text-xs text-gray-500">CTR</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-600">₹{ad.budget.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Budget</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAds.length === 0 && (
        <div className="text-center py-12">
          <Image size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No advertisements found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first advertisement'
            }
          </p>
          {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
            <button
              onClick={handleAddAd}
              className="admin-btn-primary"
            >
              <Plus size={20} className="mr-2" />
              Add First Advertisement
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
                    {editingAd ? 'Edit Advertisement' : 'Add New Advertisement'}
                  </h2>
                  <p className="text-gray-600">
                    {editingAd ? 'Update advertisement information' : 'Create a new advertisement'}
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
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advertisement Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={adForm.title}
                    onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
                    className="admin-input"
                    placeholder="Enter advertisement title"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    required
                    value={adForm.type}
                    onChange={(e) => setAdForm({ ...adForm, type: e.target.value })}
                    className="admin-select"
                  >
                    <option value="side-banner">Side Banner</option>
                    <option value="footer">Footer</option>
                    <option value="header">Header</option>
                    <option value="popup">Popup</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    required
                    value={adForm.location}
                    onChange={(e) => setAdForm({ ...adForm, location: e.target.value })}
                    className="admin-select"
                  >
                    <option value="right-sidebar">Right Sidebar</option>
                    <option value="left-sidebar">Left Sidebar</option>
                    <option value="footer">Footer</option>
                    <option value="header">Header</option>
                    <option value="content">Content Area</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={adForm.startDate}
                    onChange={(e) => setAdForm({ ...adForm, startDate: e.target.value })}
                    className="admin-input"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={adForm.endDate}
                    onChange={(e) => setAdForm({ ...adForm, endDate: e.target.value })}
                    className="admin-input"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={adForm.budget}
                    onChange={(e) => setAdForm({ ...adForm, budget: e.target.value })}
                    className="admin-input"
                    placeholder="Enter budget amount"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={adForm.status}
                    onChange={(e) => setAdForm({ ...adForm, status: e.target.value })}
                    className="admin-select"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={adForm.image}
                    onChange={(e) => setAdForm({ ...adForm, image: e.target.value })}
                    className="admin-input"
                    placeholder="Enter image URL"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={adForm.description}
                    onChange={(e) => setAdForm({ ...adForm, description: e.target.value })}
                    className="admin-textarea"
                    placeholder="Enter advertisement description..."
                  />
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
                  {editingAd ? 'Update Advertisement' : 'Add Advertisement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdsManagement
