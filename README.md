# Sales Platform Auth Service

A Node.js authentication service with email/password login and social login (Google OAuth), using JWT for session management.

## Features
- Email/password registration and login
- Google social login (OAuth2)
- JWT access and refresh tokens
- Secure password hashing with bcrypt
- Input validation with Joi
- XSS protection on user input
- CORS configured for frontend domain
- MongoDB integration with Mongoose

## Requirements
- Node.js >= 18
- MongoDB (Atlas)
- npm

## Setup
1. Clone the repository:
```bash
git clone <your-repo-url>
cd sales-platform-auth
```
2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root:
```bash
PORT=5000
MONGO_URL=<your-mongodb-uri>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
JWT_ACCESS_SECRET=<your-access-token-secret>
JWT_REFRESH_SECRET=<your-refresh-token-secret>
```

4. Run the server:
```bash
npm run start
```

5. API Endpoints
```bash
| Method | Endpoint              | Description                          |
| ------ | --------------------- | ------------------------------------ |
| POST   | /auth/register        | Register new user                    |
| POST   | /auth/login           | Login with email/password            |
| GET    | /auth/google          | Start Google OAuth                   |
| GET    | /auth/google/callback | Google OAuth callback                |
| POST   | /auth/refresh         | Refresh access token                 |
| POST   | /auth/logout          | Logout and invalidate refresh token  |
| GET    | /auth/me              | Get current user info (requires JWT) |
```


