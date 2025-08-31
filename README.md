# Times Now India - Admin Panel

A comprehensive admin panel for managing the Times Now India news portal, built with React, Tailwind CSS, and Vite.

## 🚀 Features

### 🔐 Authentication & Security
- **Login System**: Secure admin authentication with email/password
- **Protected Routes**: All admin pages are protected and require authentication
- **Session Management**: Persistent login sessions with localStorage

### 📊 Dashboard
- **Quick Stats**: Total articles, categories, media, users, and more
- **Charts & Analytics**: Views and engagement metrics with Recharts
- **Recent Activity**: Latest actions and updates in the system
- **Performance Metrics**: Real-time data visualization

### 📰 Content Management
- **News Management**: Full CRUD operations for news articles
- **Category Management**: Organize content with custom categories
- **Media Library**: Upload and manage images and videos
- **Ticker/Carousel**: Manage breaking news and featured content

### 🛠️ Utility Tools Management
- **AQI Data**: Air Quality Index for major cities
- **Fuel Prices**: Petrol and diesel prices across India
- **Metal Rates**: Gold and silver rates by city
- **Horoscope**: Daily horoscope readings for all zodiac signs

### 📄 Static Content
- **About Us**: Company information and description
- **Privacy Policy**: Legal privacy information
- **Terms & Conditions**: User agreement terms
- **Careers**: Job opportunities and company culture

### 📢 Advertisement Management
- **Side Banners**: Right and left sidebar advertisements
- **Footer Ads**: Bottom page promotional content
- **Performance Tracking**: Click and impression analytics
- **Scheduling**: Start and end date management

### 👥 User Management
- **Admin Users**: Add, edit, and remove admin users
- **Role Management**: Super admin, editor, content manager, moderator
- **Access Control**: Different permission levels
- **Activity Tracking**: Last login and user statistics

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Clean, professional interface with smooth animations
- **Consistent Design**: Matches main site's color scheme and typography

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router DOM for navigation
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Authentication**: Custom auth system (ready for API integration)

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx      # Top navigation header
│   │   ├── Sidebar.jsx     # Left navigation sidebar
│   │   └── ...
│   ├── pages/              # Main page components
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── NewsManagement.jsx
│   │   ├── CategoryManagement.jsx
│   │   └── ...
│   ├── layouts/            # Layout components
│   │   └── AdminLayout.jsx # Main admin layout
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── ThemeContext.jsx # Dark mode toggle
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Navigate to admin directory**:
   ```bash
   cd admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   https://timesnowindiaadmin-main.vercel.app
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔑 Default Login Credentials

For demo purposes, use these credentials:
- **Email**: `admin@timesnowindia.com`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## 🎯 Key Features Implementation

### Authentication System
- Protected routes with React Router
- Persistent login sessions
- User role management
- Secure logout functionality

### Responsive Design
- Mobile-first approach
- Collapsible sidebar for mobile
- Touch-friendly interface
- Adaptive layouts for all screen sizes

### Data Management
- CRUD operations for all content types
- Search and filtering capabilities
- Bulk operations support
- Real-time updates

### Performance
- Lazy loading for components
- Optimized bundle size
- Fast development server with Vite
- Efficient state management

## 🔧 Customization

### Colors & Theme
The admin panel uses the same color scheme as the main site:
- Primary: `timesnow-red` (#dc2626)
- Dark: `timesnow-dark` (#1f2937)
- Light: `timesnow-light` (#f9fafb)

### Adding New Modules
1. Create new page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Sidebar.jsx`
4. Update breadcrumbs and navigation

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design patterns
- Maintain consistency with the design system
- Use the custom admin component classes

## 📱 Mobile Responsiveness

- **Sidebar**: Collapsible on mobile devices
- **Tables**: Horizontal scroll on small screens
- **Forms**: Stacked layout for mobile
- **Cards**: Responsive grid system
- **Touch Targets**: Adequate button sizes for mobile

## 🌙 Dark Mode

- Toggle between light and dark themes
- Persistent theme preference
- Automatic system theme detection
- Consistent color scheme across themes

## 🔒 Security Features

- Protected routes for all admin pages
- Authentication state management
- Secure logout functionality
- Role-based access control (ready for implementation)

## 🚀 Deployment

### Build the Project
```bash
npm run build
```

### Deploy to Web Server
Upload the contents of the `dist/` folder to your web server.

### Environment Variables
Create a `.env` file for production configuration:
```env
VITE_API_URL=https://your-api-domain.com
VITE_ADMIN_URL=https://your-admin-domain.com
```

## 🤝 Contributing

1. Follow the existing code structure
2. Use consistent naming conventions
3. Add proper TypeScript types (if migrating)
4. Test on multiple devices and browsers
5. Follow accessibility guidelines

## 📞 Support

For technical support or questions:
- **Email**: admin@timesnowindia.com
- **Documentation**: Check this README and inline code comments

## 📄 License

This project is proprietary software for Times Now India 27*7.

---

**Built with ❤️ for Times Now India**
