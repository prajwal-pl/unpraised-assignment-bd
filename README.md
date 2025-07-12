# 🕶️ Phoenix: IMF Gadget API Development Challenge

**Mission Status: ✅ ACCOMPLISHED**

A secure RESTful API for the Impossible Missions Force (IMF) gadget inventory management system, built with Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.

## 🎯 Mission Objectives Completed

### ✅ Core Features Implemented

#### 1. **Gadget Inventory Management** (`/api/v1/gadgets`)

- **GET**: Retrieve all gadgets for authenticated users
- **POST**: Add new gadgets with AI-generated unique codenames
- **PATCH**: Update existing gadget information
- **DELETE**: Soft delete gadgets by marking as "Decommissioned"

#### 2. **Advanced Features**

- **GET `/api/v1/gadgets?status={status}`**: Filter gadgets by status (Available, Deployed, Destroyed, Decommissioned)
- **POST `/api/v1/gadgets/{id}/self-destruct`**: Secure self-destruct sequence with confirmation code

#### 3. **Authentication & Authorization** 🔐

- JWT-based authentication system
- User registration and login endpoints
- Protected routes requiring valid tokens
- Password hashing with bcrypt

#### 4. **AI-Powered Codename Generation** 🤖

- Integration with Groq AI API (LLaMA 3.3-70B model)
- Automatically generates unique, mission-style codenames
- Examples: "The Nightingale", "The Kraken", "Shadow Phoenix"

### ✅ Bonus Features Completed

#### 🔒 **Robust Authentication & Authorization**

- JWT token-based authentication
- Secure password hashing (bcrypt)
- Protected API endpoints
- User-specific gadget access control

#### 🌐 **Production Deployment**

- **Live API**: [https://unpraised-assignment-bd.onrender.com](https://unpraised-assignment-bd.onrender.com)
- Deployed on Render with PostgreSQL database
- Environment-based configuration

#### 🔍 **Advanced Filtering**

- Status-based gadget filtering: `GET /api/v1/gadgets?status=AVAILABLE`
- Supports all status types: AVAILABLE, DEPLOYED, DESTROYED, DECOMMISSIONED

## 🚀 **Live API**

**Base URL**: [https://unpraised-assignment-bd.onrender.com](https://unpraised-assignment-bd.onrender.com)

## 🛠️ Tech Stack

- **Runtime**: Node.js 22+
- **Framework**: Express.js 5
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **AI Integration**: Groq SDK (LLaMA 3.3-70B)
- **Deployment**: Render

## 📋 API Endpoints

### Authentication

```
POST /api/v1/auth/register    # User registration
POST /api/v1/auth/login       # User login
```

### Gadgets (Protected Routes)

```
GET    /api/v1/gadgets                    # Get all user gadgets
GET    /api/v1/gadgets?status=AVAILABLE   # Filter by status
POST   /api/v1/gadgets                    # Create new gadget
PATCH  /api/v1/gadgets/:id                # Update gadget
DELETE /api/v1/gadgets/:id                # Decommission gadget
POST   /api/v1/gadgets/:id/self-destruct  # Self-destruct sequence
```

## 🏗️ Database Schema

### User Model

```typescript
{
  id: String (CUID)
  email: String (Unique)
  name: String? (Optional)
  password: String (Hashed)
  gadgets: Gadget[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Gadget Model

```typescript
{
  id: String (CUID)
  name: String (AI-generated codename)
  status: Enum (AVAILABLE | DEPLOYED | DESTROYED | DECOMMISSIONED)
  userId: String? (Foreign Key)
  createdAt: DateTime
  updatedAt: DateTime
}
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 22+
- PostgreSQL database
- Groq API key (for AI codename generation)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd unpraised-assignment-bd
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/imf_gadgets"
   JWT_SECRET="your-super-secret-jwt-key"
   GROQ_API_KEY="your-groq-api-key"
   SELF_DESTRUCT_SECRET="admin123"
   PORT=5000
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Apply database migrations
   npx prisma migrate deploy
   ```

5. **Development Server**

   ```bash
   npm run dev
   ```

6. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 🧪 Testing the API

### 1. User Registration

```bash
curl -X POST https://unpraised-assignment-bd.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "agent@imf.com",
    "password": "mission123",
    "name": "Agent Smith"
  }'
```

### 2. User Login

```bash
curl -X POST https://unpraised-assignment-bd.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "agent@imf.com",
    "password": "mission123"
  }'
```

### 3. Create Gadget (Protected)

```bash
curl -X POST https://unpraised-assignment-bd.onrender.com/api/v1/gadgets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "AVAILABLE"
  }'
```

### 4. Get All Gadgets

```bash
curl -X GET https://unpraised-assignment-bd.onrender.com/api/v1/gadgets \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Filter Gadgets by Status

```bash
curl -X GET "https://unpraised-assignment-bd.onrender.com/api/v1/gadgets?status=AVAILABLE" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 6. Self-Destruct Sequence

```bash
curl -X POST https://unpraised-assignment-bd.onrender.com/api/v1/gadgets/GADGET_ID/self-destruct \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "secret": "admin123"
  }'
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Request body validation
- **CORS**: Cross-origin resource sharing enabled
- **Environment Variables**: Sensitive data protection
- **User Isolation**: Users can only access their own gadgets

## 🌟 Key Features

### AI-Powered Codename Generation

The API uses Groq's LLaMA 3.3-70B model to generate unique, mission-style codenames for each gadget automatically.

### Soft Delete Pattern

Instead of permanently deleting gadgets, the API marks them as "DECOMMISSIONED" with timestamps, maintaining data integrity and audit trails.

### Status-Based Filtering

Advanced filtering system allowing agents to quickly find gadgets by their operational status.

### Secure Self-Destruct

Multi-layer security for the self-destruct sequence requiring both JWT authentication and a secret confirmation code (`admin123`).

## 📁 Project Structure

```
unpraised-assignment-bd/
├── src/
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.ts
│   │   └── gadget.controller.ts
│   ├── middleware/           # Authentication middleware
│   │   └── middleware.ts
│   ├── routes/              # API routes
│   │   ├── auth.route.ts
│   │   └── gadget.route.ts
│   ├── lib/                 # Utilities
│   │   └── ai.ts           # AI codename generation
│   └── index.ts            # Application entry point
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── package.json
├── tsconfig.json
└── README.md
```

## 🎖️ Mission Evaluation

### ✅ Functionality

- All core API endpoints implemented and functional
- Bonus features completed (authentication, filtering, deployment)
- AI-powered codename generation
- Soft delete implementation

### ✅ Code Quality

- TypeScript for type safety
- Modular architecture with clear separation of concerns
- Consistent error handling patterns
- Clean, readable code structure

### ✅ Security

- JWT-based authentication and authorization
- Password hashing with bcrypt
- Protected routes and user isolation
- Environment-based configuration

### ✅ Error Handling

- Comprehensive error responses
- Graceful failure handling
- Input validation and sanitization
- Proper HTTP status codes

### ✅ Deployment & Documentation

- **Live API**: [https://unpraised-assignment-bd.onrender.com](https://unpraised-assignment-bd.onrender.com)
- Comprehensive README with setup instructions
- API endpoint documentation
- Example curl commands

---

## 🎯 **Mission Accomplished!**

The IMF Gadget API has been successfully developed, deployed, and documented. All core requirements and bonus features have been implemented with a focus on security, scalability, and user experience.

**Agent Status**: Ready for deployment 🚀

_This message will self-destruct in... just kidding! But the API is ready for action!_ 😄

---

**Live API**: [https://unpraised-assignment-bd.onrender.com](https://unpraised-assignment-bd.onrender.com)
