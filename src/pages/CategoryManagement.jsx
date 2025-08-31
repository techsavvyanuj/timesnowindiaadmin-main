import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, MapPin, Globe, X } from 'lucide-react'

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Politics',
      description: 'Political news and updates',
      icon: '🏛️',
      color: '#dc2626',
      isActive: true,
      subcategories: ['National Politics', 'State Politics', 'International Politics']
    },
    {
      id: 2,
      name: 'Business',
      description: 'Business and economic news',
      icon: '💼',
      color: '#059669',
      isActive: true,
      subcategories: ['Stock Market', 'Corporate News', 'Startups']
    },
    {
      id: 3,
      name: 'Sports',
      description: 'Sports news and updates',
      icon: '⚽',
      color: '#2563eb',
      isActive: true,
      subcategories: ['Cricket', 'Football', 'Tennis']
    }
  ])

  const [states, setStates] = useState([
    {
      id: 1,
      name: 'Madhya Pradesh',
      code: 'MP',
      isActive: true,
      cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain']
    },
    {
      id: 2,
      name: 'Maharashtra',
      code: 'MH',
      isActive: true,
      cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik']
    },
    {
      id: 3,
      name: 'Delhi',
      code: 'DL',
      isActive: true,
      cities: ['New Delhi', 'Old Delhi', 'Dwarka', 'Rohini']
    }
  ])

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showAddStateModal, setShowAddStateModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingState, setEditingState] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    icon: '',
    color: '#dc2626',
    isActive: true,
    subcategories: ''
  })

  const [stateForm, setStateForm] = useState({
    name: '',
    code: '',
    isActive: true,
    cities: ''
  })

  const handleAddCategory = () => {
    setEditingCategory(null)
    setCategoryForm({
      name: '',
      description: '',
      icon: '',
      color: '#dc2626',
      isActive: true,
      subcategories: ''
    })
    setShowAddCategoryModal(true)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setCategoryForm({
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      isActive: category.isActive,
      subcategories: category.subcategories.join(', ')
    })
    setShowAddCategoryModal(true)
  }

  const handleAddState = () => {
    setEditingState(null)
    setStateForm({
      name: '',
      code: '',
      isActive: true,
      cities: ''
    })
    setShowAddStateModal(true)
  }

  const handleEditState = (state) => {
    setEditingState(state)
    setStateForm({
      name: state.name,
      code: state.code,
      isActive: state.isActive,
      cities: state.cities.join(', ')
    })
    setShowAddStateModal(true)
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    
    const categoryData = {
      ...categoryForm,
      subcategories: categoryForm.subcategories.split(',').map(sub => sub.trim()).filter(sub => sub)
    }

    if (editingCategory) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...categoryData, id: cat.id }
          : cat
      )
      setCategories(updatedCategories)
      console.log('Category updated:', { id: editingCategory.id, ...categoryData })
    } else {
      // Add new category
      const newCategory = {
        ...categoryData,
        id: Date.now()
      }
      setCategories([...categories, newCategory])
      console.log('New category added:', newCategory)
    }

    setShowAddCategoryModal(false)
    setEditingCategory(null)
    setCategoryForm({
      name: '',
      description: '',
      icon: '',
      color: '#dc2626',
      isActive: true,
      subcategories: ''
    })
  }

  const handleStateSubmit = (e) => {
    e.preventDefault()
    
    const stateData = {
      ...stateForm,
      cities: stateForm.cities.split(',').map(city => city.trim()).filter(city => city)
    }

    if (editingState) {
      // Update existing state
      const updatedStates = states.map(state => 
        state.id === editingState.id 
          ? { ...state, ...stateData }
          : state
      )
      setStates(updatedStates)
      console.log('State updated:', { id: editingState.id, ...stateData })
    } else {
      // Add new state
      const newState = {
        ...stateData,
        id: Date.now()
      }
      setStates([...states, newState])
      console.log('New state added:', newState)
    }

    setShowAddStateModal(false)
    setEditingState(null)
    setStateForm({
      name: '',
      code: '',
      isActive: true,
      cities: ''
    })
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category? This will also delete all subcategories.')) {
      setCategories(categories.filter(cat => cat.id !== id))
      console.log('Category deleted:', id)
    }
  }

  const handleDeleteState = (id) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      setStates(states.filter(state => state.id !== id))
      console.log('State deleted:', id)
    }
  }

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600">Manage news categories, subcategories, and states</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          <button
            onClick={handleAddCategory}
            className="admin-btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
          <button
            onClick={handleAddState}
            className="admin-btn-secondary flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <MapPin size={20} />
            <span>Add State</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="admin-card">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
      </div>

      {/* Categories and States Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Categories Section */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">News Categories</h3>
            <p className="admin-card-subtitle">Organize news by topics and subcategories</p>
          </div>
          
          <div className="space-y-3">
            {filteredCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 truncate">{category.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></span>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Edit Category"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Subcategories */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Subcategories:</h5>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* States Section */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">States & Cities</h3>
            <p className="admin-card-subtitle">Manage location-based news categorization</p>
          </div>
          
          <div className="space-y-3">
            {states.map((state) => (
              <div key={state.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <Globe size={20} className="text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{state.name}</h4>
                      <p className="text-sm text-gray-500">Code: {state.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      state.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {state.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => handleEditState(state)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Edit State"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteState(state.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete State"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Cities:</h5>
                  <div className="flex flex-wrap gap-2">
                    {state.cities.map((city, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h2>
                  <p className="text-gray-600">
                    {editingCategory ? 'Update category information' : 'Create a new news category'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddCategoryModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="admin-input"
                    placeholder="e.g., Politics, Business, Sports"
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon (Emoji) *
                  </label>
                  <input
                    type="text"
                    required
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                    className="admin-input text-center text-2xl"
                    placeholder="🏛️"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color *
                  </label>
                  <input
                    type="color"
                    required
                    value={categoryForm.color}
                    onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Is Active */}
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={categoryForm.isActive}
                      onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })}
                      className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="admin-input"
                    placeholder="Brief description of this category..."
                  />
                </div>

                {/* Subcategories */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategories
                  </label>
                  <textarea
                    rows={3}
                    value={categoryForm.subcategories}
                    onChange={(e) => setCategoryForm({ ...categoryForm, subcategories: e.target.value })}
                    className="admin-input"
                    placeholder="Enter subcategories separated by commas (e.g., National Politics, State Politics, International Politics)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple subcategories with commas
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary w-full sm:w-auto"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit State Modal */}
      {showAddStateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingState ? 'Edit State' : 'Add New State'}
                  </h2>
                  <p className="text-gray-600">
                    {editingState ? 'Update state information' : 'Create a new state with cities'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddStateModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleStateSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* State Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={stateForm.name}
                    onChange={(e) => setStateForm({ ...stateForm, name: e.target.value })}
                    className="admin-input"
                    placeholder="e.g., Madhya Pradesh"
                  />
                </div>

                {/* State Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={stateForm.code}
                    onChange={(e) => setStateForm({ ...stateForm, code: e.target.value.toUpperCase() })}
                    className="admin-input"
                    placeholder="e.g., MP"
                    maxLength={2}
                  />
                </div>

                {/* Is Active */}
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={stateForm.isActive}
                      onChange={(e) => setStateForm({ ...stateForm, isActive: e.target.checked })}
                      className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>

                {/* Cities */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cities *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={stateForm.cities}
                    onChange={(e) => setStateForm({ ...stateForm, cities: e.target.value })}
                    className="admin-input"
                    placeholder="Enter cities separated by commas (e.g., Bhopal, Indore, Gwalior, Jabalpur, Ujjain)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple cities with commas
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddStateModal(false)}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary w-full sm:w-auto"
                >
                  {editingState ? 'Update State' : 'Add State'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
