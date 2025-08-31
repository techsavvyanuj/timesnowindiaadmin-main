import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Activity, Fuel, Coins, Star, X, MapPin, Calendar } from 'lucide-react'

const ToolsManagement = () => {
  const [activeTab, setActiveTab] = useState('aqi')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // AQI Data
  const [aqiData, setAqiData] = useState([
    {
      id: 1,
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      aqi: 45,
      status: 'Good',
      pm25: 12,
      pm10: 25,
      lastUpdated: '2024-01-15 14:30'
    },
    {
      id: 2,
      city: 'Indore',
      state: 'Madhya Pradesh',
      aqi: 78,
      status: 'Moderate',
      pm25: 28,
      pm10: 45,
      lastUpdated: '2024-01-15 14:30'
    }
  ])

  // Fuel Prices Data
  const [fuelData, setFuelData] = useState([
    {
      id: 1,
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      petrol: 96.72,
      diesel: 89.62,
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      city: 'Indore',
      state: 'Madhya Pradesh',
      petrol: 96.72,
      diesel: 89.62,
      lastUpdated: '2024-01-15'
    }
  ])

  // Metal Rates Data
  const [metalData, setMetalData] = useState([
    {
      id: 1,
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      gold24k: 6250,
      gold22k: 5729,
      silver: 75.50,
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      city: 'Indore',
      state: 'Madhya Pradesh',
      gold24k: 6250,
      gold22k: 5729,
      silver: 75.50,
      lastUpdated: '2024-01-15'
    }
  ])

  // Horoscope Data
  const [horoscopeData, setHoroscopeData] = useState([
    {
      id: 1,
      sign: 'Aries',
      date: '2024-01-15',
      prediction: 'Today is a great day for new beginnings. Your energy is high and opportunities abound.',
      luckyNumber: 7,
      luckyColor: 'Red'
    },
    {
      id: 2,
      sign: 'Taurus',
      date: '2024-01-15',
      prediction: 'Focus on financial matters today. Your practical approach will lead to success.',
      luckyNumber: 4,
      luckyColor: 'Green'
    }
  ])

  const [formData, setFormData] = useState({
    city: '',
    state: '',
    aqi: '',
    status: 'Good',
    pm25: '',
    pm10: '',
    petrol: '',
    diesel: '',
    gold24k: '',
    gold22k: '',
    silver: '',
    sign: '',
    date: '',
    prediction: '',
    luckyNumber: '',
    luckyColor: ''
  })

  const handleAddItem = () => {
    setEditingItem(null)
    setFormData({
      city: '',
      state: '',
      aqi: '',
      status: 'Good',
      pm25: '',
      pm10: '',
      petrol: '',
      diesel: '',
      gold24k: '',
      gold22k: '',
      silver: '',
      sign: '',
      date: '',
      prediction: '',
      luckyNumber: '',
      luckyColor: ''
    })
    setShowAddModal(true)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setFormData({
      city: item.city || '',
      state: item.state || '',
      aqi: item.aqi || '',
      status: item.status || 'Good',
      pm25: item.pm25 || '',
      pm10: item.pm10 || '',
      petrol: item.petrol || '',
      diesel: item.diesel || '',
      gold24k: item.gold24k || '',
      gold22k: item.gold22k || '',
      silver: item.silver || '',
      sign: item.sign || '',
      date: item.date || '',
      prediction: item.prediction || '',
      luckyNumber: item.luckyNumber || '',
      luckyColor: item.luckyColor || ''
    })
    setShowAddModal(true)
  }

  const handleDeleteItem = (id, dataType) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (dataType) {
        case 'aqi':
          setAqiData(aqiData.filter(item => item.id !== id))
          break
        case 'fuel':
          setFuelData(fuelData.filter(item => item.id !== id))
          break
        case 'metal':
          setMetalData(metalData.filter(item => item.id !== id))
          break
        case 'horoscope':
          setHoroscopeData(horoscopeData.filter(item => item.id !== id))
          break
        default:
          break
      }
      console.log(`${dataType} item deleted:`, id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      lastUpdated: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString('en-US', { hour12: false })
    }

    if (editingItem) {
      // Update existing item
      switch (activeTab) {
        case 'aqi':
          const updatedAqi = aqiData.map(item => 
            item.id === editingItem.id 
              ? { ...item, ...formData, lastUpdated: newItem.lastUpdated }
              : item
          )
          setAqiData(updatedAqi)
          break
        case 'fuel':
          const updatedFuel = fuelData.map(item => 
            item.id === editingItem.id 
              ? { ...item, ...formData, lastUpdated: newItem.lastUpdated }
              : item
          )
          setFuelData(updatedFuel)
          break
        case 'metal':
          const updatedMetal = metalData.map(item => 
            item.id === editingItem.id 
              ? { ...item, ...formData, lastUpdated: newItem.lastUpdated }
              : item
          )
          setMetalData(updatedMetal)
          break
        case 'horoscope':
          const updatedHoroscope = horoscopeData.map(item => 
            item.id === editingItem.id 
              ? { ...item, ...formData, lastUpdated: newItem.lastUpdated }
              : item
          )
          setHoroscopeData(updatedHoroscope)
          break
        default:
          break
      }
      console.log(`${activeTab} item updated:`, { id: editingItem.id, ...formData })
    } else {
      // Add new item
      switch (activeTab) {
        case 'aqi':
          const newAqiItem = {
            ...newItem,
            city: formData.city,
            state: formData.state,
            aqi: parseInt(formData.aqi),
            status: formData.status,
            pm25: parseInt(formData.pm25),
            pm10: parseInt(formData.pm10)
          }
          setAqiData([...aqiData, newAqiItem])
          break
        case 'fuel':
          const newFuelItem = {
            ...newItem,
            city: formData.city,
            state: formData.state,
            petrol: parseFloat(formData.petrol),
            diesel: parseFloat(formData.diesel)
          }
          setFuelData([...fuelData, newFuelItem])
          break
        case 'metal':
          const newMetalItem = {
            ...newItem,
            city: formData.city,
            state: formData.state,
            gold24k: parseFloat(formData.gold24k),
            gold22k: parseFloat(formData.gold22k),
            silver: parseFloat(formData.silver)
          }
          setMetalData([...metalData, newMetalItem])
          break
        case 'horoscope':
          const newHoroscopeItem = {
            ...newItem,
            sign: formData.sign,
            date: formData.date,
            prediction: formData.prediction,
            luckyNumber: parseInt(formData.luckyNumber),
            luckyColor: formData.luckyColor
          }
          setHoroscopeData([...horoscopeData, newHoroscopeItem])
          break
        default:
          break
      }
      console.log(`New ${activeTab} item added:`, newItem)
    }

    setShowAddModal(false)
    setEditingItem(null)
    setFormData({
      city: '',
      state: '',
      aqi: '',
      status: 'Good',
      pm25: '',
      pm10: '',
      petrol: '',
      diesel: '',
      gold24k: '',
      gold22k: '',
      silver: '',
      sign: '',
      date: '',
      prediction: '',
      luckyNumber: '',
      luckyColor: ''
    })
  }

  const getAqiStatusColor = (aqi) => {
    if (aqi <= 50) return 'bg-green-100 text-green-800'
    if (aqi <= 100) return 'bg-yellow-100 text-yellow-800'
    if (aqi <= 150) return 'bg-orange-100 text-orange-800'
    if (aqi <= 200) return 'bg-red-100 text-red-800'
    if (aqi <= 300) return 'bg-purple-100 text-purple-800'
    return 'bg-red-200 text-red-900'
  }

  const renderAqiData = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Air Quality Index Data</h3>
        <button
          onClick={handleAddItem}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add City</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aqiData.map((item) => (
          <div key={item.id} className="admin-card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{item.city}</h4>
                <p className="text-sm text-gray-600">{item.state}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, 'aqi')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">AQI:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAqiStatusColor(item.aqi)}`}>
                  {item.aqi} - {item.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">PM2.5: {item.pm25} µg/m³</span>
                <span className="text-gray-600">PM10: {item.pm10} µg/m³</span>
              </div>
              <div className="text-xs text-gray-500">
                Updated: {item.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderFuelData = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Fuel Prices Data</h3>
        <button
          onClick={handleAddItem}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add City</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fuelData.map((item) => (
          <div key={item.id} className="admin-card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{item.city}</h4>
                <p className="text-sm text-gray-600">{item.state}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, 'fuel')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Petrol:</span>
                <span className="font-medium">₹{item.petrol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Diesel:</span>
                <span className="font-medium">₹{item.diesel}</span>
              </div>
              <div className="text-xs text-gray-500">
                Updated: {item.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMetalData = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Metal Rates Data</h3>
        <button
          onClick={handleAddItem}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add City</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metalData.map((item) => (
          <div key={item.id} className="admin-card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{item.city}</h4>
                <p className="text-sm text-gray-600">{item.state}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, 'metal')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gold 24K:</span>
                <span className="font-medium">₹{item.gold24k}/g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gold 22K:</span>
                <span className="font-medium">₹{item.gold22k}/g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Silver:</span>
                <span className="font-medium">₹{item.silver}/g</span>
              </div>
              <div className="text-xs text-gray-500">
                Updated: {item.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderHoroscopeData = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Horoscope Data</h3>
        <button
          onClick={handleAddItem}
          className="admin-btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Horoscope</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {horoscopeData.map((item) => (
          <div key={item.id} className="admin-card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{item.sign}</h4>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id, 'horoscope')}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-700 line-clamp-3">{item.prediction}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lucky Number:</span>
                <span className="font-medium">{item.luckyNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lucky Color:</span>
                <span className="font-medium">{item.luckyColor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderForm = () => {
    switch (activeTab) {
      case 'aqi':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="admin-input"
                placeholder="Enter city name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="admin-input"
                placeholder="Enter state name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AQI *</label>
              <input
                type="number"
                required
                value={formData.aqi}
                onChange={(e) => setFormData({ ...formData, aqi: e.target.value })}
                className="admin-input"
                placeholder="Enter AQI value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="admin-select"
              >
                <option value="Good">Good</option>
                <option value="Moderate">Moderate</option>
                <option value="Unhealthy for Sensitive Groups">Unhealthy for Sensitive Groups</option>
                <option value="Unhealthy">Unhealthy</option>
                <option value="Very Unhealthy">Very Unhealthy</option>
                <option value="Hazardous">Hazardous</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PM2.5 *</label>
              <input
                type="number"
                required
                value={formData.pm25}
                onChange={(e) => setFormData({ ...formData, pm25: e.target.value })}
                className="admin-input"
                placeholder="Enter PM2.5 value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PM10 *</label>
              <input
                type="number"
                required
                value={formData.pm10}
                onChange={(e) => setFormData({ ...formData, pm10: e.target.value })}
                className="admin-input"
                placeholder="Enter PM10 value"
              />
            </div>
          </div>
        )
      
      case 'fuel':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="admin-input"
                placeholder="Enter city name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="admin-input"
                placeholder="Enter state name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Petrol Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.petrol}
                onChange={(e) => setFormData({ ...formData, petrol: e.target.value })}
                className="admin-input"
                placeholder="Enter petrol price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diesel Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.diesel}
                onChange={(e) => setFormData({ ...formData, diesel: e.target.value })}
                className="admin-input"
                placeholder="Enter diesel price"
              />
            </div>
          </div>
        )
      
      case 'metal':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="admin-input"
                placeholder="Enter city name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="admin-input"
                placeholder="Enter state name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gold 24K (₹/g) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.gold24k}
                onChange={(e) => setFormData({ ...formData, gold24k: e.target.value })}
                className="admin-input"
                placeholder="Enter gold 24K price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gold 22K (₹/g) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.gold22k}
                onChange={(e) => setFormData({ ...formData, gold22k: e.target.value })}
                className="admin-input"
                placeholder="Enter gold 22K price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Silver (₹/g) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.silver}
                onChange={(e) => setFormData({ ...formData, silver: e.target.value })}
                className="admin-input"
                placeholder="Enter silver price"
              />
            </div>
          </div>
        )
      
      case 'horoscope':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zodiac Sign *</label>
              <select
                required
                value={formData.sign}
                onChange={(e) => setFormData({ ...formData, sign: e.target.value })}
                className="admin-select"
              >
                <option value="">Select sign</option>
                <option value="Aries">Aries</option>
                <option value="Taurus">Taurus</option>
                <option value="Gemini">Gemini</option>
                <option value="Cancer">Cancer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Sagittarius">Sagittarius</option>
                <option value="Capricorn">Capricorn</option>
                <option value="Aquarius">Aquarius</option>
                <option value="Pisces">Pisces</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prediction *</label>
              <textarea
                required
                rows={3}
                value={formData.prediction}
                onChange={(e) => setFormData({ ...formData, prediction: e.target.value })}
                className="admin-textarea"
                placeholder="Enter horoscope prediction..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lucky Number *</label>
              <input
                type="number"
                required
                value={formData.luckyNumber}
                onChange={(e) => setFormData({ ...formData, luckyNumber: e.target.value })}
                className="admin-input"
                placeholder="Enter lucky number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lucky Color *</label>
              <input
                type="text"
                required
                value={formData.luckyColor}
                onChange={(e) => setFormData({ ...formData, luckyColor: e.target.value })}
                className="admin-input"
                placeholder="Enter lucky color"
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tools Data Management</h1>
        <p className="text-gray-600">Manage data for utility tools and calculators</p>
      </div>

      {/* Tabs */}
      <div className="admin-card">
        <div className="flex space-x-1">
          {[
            { id: 'aqi', label: 'AQI Data', icon: Activity },
            { id: 'fuel', label: 'Fuel Prices', icon: Fuel },
            { id: 'metal', label: 'Metal Rates', icon: Coins },
            { id: 'horoscope', label: 'Horoscope', icon: Star }
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

      {/* Content */}
      <div className="admin-card">
        {activeTab === 'aqi' && renderAqiData()}
        {activeTab === 'fuel' && renderFuelData()}
        {activeTab === 'metal' && renderMetalData()}
        {activeTab === 'horoscope' && renderHoroscopeData()}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingItem ? 'Edit Item' : 'Add New Item'}
                  </h2>
                  <p className="text-gray-600">
                    {editingItem ? 'Update item information' : `Create a new ${activeTab} item`}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {renderForm()}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="admin-btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary w-full sm:w-auto"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolsManagement
