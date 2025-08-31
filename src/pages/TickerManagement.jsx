import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, TrendingUp, Eye, Calendar, BarChart3, X } from 'lucide-react'

const TickerManagement = () => {
  const [tickers, setTickers] = useState([
    {
      id: 1,
      headline: "Breaking: Major Political Announcement Expected Today",
      type: "breaking",
      priority: "high",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      views: 12500,
      description: "A major political announcement is expected from the government today that could impact the nation."
    },
    {
      id: 2,
      headline: "Sports: Cricket World Cup Final Highlights",
      type: "carousel",
      priority: "medium",
      status: "active",
      startDate: "2024-01-14",
      endDate: "2024-01-18",
      views: 8900,
      description: "Highlights and analysis from the Cricket World Cup final match."
    },
    {
      id: 3,
      headline: "Business: Stock Market Update",
      type: "ticker",
      priority: "low",
      status: "inactive",
      startDate: "2024-01-13",
      endDate: "2024-01-16",
      views: 5600,
      description: "Latest updates from the stock market and financial sector."
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTicker, setEditingTicker] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const [tickerForm, setTickerForm] = useState({
    headline: '',
    type: 'breaking',
    priority: 'medium',
    status: 'active',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleAddTicker = () => {
    setEditingTicker(null)
    setTickerForm({
      headline: '',
      type: 'breaking',
      priority: 'medium',
      status: 'active',
      startDate: '',
      endDate: '',
      description: ''
    })
    setShowAddModal(true)
  }

  const handleEditTicker = (ticker) => {
    setEditingTicker(ticker)
    setTickerForm({
      headline: ticker.headline,
      type: ticker.type,
      priority: ticker.priority,
      status: ticker.status,
      startDate: ticker.startDate,
      endDate: ticker.endDate,
      description: ticker.description
    })
    setShowAddModal(true)
  }

  const handleDeleteTicker = (id) => {
    if (window.confirm('Are you sure you want to delete this ticker?')) {
      setTickers(tickers.filter(ticker => ticker.id !== id))
      console.log('Ticker deleted:', id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingTicker) {
      // Update existing ticker
      const updatedTickers = tickers.map(ticker => 
        ticker.id === editingTicker.id 
          ? { ...ticker, ...tickerForm }
          : ticker
      )
      setTickers(updatedTickers)
      console.log('Ticker updated:', { id: editingTicker.id, ...tickerForm })
    } else {
      // Add new ticker
      const newTicker = {
        ...tickerForm,
        id: Date.now(),
        views: 0
      }
      setTickers([...tickers, newTicker])
      console.log('New ticker added:', newTicker)
    }

    setShowAddModal(false)
    setEditingTicker(null)
    setTickerForm({
      headline: '',
      type: 'breaking',
      priority: 'medium',
      status: 'active',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'breaking': return '🔴'
      case 'carousel': return '🔄'
      case 'ticker': return '📰'
      default: return '📌'
    }
  }

  const filteredTickers = tickers.filter(ticker => {
    const matchesSearch = ticker.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticker.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || ticker.type === filterType
    const matchesStatus = filterStatus === 'all' || ticker.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticker & Carousel Management</h1>
          <p className="text-gray-600">Manage breaking news and featured content</p>
        </div>
        <button
          onClick={handleAddTicker}
          className="admin-btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto mt-4 sm:mt-0"
        >
          <Plus size={20} />
          <span>Add Ticker</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="admin-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickers..."
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
            <option value="breaking">Breaking News</option>
            <option value="carousel">Carousel</option>
            <option value="ticker">Ticker</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
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

      {/* Tickers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTickers.map((ticker) => (
          <div key={ticker.id} className="admin-card hover:shadow-lg transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getTypeIcon(ticker.type)}</span>
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticker.priority)}`}>
                    {ticker.priority}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(ticker.status)}`}>
                    {ticker.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditTicker(ticker)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit Ticker"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTicker(ticker.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete Ticker"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                {ticker.headline}
              </h3>
              
              <p className="text-gray-600 text-sm line-clamp-2">
                {ticker.description}
              </p>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{ticker.startDate} to {ticker.endDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 size={14} />
                  <span>{ticker.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTickers.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickers found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first ticker'
            }
          </p>
          {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
            <button
              onClick={handleAddTicker}
              className="admin-btn-primary"
            >
              <Plus size={20} className="mr-2" />
              Add First Ticker
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
                    {editingTicker ? 'Edit Ticker' : 'Add New Ticker'}
                  </h2>
                  <p className="text-gray-600">
                    {editingTicker ? 'Update ticker information' : 'Create a new breaking news ticker'}
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
                {/* Headline */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={tickerForm.headline}
                    onChange={(e) => setTickerForm({ ...tickerForm, headline: e.target.value })}
                    className="admin-input"
                    placeholder="Enter breaking news headline..."
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    required
                    value={tickerForm.type}
                    onChange={(e) => setTickerForm({ ...tickerForm, type: e.target.value })}
                    className="admin-select"
                  >
                    <option value="breaking">Breaking News</option>
                    <option value="carousel">Carousel</option>
                    <option value="ticker">Ticker</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    required
                    value={tickerForm.priority}
                    onChange={(e) => setTickerForm({ ...tickerForm, priority: e.target.value })}
                    className="admin-select"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
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
                    value={tickerForm.startDate}
                    onChange={(e) => setTickerForm({ ...tickerForm, startDate: e.target.value })}
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
                    value={tickerForm.endDate}
                    onChange={(e) => setTickerForm({ ...tickerForm, endDate: e.target.value })}
                    className="admin-input"
                  />
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={tickerForm.status}
                    onChange={(e) => setTickerForm({ ...tickerForm, status: e.target.value })}
                    className="admin-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={tickerForm.description}
                    onChange={(e) => setTickerForm({ ...tickerForm, description: e.target.value })}
                    className="admin-textarea"
                    placeholder="Enter ticker description..."
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
                  {editingTicker ? 'Update Ticker' : 'Add Ticker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TickerManagement
