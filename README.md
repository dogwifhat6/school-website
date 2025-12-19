# Swastik High School Website

A modern, responsive school website built with React and Vite, featuring a comprehensive admin panel for dynamic content management.

## 🌟 Features

### Public Features
- **Home Page**: Welcome section with school photo and key highlights
- **About Page**: School information, statistics, values, and facilities
- **Faculty Page**: Display of school faculty members with photos
- **Events Page**: Showcase of school events and celebrations
- **Facilities Page**: Overview of school facilities and amenities
- **Contact Page**: Contact form and school contact information
- **Responsive Design**: Fully responsive layout for all devices

### Admin Panel
- **Secure Admin Login**: Protected admin dashboard
- **Dynamic Content Management**:
  - School name and branding (logo & school photo)
  - Contact information (email, phone, address)
  - Faculty photos and details
  - School events with images
  - Facilities information
- **Image Upload**: Support for both file uploads and image URLs
- **Real-time Updates**: Changes reflect immediately on the website

## 🚀 Tech Stack

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Express.js (optional, for persistent data storage)
- **State Management**: React Context API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/dogwifhat6/school-website.git
   cd school-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   The production build will be in the `dist` folder.

## 🔐 Admin Access

### Default Credentials
- **Username**: `Admin`
- **Password**: `Halisa123`

> ⚠️ **Security Note**: Change the admin credentials in `src/context/AdminContext.jsx` before deploying to production.

### How to Change Admin Credentials

1. Open `src/context/AdminContext.jsx`
2. Find the `login` function (around line 116)
3. Update the username and password:
   ```javascript
   const login = (username, password) => {
     if (username === 'YOUR_USERNAME' && password === 'YOUR_PASSWORD') {
       setIsAuthenticated(true);
       localStorage.setItem('admin_authenticated', 'true');
       return true;
     }
     return false;
   };
   ```

## 📁 Project Structure

```
school-website/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── context/
│   │   └── AdminContext.jsx    # Admin state management
│   ├── pages/
│   │   ├── Home.jsx            # Homepage
│   │   ├── About.jsx           # About page
│   │   ├── Faculty.jsx         # Faculty page
│   │   ├── Events.jsx          # Events page
│   │   ├── Facilities.jsx      # Facilities page
│   │   ├── Contact.jsx         # Contact page
│   │   ├── AdminLogin.jsx      # Admin login page
│   │   └── AdminDashboard.jsx # Admin dashboard
│   ├── App.jsx                 # Main app component
│   ├── index.jsx               # Entry point
│   ├── main.css                # Global styles
│   └── server.js               # Express backend (optional)
├── public/                     # Static assets
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── vercel.json                 # Vercel deployment config
└── README.md                   # This file
```

## 🎨 Admin Dashboard Features

### School & Logo Tab
- Edit school name
- Upload/update school logo (appears in navbar)
- Upload/update school photo (appears on homepage)
- Manage contact information (email, phone, address)

### Faculty Photos Tab
- Add faculty members with photos
- Upload images or use image URLs
- Delete faculty entries

### Facilities Tab
- Add school facilities
- Include descriptions and icons
- Edit and delete facilities

### Events Tab
- Create school events
- Add event images, dates, and descriptions
- Manage event listings

## 🌐 Deployment

### Deploy to Vercel (Frontend)

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Environment Variables** (if using backend)
   - Add `VITE_API_URL` in Vercel project settings
   - Set it to your backend API URL

### Deploy Backend (Optional)

For persistent data storage across all users, deploy the backend:

1. **Deploy to Render/Railway/Heroku**
   - Push `src/server.js` to a separate repository or monorepo
   - Set up a Node.js service
   - The backend will store data in `admin-data.json`

2. **Update Frontend**
   - Set `VITE_API_URL` environment variable to your backend URL
   - Update `AdminContext.jsx` to use the API instead of localStorage

## 📝 Usage

### For Admins

1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access the admin dashboard at `/admin`
4. Manage all website content through the dashboard tabs

### For Visitors

- Browse the public pages (Home, About, Faculty, Events, Facilities, Contact)
- All content is dynamically loaded from admin-managed data

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server (if using Express)

### Adding New Features

- **New Pages**: Add components in `src/pages/` and update routes in `App.jsx`
- **New Admin Features**: Extend `AdminContext.jsx` and add UI in `AdminDashboard.jsx`
- **Styling**: Use Tailwind CSS classes or add custom styles in `main.css`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👤 Author

**Vishu**
- GitHub: [@dogwifhat6](https://github.com/dogwifhat6)

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Icons and emojis used for visual elements

---

**Note**: This website uses localStorage for data persistence by default. For production use with shared data across all users, deploy the backend server and connect it to the frontend.

