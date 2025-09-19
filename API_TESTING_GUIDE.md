# Authentication API Testing Guide

This guide provides step-by-step instructions for testing the complete authentication system using Postman.

## Prerequisites

1. **Environment Setup**: Ensure you have the following environment variables in `.env.local`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

2. **MongoDB Compass**: Have MongoDB Compass open to verify OTP storage and deletion.

## API Endpoints

Base URL: `http://localhost:3000/api/auth`

### 1. User Signup (Step 1: Send OTP)

**Endpoint**: `POST /api/auth/signup`

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "password123",
  "accountType": "User"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

**Verification**:
- Check MongoDB Compass → `otp` collection → should see new OTP document
- Check email inbox for OTP code

### 2. User Signup (Step 2: Verify OTP)

**Endpoint**: `POST /api/auth/signup`

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "password123",
  "accountType": "User",
  "code": "123456"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "accountType": "User"
  }
}
```

**Verification**:
- Check MongoDB Compass → `users` collection → should see new user
- Check MongoDB Compass → `otp` collection → OTP should be deleted
- User password should be hashed (not plain text)

### 3. User Login

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "accountType": "User",
    "profilePhoto": "/images/avatar.png"
  }
}
```

**Verification**:
- Check response headers → should contain `Set-Cookie` with `customUser`
- Cookie should be `httpOnly`, `secure` (in production), `sameSite: strict`

### 4. Get User Profile

**Endpoint**: `GET /api/auth/profile`

**Headers**:
- Cookie: `customUser=...` (from login response)

**Expected Response**:
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "accountType": "User",
    "profilePhoto": "/images/avatar.png",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. Update User Profile

**Endpoint**: `PUT /api/auth/profile`

**Headers**:
- Cookie: `customUser=...` (from login response)

**Request Body**:
```json
{
  "fullName": "John Smith",
  "mobile": "9876543210",
  "accountType": "BusinessMan",
  "profilePhoto": "/images/new-avatar.jpg"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_id",
    "fullName": "John Smith",
    "email": "john@example.com",
    "mobile": "9876543210",
    "accountType": "BusinessMan",
    "profilePhoto": "/images/new-avatar.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 6. User Logout

**Endpoint**: `POST /api/auth/logout`

**Headers**:
- Cookie: `customUser=...` (from login response)

**Expected Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Verification**:
- Check response headers → should contain `Set-Cookie` with empty value and `maxAge: 0`

## Error Testing

### Invalid OTP
**Request**: Step 2 signup with wrong OTP
**Expected**: `400 Bad Request` with message "Invalid or expired OTP"

### Expired OTP
**Request**: Step 2 signup after 10+ minutes
**Expected**: `400 Bad Request` with message "Invalid or expired OTP"

### Duplicate Email
**Request**: Step 1 signup with existing email
**Expected**: `409 Conflict` with message "User already exists"

### Invalid Login
**Request**: Login with wrong password
**Expected**: `401 Unauthorized` with message "Invalid password"

### Unauthenticated Access
**Request**: GET profile without cookie
**Expected**: `401 Unauthorized` with message "Not authenticated"

## Postman Collection Setup

1. **Create Environment Variables**:
   - `base_url`: `http://localhost:3000`
   - `auth_cookie`: (will be set automatically)

2. **Pre-request Scripts**:
   - For authenticated requests, add this to Pre-request Script:
   ```javascript
   pm.request.headers.add({
     key: 'Cookie',
     value: pm.environment.get('auth_cookie')
   });
   ```

3. **Tests Scripts**:
   - For login request, add this to Tests:
   ```javascript
   if (pm.response.code === 200) {
     const cookies = pm.response.headers.get('Set-Cookie');
     if (cookies) {
       pm.environment.set('auth_cookie', cookies);
     }
   }
   ```

## MongoDB Verification

### OTP Collection
- **Before signup**: Empty or no OTP for test email
- **After Step 1**: Should contain OTP document with email, code, expiresAt
- **After Step 2**: OTP document should be deleted

### Users Collection
- **After Step 2**: Should contain new user with hashed password
- **Password field**: Should be long hash string, not plain text
- **Timestamps**: createdAt and updatedAt should be present

## Troubleshooting

1. **OTP not received**: Check SMTP configuration in `.env.local`
2. **Database connection**: Verify MONGODB_URI in `.env.local`
3. **Cookie issues**: Ensure cookie is being sent in subsequent requests
4. **Validation errors**: Check request body format matches schema requirements

## Security Features Verified

✅ Password hashing with bcrypt
✅ OTP expiration (10 minutes)
✅ OTP deletion after use
✅ HttpOnly cookies
✅ SameSite: strict
✅ Input validation with Zod
✅ Duplicate email prevention
✅ Session-based authentication
