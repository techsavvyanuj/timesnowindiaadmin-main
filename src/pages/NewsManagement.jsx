import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, X, Calendar, User, MapPin, Tag, Image, Video } from 'lucide-react'

const NewsManagement = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    state: '',
    city: '',
    excerpt: '',
    content: '',
    tags: '',
    featured: false,
    breaking: false,
    image: '',
    imageFile: null,
    imagePreview: '',
    videoUrl: ''
  })

  // Sample data
  const categories = [
    { name: 'Politics', subcategories: ['National Politics', 'State Politics', 'International Politics'] },
    { name: 'Business', subcategories: ['Stock Market', 'Corporate News', 'Startups'] },
    { name: 'Sports', subcategories: ['Cricket', 'Football', 'Tennis'] }
  ]

  const states = [
    { name: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane'] },
    { name: 'Delhi', cities: ['New Delhi', 'Old Delhi', 'Dwarka', 'Rohini'] }
  ]

  // Fetch news from backend
  useEffect(() => {
    fetchNews()
  }, [])

  const API_BASE = 'http://localhost:4000/api'

  const fetchNews = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/news`)
      if (!res.ok) throw new Error('Failed to fetch news')
      const data = await res.json()
      setNews(Array.isArray(data) ? data.reverse() : [])
    } catch (err) {
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNews = () => {
    setFormData({
      title: '',
      category: '',
      subcategory: '',
      state: '',
      city: '',
      excerpt: '',
      content: '',
      tags: '',
      featured: false,
      breaking: false,
      image: '',
      imageFile: null,
      imagePreview: '',
      videoUrl: ''
    })
    setShowAddModal(true)
  }

  const handleEditNews = (newsItem) => {
    setSelectedNews(newsItem)
    setFormData({
      title: newsItem.title,
      category: newsItem.category,
      subcategory: newsItem.subcategory,
      state: newsItem.state,
      city: newsItem.city,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      tags: newsItem.tags.join(', '),
      featured: newsItem.featured,
      breaking: newsItem.breaking,
      image: newsItem.image,
      imageFile: null,
      imagePreview: newsItem.image || '',
      videoUrl: newsItem.videoUrl || ''
    })
    setShowEditModal(true)
  }

  const handleViewNews = (newsItem) => {
    setSelectedNews(newsItem)
    setShowViewModal(true)
  }

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return
    try {
      const res = await fetch(`${API_BASE}/news/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setNews(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error('Failed to delete news:', err)
      alert('Failed to delete news')
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    const payload = new FormData()
    payload.append('title', formData.title)
    payload.append('content', formData.content)
    payload.append('category', formData.category)
    payload.append('excerpt', formData.excerpt)
    payload.append('tags', JSON.stringify(formData.tags.split(',').map(t => t.trim()).filter(Boolean)))
    payload.append('featured', formData.featured)
    payload.append('breaking', formData.breaking)
    payload.append('state', formData.state)
    payload.append('city', formData.city)
    payload.append('videoUrl', formData.videoUrl || '')
    // allow either image url or file
    if (formData.imageFile) {
      payload.append('image', formData.imageFile)
    } else if (formData.image) {
      payload.append('imageUrl', formData.image)
    }

    const send = async () => {
      try {
        setLoading(true)
        let res
        if (showEditModal && selectedNews) {
          res = await fetch(`${API_BASE}/news/${selectedNews.id}`, { method: 'PUT', body: payload })
        } else {
          res = await fetch(`${API_BASE}/news`, { method: 'POST', body: payload })
        }
        if (!res.ok) throw new Error('Failed to save')
        await fetchNews()
        setShowAddModal(false)
        setShowEditModal(false)
        setSelectedNews(null)
        setFormData({
          title: '',
          category: '',
          subcategory: '',
          state: '',
          city: '',
          excerpt: '',
          content: '',
          tags: '',
          featured: false,
          breaking: false,
          image: '',
          imageFile: null,
          imagePreview: '',
          videoUrl: ''
        })
      } catch (err) {
        console.error('Error saving news:', err)
        alert('Failed to save news')
      } finally {
        setLoading(false)
      }
    }

    send()
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        category: value,
        subcategory: '',
        state: '',
        city: ''
      }))
    }

    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        state: value,
        city: ''
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    setFormData(prev => ({ ...prev, imageFile: file, imagePreview: preview }))
  }

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600">Manage all news articles with category, subcategory, and state organization</p>
        </div>
        <button
          onClick={handleAddNews}
          className="admin-btn-primary flex items-center justify-center space-x-2 mt-4 sm:mt-0 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Add News Article</span>
        </button>
      </div>

      {/* Enhanced Filters and Search */}
      <div className="admin-card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-center px-4 py-2 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">
            {filteredNews.length} articles found
          </span>
        </div>
      </div>

      {/* News Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {item.featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                          {item.breaking && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Breaking
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                      {item.subcategory && (
                        <div className="text-xs text-gray-600">
                          {item.subcategory}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <MapPin size={12} />
                        <span>{item.state}</span>
                      </div>
                      {item.city && (
                        <div className="text-xs text-gray-500">
                          {item.city}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewNews(item)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditNews(item)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
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

      {/* Add/Edit News Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {showEditModal ? 'Edit News Article' : 'Add News Article'}
                  </h2>
                  <p className="text-gray-600">
                    {showEditModal ? 'Update article information' : 'Create a new news article'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setShowEditModal(false)
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="admin-input w-full"
                    placeholder="Enter article title..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>

                {/* Subcategory */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    className="admin-select"
                    disabled={!formData.category}
                  >
                    <option value="">Select subcategory</option>
                    {formData.category && 
                      categories
                        .find(cat => cat.name === formData.category)
                        ?.subcategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))
                    }
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state.name} value={state.name}>{state.name}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="admin-select"
                    disabled={!formData.state}
                  >
                    <option value="">Select city</option>
                    {formData.state && 
                      states
                        .find(s => s.name === formData.state)
                        ?.cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))
                    }
                  </select>
                </div>

                {/* Featured & Breaking */}
                <div className="flex items-center space-x-4 md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Article</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="breaking"
                      checked={formData.breaking}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
                    />
                    <span className="text-sm font-medium text-gray-700">Breaking News</span>
                  </label>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Image size={16} className="inline mr-2" />
                    Image
                  </label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="admin-input" />
                  {formData.imagePreview && <img src={formData.imagePreview} alt="preview" className="mt-2 w-32 h-20 object-cover rounded" />}
                  {!formData.imagePreview && formData.image && <img src={formData.image} alt="current" className="mt-2 w-32 h-20 object-cover rounded" />}
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Video size={16} className="inline mr-2" />
                    Video URL (YouTube)
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="admin-input"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag size={16} className="inline mr-2" />
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="admin-input"
                    placeholder="Enter tags separated by commas..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple tags with commas (e.g., politics, delhi, breaking)
                  </p>
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Excerpt *
                  </label>
                  <textarea
                    name="excerpt"
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="admin-input"
                    placeholder="Brief summary of the article..."
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Content *
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={8}
                    value={formData.content}
                    onChange={handleInputChange}
                    className="admin-input"
                    placeholder="Full article content..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setShowEditModal(false)
                  }}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary w-full sm:w-auto"
                >
                  {showEditModal ? (
                    <>
                      <Edit size={20} className="mr-2" />
                      Update Article
                    </>
                  ) : (
                    <>
                      <Plus size={20} className="mr-2" />
                      Add Article
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View News Modal */}
      {showViewModal && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">View News Article</h2>
                  <p className="text-gray-600">Article ID: {selectedNews.id}</p>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Article Header */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full sm:w-24 h-48 sm:h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedNews.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{selectedNews.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{selectedNews.publishDate}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Category</h4>
                  <div className="space-y-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedNews.category}
                    </span>
                    {selectedNews.subcategory && (
                      <div className="text-sm text-gray-600">
                        Subcategory: {selectedNews.subcategory}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      <span>{selectedNews.state}</span>
                    </div>
                    {selectedNews.city && (
                      <div className="text-sm text-gray-600">
                        City: {selectedNews.city}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedNews.status)}`}>
                    {selectedNews.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNews.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Excerpt</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedNews.excerpt}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Full Content</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedNews.content}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEditNews(selectedNews)}
                  className="admin-btn-primary w-full sm:w-auto"
                >
                  <Edit size={20} className="mr-2" />
                  Edit Article
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsManagement
