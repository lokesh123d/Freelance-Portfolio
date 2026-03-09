# Backend MVC Architecture

## 📁 Folder Structure

```
backend/
├── config/               # Configuration files
│   └── firebase.js       # Firebase initialization
├── controllers/          # Request handlers
│   ├── authController.js # Authentication logic
│   └── bookingController.js # Booking logic
├── models/               # Data models
│   ├── User.js           # User model
│   └── Booking.js        # Booking model
├── routes/               # API routes
│   ├── authRoutes.js     # Auth endpoints
│   └── bookingRoutes.js  # Booking endpoints
├── middleware/           # Custom middleware
│   └── auth.js           # JWT authentication
├── utils/                # Utility functions
├── server.js             # Main application file
├── .env                  # Environment variables
└── package.json          # Dependencies
```

## 🚀 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/check-admin` | Check admin status | Public |
| GET | `/api/auth/me` | Get current user | Protected |

### Booking Routes (`/api/bookings`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bookings` | Create booking | Public |
| GET | `/api/bookings` | Get all bookings | Admin Only |
| GET | `/api/bookings/:id` | Get booking by ID | Admin Only |
| PUT | `/api/bookings/:id` | Update booking | Admin Only |
| DELETE | `/api/bookings/:id` | Delete booking | Admin Only |

## 📝 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "1234567890",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "1234567890",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create Booking
```bash
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "date": "2026-02-15",
  "time": "10:00 AM",
  "type": "Consultation",
  "platform": "Google Meet",
  "message": "Looking forward to discussing the project"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "1707745200000",
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "date": "2026-02-15",
    "time": "10:00 AM",
    "type": "Consultation",
    "platform": "Google Meet",
    "message": "Looking forward to discussing the project",
    "status": "pending",
    "createdAt": "2026-02-12T10:10:00.000Z"
  }
}
```

### Get All Bookings (Admin)
```bash
GET /api/bookings
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "1707745200000",
      "name": "John Doe",
      "email": "john@example.com",
      "mobile": "1234567890",
      "date": "2026-02-15",
      "time": "10:00 AM",
      "status": "pending",
      "createdAt": "2026-02-12T10:10:00.000Z"
    }
  ]
}
```

## 🔐 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=your-firebase-database-url
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Firebase**
   - Download `serviceAccountKey.json` from Firebase Console
   - Place it in the `backend/` directory
   - Add your `DATABASE_URL` to `.env`

3. **Set JWT Secret**
   ```bash
   # Add to .env
   JWT_SECRET=your-random-secret-key-here
   ```

4. **Start Server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

## 🔒 Authentication Flow

1. User registers or logs in
2. Server validates credentials and generates JWT token
3. Client stores token (localStorage/cookies)
4. Client sends token in Authorization header for protected routes
5. Server verifies token using middleware
6. If valid, request proceeds; if invalid, returns 401

## 📦 Dependencies

- **express** - Web framework
- **cors** - Enable CORS
- **dotenv** - Environment variables
- **firebase-admin** - Firebase SDK
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT generation/verification
- **nodemon** - Development auto-restart

## 🎯 MVC Pattern Explained

- **Models** (`models/`) - Data structure and database operations
- **Views** (Frontend) - React components (separate frontend app)
- **Controllers** (`controllers/`) - Business logic and request handling
- **Routes** (`routes/`) - API endpoint definitions
- **Middleware** (`middleware/`) - Request processing (auth, validation)
- **Config** (`config/`) - App configuration

## 📚 Best Practices Implemented

✅ Separation of concerns (MVC pattern)  
✅ Secure password hashing with bcrypt  
✅ JWT-based authentication  
✅ Input validation  
✅ Error handling  
✅ RESTful API design  
✅ Protected routes with middleware  
✅ Environment-based configuration  
✅ Proper HTTP status codes  
✅ Consistent API responses  

## 🚨 Security Features

- Password hashing with bcrypt (cost factor 10)
- JWT token expiration (7 days)
- Protected admin routes
- Input validation and sanitization
- SQL injection prevention (Firebase)
- CORS configuration
- Environment variable protection

## 📞 Support

For issues or questions, contact the development team.
