import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:4000/api/breaking-news' 
  : 'https://times-backend-ybql.onrender.com/api/breaking-news';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

export default function BreakingNewsManagement() {
  const navigate = useNavigate();
  const [breakingNews, setBreakingNews] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    headline: '',
    shortDescription: '',
    fullDescription: '',
    state: '',
    video: null,
    videoPreview: '',
    thumbnail: null,
    thumbnailPreview: '',
    youtubeUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  const fetchBreakingNews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBreakingNews(data);
    } catch (error) {
      setMessage('Error fetching breaking news');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // NOTE: keep local video even if a YouTube URL is entered so admin can provide both
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview for immediate display
      const preview = URL.createObjectURL(file);
      
      setFormData(prev => ({
        ...prev,
        video: file,
        videoPreview: preview
      }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: preview
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('headline', formData.headline);
    formDataToSend.append('shortDescription', formData.shortDescription);
    formDataToSend.append('fullDescription', formData.fullDescription);
    formDataToSend.append('state', formData.state);
    // Always append local preview video if provided (admin can supply both preview video and youtubeUrl)
    if (formData.video) {
      formDataToSend.append('video', formData.video);
    }
    // Append thumbnail if provided
    if (formData.thumbnail) {
      formDataToSend.append('thumbnail', formData.thumbnail);
    }
    if (formData.youtubeUrl) {
      formDataToSend.append('youtubeUrl', formData.youtubeUrl);
    }

    try {
      let response
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
        setMessage(isEditing ? 'Breaking news updated successfully!' : 'Breaking news added successfully!');
        setFormData({
          headline: '',
          shortDescription: '',
          fullDescription: '',
          state: '',
          video: null,
          videoPreview: '',
          thumbnail: null,
          thumbnailPreview: '',
          youtubeUrl: ''
        });
        setIsEditing(false);
        setSelectedId(null);
        fetchBreakingNews();
      } else {
        const text = await response.text();
        console.error('Server responded with:', text);
        setMessage('Failed to save breaking news');
      }
    } catch (error) {
      console.error('Error submitting breaking news:', error);
      setMessage('Error connecting to server');
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setSelectedId(item.id);
    setIsEditing(true);
    setFormData({
      headline: item.headline || '',
      shortDescription: item.shortDescription || '',
      fullDescription: item.fullDescription || '',
      state: item.state || '',
      video: null,
      videoPreview: item.videoUrl || '',
      thumbnail: null,
      thumbnailPreview: item.thumbnail || '',
      youtubeUrl: item.youtubeUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedId(null);
    setFormData({
      headline: '',
      shortDescription: '',
      fullDescription: '',
      state: '',
      video: null,
      videoPreview: '',
      thumbnail: null,
      thumbnailPreview: '',
      youtubeUrl: ''
    });
    setMessage('');
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this breaking news?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchBreakingNews();
      setMessage('Breaking news deleted');
    } catch (err) {
      console.error('Delete error:', err);
      setMessage('Failed to delete breaking news');
    }
  }

  const handleView = (newsItem) => {
    // Navigate to the view page with the news item data
    navigate('/breaking-news/view', { state: newsItem });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Breaking News Management</h2>

      {/* Add Breaking News Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Headline
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Short Description
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a state</option>
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Description
          </label>
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            YouTube Link (optional)
          </label>
          <input
            type="url"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleInputChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Video (optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full p-2 border rounded"
          />
           {formData.videoPreview && (
             <video
               className="mt-2 max-w-full h-48"
               controls
               src={formData.videoPreview}
             />
           )}
          {/* If youtube link provided, show an iframe preview */}
          {!formData.videoPreview && formData.youtubeUrl && (
            <div className="mt-2">
              <iframe
                title="YouTube preview"
                src={formData.youtubeUrl.includes('watch?v=') ? formData.youtubeUrl.replace('watch?v=', 'embed/') : (formData.youtubeUrl.includes('youtu.be') ? formData.youtubeUrl.replace('youtu.be/', 'www.youtube.com/embed/') : formData.youtubeUrl)}
                className="w-full h-48"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Thumbnail (optional) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Thumbnail (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full p-2 border rounded"
          />
          {formData.thumbnailPreview && (
            <img src={formData.thumbnailPreview} alt="Thumbnail preview" className="mt-2 max-w-full h-32 object-contain rounded-md" />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Breaking News' : 'Add Breaking News')}
        </button>

        {message && (
          <div className="mt-4 text-sm text-green-600">
            {message}
          </div>
        )}
      </form>

      {/* Breaking News List */}
      <div className="bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold p-4 border-b">Current Breaking News</h3>
        <div className="divide-y">
          {breakingNews.map((news) => (
            <div key={news.id} className="p-4">
              <h4 className="font-bold">{news.headline}</h4>
              <p className="text-gray-600 mt-1">{news.shortDescription}</p>
              <div className="mt-3 space-x-3">
                <button
                  onClick={() => handleView(news)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  View News
                </button>
                <button
                  onClick={() => handleView(news)}
                  className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                >
                  Read More
                </button>
                <button
                  onClick={() => handleEdit(news)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(news.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {breakingNews.length === 0 && (
            <p className="p-4 text-gray-500">No breaking news available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
