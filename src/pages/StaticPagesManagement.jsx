import React, { useState } from 'react'
import { Plus, Edit, Eye, FileText, Shield, Briefcase, Users, X, Save, Trash2 } from 'lucide-react'

const StaticPagesManagement = () => {
  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'About Us',
      slug: 'about-us',
      icon: Users,
      content: 'Times Now India 27*7 is India\'s most trusted news channel, providing the latest breaking news, live updates, and in-depth analysis of current events.',
      status: 'published',
      lastUpdated: '2024-01-15 10:30'
    },
    {
      id: 2,
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      icon: Shield,
      content: 'This Privacy Policy describes how Times Now India 27*7 collects, uses, and protects your personal information when you use our services.',
      status: 'published',
      lastUpdated: '2024-01-15 10:30'
    },
    {
      id: 3,
      title: 'Terms & Conditions',
      slug: 'terms-conditions',
      icon: FileText,
      content: 'By using Times Now India 27*7 services, you agree to these terms and conditions. Please read them carefully before proceeding.',
      status: 'published',
      lastUpdated: '2024-01-15 10:30'
    },
    {
      id: 4,
      title: 'Careers',
      slug: 'careers',
      icon: Briefcase,
      content: 'Join our team at Times Now India 27*7. We offer exciting opportunities for talented professionals in journalism, technology, and media.',
      status: 'draft',
      lastUpdated: '2024-01-15 10:30'
    }
  ])

  const [selectedPage, setSelectedPage] = useState(pages[0])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPage, setEditingPage] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const [pageForm, setPageForm] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'draft'
  })

  const handleAddPage = () => {
    setEditingPage(null)
    setPageForm({
      title: '',
      slug: '',
      content: '',
      status: 'draft'
    })
    setShowAddModal(true)
  }

  const handleEditPage = (page) => {
    setEditingPage(page)
    setPageForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status
    })
    setShowEditModal(true)
  }

  const handleDeletePage = (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      const updatedPages = pages.filter(page => page.id !== id)
      setPages(updatedPages)
      
      // If deleted page was selected, select first available page
      if (selectedPage && selectedPage.id === id) {
        setSelectedPage(updatedPages[0] || null)
      }
      
      console.log('Page deleted:', id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingPage) {
      // Update existing page
      const updatedPages = pages.map(page => 
        page.id === editingPage.id 
          ? { 
              ...page, 
              ...pageForm, 
              lastUpdated: new Date().toLocaleString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          : page
      )
      setPages(updatedPages)
      
      // Update selected page if it was the edited one
      if (selectedPage && selectedPage.id === editingPage.id) {
        setSelectedPage(updatedPages.find(p => p.id === editingPage.id))
      }
      
      console.log('Page updated:', { id: editingPage.id, ...pageForm })
    } else {
      // Add new page
      const newPage = {
        ...pageForm,
        id: Date.now(),
        icon: FileText,
        lastUpdated: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      setPages([...pages, newPage])
      console.log('New page added:', newPage)
    }

    setShowAddModal(false)
    setShowEditModal(false)
    setEditingPage(null)
    setPageForm({
      title: '',
      slug: '',
      content: '',
      status: 'draft'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Users': return Users
      case 'Shield': return Shield
      case 'FileText': return FileText
      case 'Briefcase': return Briefcase
      default: return FileText
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Static Pages Management</h1>
          <p className="text-gray-600">Manage important static pages and legal content</p>
        </div>
        <button
          onClick={handleAddPage}
          className="admin-btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto mt-4 sm:mt-0"
        >
          <Plus size={20} />
          <span>Add Page</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page List */}
        <div className="lg:col-span-1">
          <div className="admin-card">
            <h3 className="admin-card-title mb-4">Page List</h3>
            <div className="space-y-3">
              {pages.map((page) => {
                const Icon = getIcon(page.icon.name || page.icon)
                return (
                  <div
                    key={page.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedPage && selectedPage.id === page.id
                        ? 'border-timesnow-red bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPage(page)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon size={20} className="text-gray-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">{page.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditPage(page)
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit Page"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePage(page.id)
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Page"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {page.lastUpdated}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="lg:col-span-2">
          <div className="admin-card">
            <h3 className="admin-card-title mb-4">Page Content</h3>
            {selectedPage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">{selectedPage.title}</h4>
                  <button
                    onClick={() => handleEditPage(selectedPage)}
                    className="admin-btn-primary flex items-center space-x-2"
                  >
                    <Edit size={16} />
                    <span>Edit Content</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Slug:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedPage.slug}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPage.status)}`}>
                      {selectedPage.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                    <span className="ml-2 text-sm text-gray-600">{selectedPage.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Content:</h5>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 leading-relaxed">{selectedPage.content}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select a page from the list to view its content</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Page Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New Page</h2>
                  <p className="text-gray-600">Create a new static page</p>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={pageForm.title}
                    onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                    className="admin-input"
                    placeholder="Enter page title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={pageForm.slug}
                    onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="admin-input"
                    placeholder="page-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  required
                  value={pageForm.status}
                  onChange={(e) => setPageForm({ ...pageForm, status: e.target.value })}
                  className="admin-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Content *
                </label>
                <textarea
                  required
                  rows={8}
                  value={pageForm.content}
                  onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                  className="admin-textarea"
                  placeholder="Enter page content..."
                />
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
                  Add Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Page Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Edit Page</h2>
                  <p className="text-gray-600">Update page information</p>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={pageForm.title}
                    onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                    className="admin-input"
                    placeholder="Enter page title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={pageForm.slug}
                    onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="admin-input"
                    placeholder="page-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  required
                  value={pageForm.status}
                  onChange={(e) => setPageForm({ ...pageForm, status: e.target.value })}
                  className="admin-select"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Content *
                </label>
                <textarea
                  required
                  rows={8}
                  value={pageForm.content}
                  onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                  className="admin-textarea"
                  placeholder="Enter page content..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary w-full sm:w-auto"
                >
                  Update Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaticPagesManagement
