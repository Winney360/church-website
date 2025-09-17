# Grace Community Church - MERN Stack Website

A modern, full-featured church website built with the MERN stack, featuring role-based authentication, event management, sermon archives, and community engagement tools.

## 🚀 Features

### User Roles
- **Admin**: Full control over website, user management, content approval
- **Event Coordinator**: Manage events, sermons, and content
- **Member**: Access to events, sermons, community groups

### Core Functionality
- 📅 Interactive event calendar with advanced filtering
- 🎵 Sermon archives with audio player
- 📸 Photo and video galleries
- 👥 Community groups management
- 🔍 Advanced search functionality
- 📱 Fully responsive design
- 🌙 Dark mode toggle
- 🔐 Secure authentication with email/phone options

## 🛠 Tech Stack

### Frontend (Client)
- **React 18** with JSX
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls
- **Vite** for build tooling

### Backend (Server)
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Nodemailer** for email services

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── data/          # Mock data
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Server utilities
│   ├── uploads/           # File uploads
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd grace-community-church
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/church_db
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # SMS Configuration (optional)
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_PHONE_NUMBER=your_twilio_phone
   ```

   Create `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Development

1. **Start the server** (from server directory):
   ```bash
   npm run dev
   ```

2. **Start the client** (from client directory):
   ```bash
   npm run dev
   ```

The client will run on `http://localhost:3000` and the server on `http://localhost:5000`.

## 🔑 Default Admin Account

After running the server for the first time, a default admin account will be created:

- **Email**: admin@gracechurch.com
- **Password**: Admin123!

**Important**: Change this password immediately after first login.

## 📱 Demo Accounts

For testing purposes, the following demo accounts are available:

- **Admin**: admin@church.com / password
- **Event Coordinator**: coordinator@church.com / password
- **Member**: member@church.com / password

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Blue (#3B82F6) gradients
- **Secondary**: Complementary grays and whites
- **Accent**: Success, warning, and error states

### Typography
- **Font Family**: Inter (system fallback)
- **Hierarchy**: Clear heading and body text scales
- **Line Height**: Optimized for readability

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Password reset request
- `PUT /api/auth/reset-password/:token` - Reset password

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Admin/Coordinator)
- `PUT /api/events/:id` - Update event (Admin/Coordinator)
- `DELETE /api/events/:id` - Delete event (Admin/Coordinator)
- `POST /api/events/:id/join` - Join event

### Sermons
- `GET /api/sermons` - Get all sermons
- `POST /api/sermons` - Create sermon (Admin/Coordinator)
- `PUT /api/sermons/:id` - Update sermon (Admin/Coordinator)
- `DELETE /api/sermons/:id` - Delete sermon (Admin/Coordinator)

### Users (Admin only)
- `GET /api/users` - Get all users
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

## 🚀 Deployment

### Client (Frontend)
1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

### Server (Backend)
1. Set production environment variables
2. Deploy to your hosting service (Heroku, DigitalOcean, AWS, etc.)
3. Ensure MongoDB connection is configured for production

## 📦 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- Helmet.js for security headers

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

Toggle between light and dark themes with smooth transitions. Theme preference is saved in localStorage.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)
- UI inspiration from modern church websites
- Built with love for the Grace Community Church family

## 📞 Support

For support, email support@gracechurch.com or create an issue in this repository.

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or check Atlas connection string
   - Verify network access and credentials

2. **CORS Issues**
   - Check CLIENT_URL in server .env file
   - Ensure client is running on correct port

3. **Authentication Issues**
   - Verify JWT_SECRET is set in server .env
   - Check token expiration settings

4. **File Upload Issues**
   - Ensure uploads directory exists in server
   - Check file size limits and permissions

### Development Tips

- Use MongoDB Compass for database visualization
- Install React Developer Tools for debugging
- Use Postman for API testing
- Enable MongoDB logging for query debugging

## 🚀 Future Enhancements

- [ ] Push notifications for events
- [ ] Online donation system
- [ ] Live streaming integration
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Calendar synchronization (Google, Outlook)