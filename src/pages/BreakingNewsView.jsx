import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BreakingNewsView() {
  const location = useLocation();
  const navigate = useNavigate();
  const newsItem = location.state;

  if (!newsItem) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          News item not found.
        </div>
        <button
          onClick={() => navigate('/breaking-news')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Breaking News
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">{newsItem.headline}</h1>
          <p className="text-gray-600 mt-2">{newsItem.shortDescription}</p>
        </div>

        {/* Video Player */}
        <div className="aspect-w-16 aspect-h-9">
          <video
            className="w-full h-auto"
            controls
            src={newsItem.videoUrl}
            poster={newsItem.thumbnailUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Full Description */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Full Story</h2>
          <div className="prose max-w-none">
            {newsItem.fullDescription}
          </div>
        </div>

        {/* Back Button */}
        <div className="p-4 border-t">
          <button
            onClick={() => navigate('/breaking-news')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Breaking News
          </button>
        </div>
      </div>
    </div>
  );
}
