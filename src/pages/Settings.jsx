import React, { useState } from 'react'
import { Save, Globe, Bell, Shield, Palette, Database, X, Check, AlertCircle } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Times Now India 27*7',
    siteDescription: 'India\'s most trusted news channel',
    siteUrl: 'https://timesnowindia.com',
    adminEmail: 'admin@timesnowindia.com',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12'
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newsAlerts: true,
    userActivity: false,
    systemUpdates: true,
    emailFrequency: 'daily'
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    ipWhitelist: '',
    auditLogging: true
  })

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#dc2626',
    sidebarCollapsed: false,
    compactMode: false,
    showAnimations: true
  })

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    backupFrequency: 'daily',
    maxUploadSize: 10,
    allowedFileTypes: 'jpg,jpeg,png,gif,pdf,doc,docx'
  })

  const handleSave = (settingsType) => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    
    // Here you would typically save to backend
    console.log(`${settingsType} settings saved:`, {
      general: generalSettings,
      notification: notificationSettings,
      security: securitySettings,
      appearance: appearanceSettings,
      system: systemSettings
    })
  }

  const handleGeneralChange = (field, value) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }))
  }

  const handleAppearanceChange = (field, value) => {
    setAppearanceSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }))
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name *
          </label>
          <input
            type="text"
            required
            value={generalSettings.siteName}
            onChange={(e) => handleGeneralChange('siteName', e.target.value)}
            className="admin-input"
            placeholder="Enter site name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site URL *
          </label>
          <input
            type="url"
            required
            value={generalSettings.siteUrl}
            onChange={(e) => handleGeneralChange('siteUrl', e.target.value)}
            className="admin-input"
            placeholder="https://example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Email *
          </label>
          <input
            type="email"
            required
            value={generalSettings.adminEmail}
            onChange={(e) => handleGeneralChange('adminEmail', e.target.value)}
            className="admin-input"
            placeholder="admin@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone *
          </label>
          <select
            required
            value={generalSettings.timezone}
            onChange={(e) => handleGeneralChange('timezone', e.target.value)}
            className="admin-select"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="Asia/Delhi">Asia/Delhi</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select
            value={generalSettings.dateFormat}
            onChange={(e) => handleGeneralChange('dateFormat', e.target.value)}
            className="admin-select"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Format
          </label>
          <select
            value={generalSettings.timeFormat}
            onChange={(e) => handleGeneralChange('timeFormat', e.target.value)}
            className="admin-select"
          >
            <option value="12">12-hour</option>
            <option value="24">24-hour</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          rows={3}
          value={generalSettings.siteDescription}
          onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
          className="admin-textarea"
          placeholder="Enter site description..."
        />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('general')}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save General Settings</span>
        </button>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Email Notifications</h4>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notificationSettings.emailNotifications}
              onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Enable email notifications</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notificationSettings.newsAlerts}
              onChange={(e) => handleNotificationChange('newsAlerts', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">News alerts</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notificationSettings.userActivity}
              onChange={(e) => handleNotificationChange('userActivity', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">User activity reports</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notificationSettings.systemUpdates}
              onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">System updates</span>
          </label>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Notification Preferences</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Frequency
            </label>
            <select
              value={notificationSettings.emailFrequency}
              onChange={(e) => handleNotificationChange('emailFrequency', e.target.value)}
              className="admin-select"
            >
              <option value="immediate">Immediate</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notificationSettings.pushNotifications}
              onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Enable push notifications</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('notification')}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save Notification Settings</span>
        </button>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Authentication</h4>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorAuth}
              onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Enable two-factor authentication</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="480"
              value={securitySettings.sessionTimeout}
              onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
              className="admin-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              min="3"
              max="10"
              value={securitySettings.maxLoginAttempts}
              onChange={(e) => handleSecurityChange('maxLoginAttempts', parseInt(e.target.value))}
              className="admin-input"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Security Policies</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Expiry (days)
            </label>
            <input
              type="number"
              min="30"
              max="365"
              value={securitySettings.passwordExpiry}
              onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
              className="admin-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Whitelist (optional)
            </label>
            <textarea
              rows={3}
              value={securitySettings.ipWhitelist}
              onChange={(e) => handleSecurityChange('ipWhitelist', e.target.value)}
              className="admin-textarea"
              placeholder="Enter IP addresses (one per line)"
            />
          </div>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={securitySettings.auditLogging}
              onChange={(e) => handleSecurityChange('auditLogging', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Enable audit logging</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('security')}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save Security Settings</span>
        </button>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Theme & Colors</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={appearanceSettings.theme}
              onChange={(e) => handleAppearanceChange('theme', e.target.value)}
              className="admin-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={appearanceSettings.primaryColor}
                onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
                className="w-12 h-10 rounded border border-gray-300"
              />
              <input
                type="text"
                value={appearanceSettings.primaryColor}
                onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
                className="admin-input flex-1"
                placeholder="#dc2626"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Interface Options</h4>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={appearanceSettings.sidebarCollapsed}
              onChange={(e) => handleAppearanceChange('sidebarCollapsed', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Start with collapsed sidebar</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={appearanceSettings.compactMode}
              onChange={(e) => handleAppearanceChange('compactMode', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Compact mode</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={appearanceSettings.showAnimations}
              onChange={(e) => handleAppearanceChange('showAnimations', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Show animations</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('appearance')}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save Appearance Settings</span>
        </button>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">System Options</h4>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={systemSettings.maintenanceMode}
              onChange={(e) => handleSystemChange('maintenanceMode', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Maintenance mode</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={systemSettings.debugMode}
              onChange={(e) => handleSystemChange('debugMode', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Debug mode</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={systemSettings.cacheEnabled}
              onChange={(e) => handleSystemChange('cacheEnabled', e.target.checked)}
              className="rounded border-gray-300 text-timesnow-red focus:ring-timesnow-red"
            />
            <span className="text-sm text-gray-700">Enable caching</span>
          </label>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">File Upload</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Upload Size (MB)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={systemSettings.maxUploadSize}
              onChange={(e) => handleSystemChange('maxUploadSize', parseInt(e.target.value))}
              className="admin-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed File Types
            </label>
            <input
              type="text"
              value={systemSettings.allowedFileTypes}
              onChange={(e) => handleSystemChange('allowedFileTypes', e.target.value)}
              className="admin-input"
              placeholder="jpg,jpeg,png,gif,pdf"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Frequency
            </label>
            <select
              value={systemSettings.backupFrequency}
              onChange={(e) => handleSystemChange('backupFrequency', e.target.value)}
              className="admin-select"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('system')}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Save size={20} />
          <span>Save System Settings</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure system settings and preferences</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="admin-card bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <Check size={20} className="text-green-600" />
            <span className="text-green-800 font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}

      {/* Settings Tabs */}
      <div className="admin-card">
        <div className="flex space-x-1">
          {[
            { id: 'general', label: 'General', icon: Globe },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'system', label: 'System', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-timesnow-red text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="admin-card">
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'security' && renderSecuritySettings()}
        {activeTab === 'appearance' && renderAppearanceSettings()}
        {activeTab === 'system' && renderSystemSettings()}
      </div>
    </div>
  )
}

export default Settings
