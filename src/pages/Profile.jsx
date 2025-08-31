import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Shield, Award, FileText } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Mr. Shubham Meena',
    email: 'reporter@timesnowindia.com',
    phone: '+91 9926890112',
    address: 'Harangaon Tehsil, Khategaon District, Dewas, Madhya Pradesh 455336',
    role: 'Reporter',
    department: 'News & Editorial',
    joinDate: '2023-01-15',
    bio: 'Experienced news reporter with expertise in political and social news coverage. Dedicated to bringing accurate and timely news to the public.',
    specialization: 'Political News, Social Issues, Local Coverage',
    achievements: [
      'Best Reporter Award 2023',
      'Covered 50+ major political events',
      'Published 200+ news articles',
      'Special coverage of Madhya Pradesh elections'
    ],
    socialMedia: {
      twitter: '@shubham_meena',
      linkedin: 'shubham-meena-reporter',
      instagram: 'shubham_meena_news'
    }
  })

  const [editForm, setEditForm] = useState({ ...profileData })

  const handleEdit = () => {
    setEditForm({ ...profileData })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm({ ...profileData })
  }

  const handleSave = () => {
    setProfileData({ ...editForm })
    setIsEditing(false)
    console.log('Profile updated:', editForm)
  }

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialMediaChange = (platform, value) => {
    setEditForm(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your profile information and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="admin-btn-primary flex items-center space-x-2"
          >
            <Edit size={20} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="admin-btn-secondary flex items-center space-x-2"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="admin-btn-primary flex items-center space-x-2"
            >
              <Save size={20} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="admin-card">
            <div className="text-center">
              {/* Profile Picture */}
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-timesnow-red rounded-full flex items-center justify-center mx-auto">
                  <User size={64} className="text-white" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Camera size={20} className="text-gray-600" />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="admin-input text-center text-xl font-bold"
                  />
                ) : (
                  profileData.name
                )}
              </h2>

              <p className="text-gray-600 mb-1">
                {isEditing ? (
                  <select
                    value={editForm.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="admin-select text-center"
                  >
                    <option value="Reporter">Reporter</option>
                    <option value="Editor">Editor</option>
                    <option value="Senior Reporter">Senior Reporter</option>
                    <option value="News Anchor">News Anchor</option>
                  </select>
                ) : (
                  profileData.role
                )}
              </p>

              <p className="text-gray-500 text-sm mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="admin-input text-center text-sm"
                  />
                ) : (
                  profileData.department
                )}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="admin-input text-sm"
                      />
                    ) : (
                      profileData.email
                    )}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="admin-input text-sm"
                      />
                    ) : (
                      profileData.phone
                    )}
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    {isEditing ? (
                      <textarea
                        value={editForm.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="admin-textarea text-sm"
                        rows={3}
                      />
                    ) : (
                      profileData.address
                    )}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Joined: {profileData.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Section */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <FileText size={20} />
              <span>Biography</span>
            </h3>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="admin-textarea"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          {/* Specialization */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Award size={20} />
              <span>Specialization</span>
            </h3>
            {isEditing ? (
              <input
                type="text"
                value={editForm.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
                className="admin-input"
                placeholder="Your areas of expertise..."
              />
            ) : (
              <p className="text-gray-700">{profileData.specialization}</p>
            )}
          </div>

          {/* Achievements */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Award size={20} />
              <span>Key Achievements</span>
            </h3>
            {isEditing ? (
              <div className="space-y-2">
                {editForm.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => {
                        const newAchievements = [...editForm.achievements]
                        newAchievements[index] = e.target.value
                        handleInputChange('achievements', newAchievements)
                      }}
                      className="admin-input flex-1"
                      placeholder="Achievement..."
                    />
                    <button
                      onClick={() => {
                        const newAchievements = editForm.achievements.filter((_, i) => i !== index)
                        handleInputChange('achievements', newAchievements)
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newAchievements = [...editForm.achievements, '']
                    handleInputChange('achievements', newAchievements)
                  }}
                  className="admin-btn-secondary text-sm"
                >
                  + Add Achievement
                </button>
              </div>
            ) : (
              <ul className="space-y-2">
                {profileData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-timesnow-red rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Social Media */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <User size={20} />
              <span>Social Media</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.socialMedia.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    className="admin-input"
                    placeholder="@username"
                  />
                ) : (
                  <p className="text-gray-700">{profileData.socialMedia.twitter}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.socialMedia.linkedin}
                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                    className="admin-input"
                    placeholder="profile-url"
                  />
                ) : (
                  <p className="text-gray-700">{profileData.socialMedia.linkedin}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.socialMedia.instagram}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    className="admin-input"
                    placeholder="username"
                  />
                ) : (
                  <p className="text-gray-700">{profileData.socialMedia.instagram}</p>
                )}
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Shield size={20} />
              <span>Security & Privacy</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <button className="admin-btn-secondary">Enable 2FA</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-600">Update your password regularly</p>
                </div>
                <button className="admin-btn-secondary">Change Password</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                  <p className="text-sm text-gray-600">Control who can see your profile information</p>
                </div>
                <button className="admin-btn-secondary">Manage Privacy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
