import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewsManagement from './pages/NewsManagement'
import ToolsManagement from './pages/ToolsManagement'
import AdsManagement from './pages/AdsManagement'
import UserManagement from './pages/UserManagement'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import PostersManagement from './pages/PostersManagement'
import BreakingNewsManagement from './pages/BreakingNewsManagement'
import BreakingNewsView from './pages/BreakingNewsView'
import FeaturedStoriesManagement from './pages/FeaturedStoriesManagement'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/posters" element={
        <ProtectedRoute>
          <AdminLayout>
            <PostersManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/breaking-news" element={
        <ProtectedRoute>
          <AdminLayout>
            <BreakingNewsManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/breaking-news/view" element={
        <ProtectedRoute>
          <AdminLayout>
            <BreakingNewsView />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/featured-stories" element={
        <ProtectedRoute>
          <AdminLayout>
            <FeaturedStoriesManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/news" element={
        <ProtectedRoute>
          <AdminLayout>
            <NewsManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/tools" element={
        <ProtectedRoute>
          <AdminLayout>
            <ToolsManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/ads" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdsManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/users" element={
        <ProtectedRoute>
          <AdminLayout>
            <UserManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/settings" element={
        <ProtectedRoute>
          <AdminLayout>
            <Settings />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <AdminLayout>
            <Profile />
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
