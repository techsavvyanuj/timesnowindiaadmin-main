import React, { useState } from 'react'
import { Plus, Upload, Image, Video, Search, Filter, Download, Trash2, Eye } from 'lucide-react'

const MediaManagement = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Demo media data
  const [media] = useState([
    {
      id: 1,
      name: 'bollywood-news.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop',
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-15',
      category: 'Entertainment'
    },
    {
      id: 2,
      name: 'business-meeting.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      size: '1.8 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-14',
      category: 'Business'
    },
    {
      id: 3,
      name: 'cricket-match.mp4',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop',
      size: '45.2 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-13',
      category: 'Sports'
    },
    {
      id: 4,
      name: 'tech-conference.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      size: '3.1 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-12',
      category: 'Technology'
    }
  ])

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || item.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type) => {
    return type === 'image' ? <Image size={20} /> : <Video size={20} />
  }

  const getTypeColor = (type) => {
    return type === 'image' ? 'bg-blue-500' : 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-600">Manage your photos, videos, and media files</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="admin-btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Upload size={20} />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div key={item.id} className="admin-card group">
            <div className="relative">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-48 object-contain rounded-lg"
              />
              <div className="absolute top-2 right-2">
                <div className={`${getTypeColor(item.type)} p-2 rounded-lg`}>
                  {getTypeIcon(item.type)}
                </div>
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors" title="Download">
                    <Download size={16} />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{item.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimensions:</span>
                  <span>{item.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span>{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span>{item.uploadDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No media files found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upload Media</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Files
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="admin-btn-primary">Choose Files</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*,video/*" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF, MP4, MOV up to 100MB
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="admin-select">
                    <option value="">Select Category</option>
                    <option value="politics">Politics</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="admin-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-btn-primary"
                  >
                    Upload Files
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaManagement
