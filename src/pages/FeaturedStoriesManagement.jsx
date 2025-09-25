import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:4000/api/featured-stories' 
  : 'https://api.timesnowindia24.live/api/featured-stories';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep', 'Puducherry'
];

const CATEGORIES = [
  'India',
  'World', 
  'Business',
  'Sports',
  'Entertainment',
  'Technology',
  'Lifestyle'
];

const FeaturedStoriesManagement = () => {
  const navigate = useNavigate();
  const [featuredStories, setFeaturedStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    state: '',
    excerpt: '',
    priority: 1,
    image: null,
    imagePreview: ''
  });

  useEffect(() => {
    fetchFeaturedStories();
  }, []);

  const fetchFeaturedStories = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setFeaturedStories(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch featured stories');
        setFeaturedStories([]);
      }
    } catch (error) {
      console.error('Error fetching featured stories:', error);
      setFeaturedStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('excerpt', formData.excerpt);
    formDataToSend.append('priority', formData.priority);
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      let response;
      if (isEditing && selectedId) {
        response = await fetch(`${API_URL}/${selectedId}`, {
          method: 'PUT',
          body: formDataToSend
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          body: formDataToSend
        });
      }

      if (response.ok) {
        setMessage(isEditing ? 'Featured story updated successfully!' : 'Featured story added successfully!');
        setFormData({
          title: '',
          description: '',
          content: '',
          category: '',
          state: '',
          excerpt: '',
          priority: 1,
          image: null,
          imagePreview: ''
        });
        setIsEditing(false);
        setSelectedId(null);
        fetchFeaturedStories();
      } else {
        const text = await response.text();
        console.error('Server responded with:', text);
        setMessage('Failed to save featured story');
      }
    } catch (error) {
      console.error('Error submitting featured story:', error);
      setMessage('Error connecting to server');
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setSelectedId(item.id);
    setIsEditing(true);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      content: item.content || item.description || '',
      category: item.category || '',
      state: item.state || '',
      excerpt: item.excerpt || item.description || '',
      priority: item.priority || 1,
      image: null,
      imagePreview: item.imageUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedId(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      state: '',
      excerpt: '',
      priority: 1,
      image: null,
      imagePreview: ''
    });
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this featured story?')) return;
    
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Featured story deleted successfully');
        fetchFeaturedStories();
      } else {
        setMessage('Failed to delete featured story');
      }
    } catch (error) {
      console.error('Error deleting featured story:', error);
      setMessage('Error deleting featured story');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-orange-100 text-orange-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return 'Normal';
    }
  };

  return (
    <div className="admin-mobile-container-fluid admin-mobile-section">
      <div className="admin-mobile-container-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-timesnow-red to-red-600 text-white rounded-xl shadow-xl mb-8 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Featured Stories Management</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    <p className="text-red-100">Real-time content management</p>
                  </div>
                </div>
              </div>
              <p className="text-red-100 leading-relaxed max-w-2xl">
                Create and manage compelling featured stories that appear prominently on your homepage. 
                Use priority levels to control story placement and maximize reader engagement.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.scrollTo({ top: document.getElementById('story-form')?.offsetTop || 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 font-medium border border-white/30"
              >
                📝 Add Story
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-white text-timesnow-red rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <div>
                  <p className="text-sm text-red-100">Total Stories</p>
                  <p className="text-xl font-bold">{featuredStories.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  🔥
                </div>
                <div>
                  <p className="text-sm text-red-100">High Priority</p>
                  <p className="text-xl font-bold">{featuredStories.filter(s => s.priority === 1).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <div>
                  <p className="text-sm text-red-100">Live on Homepage</p>
                  <p className="text-xl font-bold">{Math.min(featuredStories.length, 3)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 shadow-lg ${
            message.includes('successfully') || message.includes('deleted') 
              ? 'bg-green-50 text-green-800 border-green-400' 
              : 'bg-red-50 text-red-800 border-red-400'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.includes('successfully') || message.includes('deleted') 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                {message.includes('successfully') || message.includes('deleted') ? '✅' : '❌'}
              </div>
              <div>
                <p className="font-semibold">
                  {message.includes('successfully') || message.includes('deleted') ? 'Success!' : 'Error'}
                </p>
                <p className="text-sm opacity-90">{message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div id="story-form" className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="bg-gradient-to-r from-timesnow-red to-red-600 text-white p-6 rounded-t-xl">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                ⭐
              </div>
              {isEditing ? 'Edit Featured Story' : 'Add New Featured Story'}
            </h2>
            <p className="text-red-100 mt-2">
              {isEditing ? 'Update your featured story details below' : 'Create compelling stories that capture your audience attention'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            {/* Title and Category Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Story Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-timesnow-red focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                  required
                  placeholder="Enter an engaging story title..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Category
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-timesnow-red focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 text-gray-900 bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* State and Priority Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  State/Region
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-timesnow-red focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 text-gray-900 bg-white"
                >
                  <option value="">All India</option>
                  {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Priority Level
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-timesnow-red focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 text-gray-900 bg-white"
                >
                  <option value={1}>🔥 High Priority (Top of page)</option>
                  <option value={2}>⚡ Medium Priority</option>
                  <option value={3}>📄 Low Priority</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Short Description
                <span className="text-red-500">*</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">Appears in story card</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-timesnow-red focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
                required
                rows="3"
                placeholder="Write a compelling description that will appear in the story card..."
              />
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                SEO Excerpt
                <span className="text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-600">Optional - for search engines</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-timesnow-red focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
                rows="2"
                placeholder="Optional SEO-friendly excerpt (will use description if empty)"
              />
            </div>

            {/* Full Content */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Full Article Content
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-timesnow-red focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
                required
                rows="6"
                placeholder="Write the complete article content here..."
              />
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                Featured Image
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">JPEG, PNG, WebP supported</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-timesnow-red transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-timesnow-red file:text-white hover:file:bg-red-600 file:cursor-pointer cursor-pointer"
                />
                {formData.imagePreview && (
                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-24 h-18 object-contain rounded-lg border-2 border-gray-200 shadow-sm"
                    />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Image Preview</p>
                      <p className="text-xs text-gray-500">Image will be automatically optimized</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <span className="text-red-500">*</span> Required fields
              </div>
              <div className="flex gap-3">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-timesnow-red to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {isEditing ? '💾 Update Story' : '✨ Create Story'}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Stories List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-t-xl border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-timesnow-red/10 rounded-lg flex items-center justify-center">
                    📚
                  </div>
                  Featured Stories ({featuredStories.length})
                </h3>
                <p className="text-gray-600 mt-1">Manage and organize your featured content</p>
              </div>
              {featuredStories.length > 0 && (
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                  Sorted by priority
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-timesnow-red border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">Loading featured stories...</span>
                </div>
              </div>
            ) : featuredStories.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Featured Stories Yet</h3>
                <p className="text-gray-600 mb-4">Create your first featured story to showcase important content on your homepage.</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-6 py-2 bg-timesnow-red text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Create First Story
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {featuredStories
                  .sort((a, b) => (a.priority || 1) - (b.priority || 1))
                  .map((story, index) => (
                  <div key={story.id} className="group bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-timesnow-red hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-6">
                      {/* Priority Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                          story.priority === 1 ? 'bg-gradient-to-br from-red-500 to-red-600' :
                          story.priority === 2 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                          'bg-gradient-to-br from-yellow-500 to-yellow-600'
                        }`}>
                          {story.priority === 1 ? '🔥' : story.priority === 2 ? '⚡' : '📄'}
                        </div>
                      </div>

                      {/* Story Image */}
                      {story.imageUrl && (
                        <div className="flex-shrink-0">
                          <img
                            src={story.imageUrl}
                            alt={story.title}
                            className="w-20 h-16 object-contain rounded-lg border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                          />
                        </div>
                      )}

                      {/* Story Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-timesnow-red transition-colors duration-200 truncate">
                              {story.title}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(story.priority)}`}>
                              {getPriorityText(story.priority)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {story.description}
                          </p>                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              {story.category && (
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-timesnow-red rounded-full"></div>
                                  <span className="font-medium text-timesnow-red">{story.category}</span>
                                </span>
                              )}
                              {story.state && (
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span>{story.state}</span>
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{new Date(story.timestamp).toLocaleDateString('en-IN', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>{story.views || '0'} views</span>
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleEdit(story)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md flex items-center gap-2"
                            >
                              <span>✏️</span>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(story.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md flex items-center gap-2"
                            >
                              <span>🗑️</span>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStoriesManagement;
