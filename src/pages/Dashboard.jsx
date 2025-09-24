import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, 
  FolderOpen, 
  Image, 
  Video, 
  TrendingUp, 
  Users,
  Eye,
  ThumbsUp,
  MessageCircle,
  Settings
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const navigate = useNavigate()
  
  // State for real data
  const [dashboardData, setDashboardData] = useState({
    totalNews: 0,
    totalCategories: 0,
    totalPhotos: 0,
    totalVideos: 0,
    categories: [],
    news: [],
    breakingNews: [],
    featuredStories: []
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  // API base URL - use localhost in development, production URL in deployment
  const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:4000/api' 
  : 'https://api.timesnowindia24.live/api'

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData()
    
    // Set up auto-refresh for recent activity every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData()
    }, 30000) // 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch news data
      const newsRes = await fetch(`${API_BASE}/news`)
      const newsData = newsRes.ok ? await newsRes.json() : []
      
      // Fetch breaking news data
      const breakingRes = await fetch(`${API_BASE}/breaking-news`)
      const breakingData = breakingRes.ok ? await breakingRes.json() : []
      
      // Fetch featured stories data
      const featuredRes = await fetch(`${API_BASE}/featured-stories`)
      const featuredData = featuredRes.ok ? await featuredRes.json() : []
      
      // Calculate statistics
      const allNews = Array.isArray(newsData) ? newsData : []
      const allBreaking = Array.isArray(breakingData) ? breakingData : []
      const allFeatured = Array.isArray(featuredData) ? featuredData : []
      
      // Get unique categories from all content types
      const allCategories = [...allNews, ...allBreaking, ...allFeatured]
        .map(item => item.category)
        .filter(Boolean)
        .filter((category, index, arr) => arr.indexOf(category) === index)
      
      // Count photos (news with images, breaking news with thumbnails, featured stories with images)
      const photosCount = allNews.filter(item => item.imageUrl).length + 
                         allBreaking.filter(item => item.thumbnail).length +
                         allFeatured.filter(item => item.imageUrl).length
      
      // Count videos (breaking news with videos or YouTube URLs)
      const videosCount = allBreaking.filter(item => item.videoUrl || item.youtubeUrl).length
      
      setDashboardData({
        totalNews: allNews.length,
        totalCategories: allCategories.length,
        totalPhotos: photosCount,
        totalVideos: videosCount,
        categories: allCategories,
        news: allNews,
        breakingNews: allBreaking,
        featuredStories: allFeatured
      })

      // Generate and set recent activity
      const activitiesRes = await fetch(`${API_BASE}/activities`)
      let activities = []
      if (activitiesRes.ok) {
        const backendActivities = await activitiesRes.json()
        activities = backendActivities.slice(0, 6).map(activity => ({
          id: activity.id,
          type: activity.type,
          title: activity.title,
          time: getTimeAgo(activity.timestamp),
          user: activity.user,
          status: activity.status
        }))
      }
      
      // If no backend activities, generate from news data
      if (activities.length === 0) {
        activities = generateRecentActivity(allNews)
      }
      
      setRecentActivity(activities)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle stat card clicks (only for articles and categories)
  const handleStatClick = (statType) => {
    switch (statType) {
      case 'articles':
        navigate('/news')
        break
      case 'categories':
        navigate('/news')
        break
      // Photos and videos are not clickable
      default:
        break
    }
  }

  // Quick Actions navigation handlers
  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-news':
        navigate('/breaking-news')
        break
      case 'upload-media':
        navigate('/posters')
        break
      case 'manage-users':
        navigate('/users')
        break
      case 'settings':
        navigate('/settings')
        break
      default:
        break
    }
  }

  // Activity click handler
  const handleActivityClick = (activity) => {
    switch (activity.type) {
      case 'news':
        navigate('/news')
        break
      case 'featured-story':
        navigate('/featured-stories')
        break
      case 'media':
        navigate('/posters')
        break
      case 'category':
        navigate('/news')
        break
      case 'user':
        navigate('/users')
        break
      default:
        break
    }
  }

  // Demo data for charts
  const viewsData = [
    { name: 'Mon', views: 2400, engagement: 1800 },
    { name: 'Tue', views: 1398, engagement: 2210 },
    { name: 'Wed', views: 9800, engagement: 2290 },
    { name: 'Thu', views: 3908, engagement: 2000 },
    { name: 'Fri', views: 4800, engagement: 2181 },
    { name: 'Sat', views: 3800, engagement: 2500 },
    { name: 'Sun', views: 4300, engagement: 2100 },
  ]

  // Dynamic category data based on real data
  const categoryData = dashboardData.categories.slice(0, 5).map((category, index) => {
    const colors = ['#dc2626', '#059669', '#2563eb', '#7c3aed', '#ea580c']
    const newsCount = [...dashboardData.news, ...dashboardData.breakingNews, ...dashboardData.featuredStories]
      .filter(item => item.category === category).length
    
    return {
      name: category,
      value: newsCount,
      color: colors[index] || '#6b7280'
    }
  }).filter(item => item.value > 0)

  // Generate recent activity from news data
  const generateRecentActivity = (newsData) => {
    const activities = []
    
    // Sort news by timestamp (most recent first)
    const sortedNews = [...newsData].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    ).slice(0, 5) // Get last 5 articles
    
    sortedNews.forEach((article, index) => {
      const timeAgo = getTimeAgo(article.timestamp)
      
      activities.push({
        id: article.id,
        type: 'news',
        title: `New article published: "${article.title.substring(0, 50)}${article.title.length > 50 ? '...' : ''}"`,
        time: timeAgo,
        user: 'Admin User',
        status: 'published'
      })
    })

    // Add some category activities based on unique categories
    const uniqueCategories = [...new Set(newsData.map(item => item.category))].slice(0, 2)
    uniqueCategories.forEach((category, index) => {
      if (category) {
        activities.push({
          id: `cat-${index}`,
          type: 'category',
          title: `Category "${category}" has ${newsData.filter(n => n.category === category).length} articles`,
          time: getRandomTimeAgo(),
          user: 'Admin User',
          status: 'active'
        })
      }
    })

    return activities.slice(0, 6) // Limit to 6 activities
  }

  // Helper function to get time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInMinutes = Math.floor((now - past) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  // Helper function for random time ago for category activities
  const getRandomTimeAgo = () => {
    const times = ['30 minutes ago', '1 hour ago', '2 hours ago', '3 hours ago', '1 day ago']
    return times[Math.floor(Math.random() * times.length)]
  }

  // Dynamic stats based on real data
  const stats = [
    {
      title: 'Total Articles',
      value: loading ? '...' : dashboardData.totalNews.toString(),
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500',
      type: 'articles'
    },
    {
      title: 'Categories',
      value: loading ? '...' : dashboardData.totalCategories.toString(),
      change: '+3%',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'bg-green-500',
      type: 'categories'
    },
    {
      title: 'Photos',
      value: loading ? '...' : dashboardData.totalPhotos.toString(),
      change: '+8%',
      changeType: 'positive',
      icon: Image,
      color: 'bg-purple-500',
      type: 'photos'
    },
    {
      title: 'Videos',
      value: loading ? '...' : dashboardData.totalVideos.toString(),
      change: '+15%',
      changeType: 'positive',
      icon: Video,
      color: 'bg-orange-500',
      type: 'videos'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100'
      case 'updated':
        return 'text-blue-600 bg-blue-100'
      case 'deleted':
        return 'text-red-600 bg-red-100'
      case 'uploaded':
        return 'text-blue-600 bg-blue-100'
      case 'created':
        return 'text-purple-600 bg-purple-100'
      case 'registered':
        return 'text-orange-600 bg-orange-100'
      case 'active':
        return 'text-emerald-600 bg-emerald-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (type) => {
    switch (type) {
      case 'news':
        return <FileText size={16} />
      case 'media':
        return <Image size={16} />
      case 'category':
        return <FolderOpen size={16} />
      case 'user':
        return <Users size={16} />
      default:
        return <FileText size={16} />
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Welcome back! Here's what's happening with your news portal today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const isClickable = stat.type === 'articles' || stat.type === 'categories'
            return (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 transition-all duration-200 ${
                  isClickable 
                    ? 'cursor-pointer hover:shadow-md transform hover:-translate-y-1' 
                    : 'cursor-default'
                }`}
                onClick={isClickable ? () => handleStatClick(stat.type) : undefined}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">from last month</span>
                </div>
                {isClickable && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-400">Click to view details</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Views Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Weekly Views & Engagement</h3>
              <p className="text-sm sm:text-base text-gray-600">Performance metrics for the last 7 days</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#dc2626" strokeWidth={2} />
                  <Line type="monotone" dataKey="engagement" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Content Distribution</h3>
              <p className="text-sm sm:text-base text-gray-600">Articles by category</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-sm sm:text-base text-gray-600">Latest updates and actions</p>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getStatusIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-sm sm:text-base text-gray-600">Common tasks and shortcuts</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <button 
              onClick={() => handleQuickAction('add-news')}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText size={20} className="text-timesnow-red" />
              <span className="text-sm font-medium text-center">Add News</span>
            </button>
            <button 
              onClick={() => handleQuickAction('upload-media')}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Image size={20} className="text-timesnow-red" />
              <span className="text-sm font-medium text-center">Upload Media</span>
            </button>
            <button 
              onClick={() => handleQuickAction('manage-users')}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users size={20} className="text-timesnow-red" />
              <span className="text-sm font-medium text-center">Manage Users</span>
            </button>
            <button 
              onClick={() => handleQuickAction('settings')}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings size={20} className="text-timesnow-red" />
              <span className="text-sm font-medium text-center">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
