import React from 'react'
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

  const categoryData = [
    { name: 'Politics', value: 35, color: '#dc2626' },
    { name: 'Business', value: 25, color: '#059669' },
    { name: 'Sports', value: 20, color: '#2563eb' },
    { name: 'Entertainment', value: 15, color: '#7c3aed' },
    { name: 'Technology', value: 5, color: '#ea580c' },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'news',
      title: 'New article published: "Big Update in Bollywood"',
      time: '2 minutes ago',
      user: 'Admin User',
      status: 'published'
    },
    {
      id: 2,
      type: 'media',
      title: '5 new images uploaded to Media Library',
      time: '15 minutes ago',
      user: 'Admin User',
      status: 'uploaded'
    },
    {
      id: 3,
      type: 'category',
      title: 'New category created: "Lifestyle"',
      time: '1 hour ago',
      user: 'Admin User',
      status: 'created'
    },
    {
      id: 4,
      type: 'user',
      title: 'New admin user registered: "John Doe"',
      time: '2 hours ago',
      user: 'System',
      status: 'registered'
    }
  ]

  const stats = [
    {
      title: 'Total Articles',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Categories',
      value: '45',
      change: '+3%',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Photos',
      value: '8,567',
      change: '+8%',
      changeType: 'positive',
      icon: Image,
      color: 'bg-purple-500'
    },
    {
      title: 'Videos',
      value: '234',
      change: '+15%',
      changeType: 'positive',
      icon: Video,
      color: 'bg-orange-500'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100'
      case 'uploaded':
        return 'text-blue-600 bg-blue-100'
      case 'created':
        return 'text-purple-600 bg-purple-100'
      case 'registered':
        return 'text-orange-600 bg-orange-100'
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
    <div className="admin-mobile-container-fluid admin-mobile-section">
      <div className="admin-mobile-container-lg">
        {/* Page Header */}
        <div className="admin-mobile-mb">
          <h1 className="admin-mobile-text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="admin-mobile-text-base text-gray-600 mt-2">
            Welcome back! Here's what's happening with your news portal today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="admin-mobile-card-grid admin-mobile-mb">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="admin-card">
                <div className="admin-mobile-flex-between">
                  <div>
                    <p className="admin-mobile-text-sm text-gray-600">{stat.title}</p>
                    <p className="admin-mobile-text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="admin-mobile-flex-center admin-mobile-gap mt-4">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="admin-mobile-text-sm text-gray-500">from last month</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="admin-mobile-grid-2 admin-mobile-gap admin-mobile-mb">
          {/* Views Chart */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Weekly Views & Engagement</h3>
              <p className="admin-card-subtitle">Performance metrics for the last 7 days</p>
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
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Content Distribution</h3>
              <p className="admin-card-subtitle">Articles by category</p>
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
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Activity</h3>
            <p className="admin-card-subtitle">Latest updates and actions</p>
          </div>
          <div className="admin-mobile-card-stack">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="admin-mobile-flex-between admin-mobile-p border-b border-gray-100 last:border-b-0">
                <div className="admin-mobile-flex-center admin-mobile-gap">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getStatusIcon(activity.type)}
                  </div>
                  <div>
                    <p className="admin-mobile-text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="admin-mobile-text-sm text-gray-500">by {activity.user}</p>
                  </div>
                </div>
                <div className="admin-mobile-flex-center admin-mobile-gap">
                  <span className={`admin-mobile-text-sm px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                  <span className="admin-mobile-text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-card admin-mobile-mt">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Quick Actions</h3>
            <p className="admin-card-subtitle">Common tasks and shortcuts</p>
          </div>
          <div className="admin-mobile-grid-4 admin-mobile-gap">
            <button className="admin-mobile-flex-center admin-mobile-gap admin-mobile-p border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText size={20} className="text-timesnow-red" />
              <span className="admin-mobile-text-sm font-medium">Add News</span>
            </button>
            <button className="admin-mobile-flex-center admin-mobile-gap admin-mobile-p border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Image size={20} className="text-timesnow-red" />
              <span className="admin-mobile-text-sm font-medium">Upload Media</span>
            </button>
            <button className="admin-mobile-flex-center admin-mobile-gap admin-mobile-p border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users size={20} className="text-timesnow-red" />
              <span className="admin-mobile-text-sm font-medium">Manage Users</span>
            </button>
            <button className="admin-mobile-flex-center admin-mobile-gap admin-mobile-p border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings size={20} className="text-timesnow-red" />
              <span className="admin-mobile-text-sm font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
