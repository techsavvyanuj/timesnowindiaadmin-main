import React, { useEffect, useState } from 'react';
import { createApiUrl, endpoints } from '../utils/api';

export default function PostersManagement() {
  const [posters, setPosters] = useState([
    { id: 1, title: '', image: '', imageFile: null, imagePreview: '', link: '' },
    { id: 2, title: '', image: '', imageFile: null, imagePreview: '', link: '' },
    { id: 3, title: '', image: '', imageFile: null, imagePreview: '', link: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      const response = await fetch(createApiUrl(endpoints.posters.list));
      if (!response.ok) throw new Error('Failed to fetch posters');
      const data = await response.json();
      setPosters(data.map(poster => ({
        ...poster,
        imageFile: null,
        imagePreview: poster.image
      })));
    } catch (error) {
      setError('Error fetching posters');
    }
  };

  const handleChange = (idx, field, value) => {
    const updated = posters.map((p, i) => i === idx ? { ...p, [field]: value } : p);
    setPosters(updated);
  };

  const handleFileChange = (idx, file) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      const updated = posters.map((p, i) => 
        i === idx ? { ...p, imageFile: file, imagePreview: preview, image: '' } : p
      );
      setPosters(updated);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    
    try {
      const formData = new FormData();
      
      // Append each poster's data
      posters.forEach((poster, index) => {
        // Add 1 to index since the backend expects 1-based indices
        const i = index + 1;
        formData.append(`poster${i}Title`, poster.title || '');
        formData.append(`poster${i}Link`, poster.link || '');
        
        if (poster.imageFile) {
          // Append with index to handle multiple files correctly
          formData.append(`posterImage${i}`, poster.imageFile);
        } else if (poster.image) {
          formData.append(`poster${i}ImageUrl`, poster.image);
        }
      });

      const response = await fetch(createApiUrl(endpoints.posters.update), {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update posters');
      
      const updatedData = await response.json();
      setMessage('Posters updated successfully!');
      await fetchPosters(); // Refresh the list
    } catch (error) {
      setError(error.message || 'Error updating posters');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Hero Posters</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {posters.map((poster, idx) => (
        <div key={poster.id} className="mb-6 border p-4 rounded-lg bg-white shadow-sm">
          <div className="mb-4 font-semibold text-lg">Poster {idx + 1}</div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter poster title"
              value={poster.title}
              onChange={e => handleChange(idx, 'title', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={poster.image}
              onChange={e => handleChange(idx, 'image', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div className="mt-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Or Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={e => handleFileChange(idx, e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>

            {(poster.imagePreview || poster.image) && (
              <div className="mt-2">
                <img
                  src={poster.imagePreview || poster.image}
                  alt={`Preview ${idx + 1}`}
                  className="max-h-40 object-contain rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Link URL
            </label>
            <input
              type="text"
              placeholder="Enter link URL (optional)"
              value={poster.link}
              onChange={e => handleChange(idx, 'link', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ))}

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? 'Saving...' : 'Save Posters'}
        </button>

        {message && (
          <div className="text-green-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
