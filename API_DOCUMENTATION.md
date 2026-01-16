# 🎵 MUSICAL API Documentation

**Version**: 1.0.0  
**Base URL**: `https://your-domain.com/api`  
**Authentication**: JWT Bearer Token

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Producer Applications](#producer-applications)
3. [Track Management](#track-management)
4. [Payments & Purchases](#payments--purchases)
5. [Wallet Management](#wallet-management)
6. [Error Handling](#error-handling)
7. [Response Format](#response-format)

---

## 🔐 Authentication

### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "name": "Full Name",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "username",
      "name": "Full Name",
      "role": "user",
      "is_producer": 0,
      "email_verified": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Registration successful. Please verify your email."
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "username",
      "name": "Full Name",
      "role": "user",
      "is_producer": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "username",
      "name": "Full Name",
      "role": "user",
      "is_producer": 0,
      "avatar_url": null,
      "bio": null
    }
  }
}
```

### Verify Email
```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "verification-token-from-email"
}
```

### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com",
  "locale": "en"
}
```

### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

---

## 👤 Producer Applications

### Submit Application (User)
```http
POST /api/producer/application
Authorization: Bearer <token>
Content-Type: application/json

{
  "real_name": "John Doe",
  "turkish_id": "11111111110",
  "phone": "05551234567",
  "instagram_url": "https://instagram.com/johndoe",
  "twitter_url": "https://twitter.com/johndoe",
  "youtube_url": "https://youtube.com/@johndoe",
  "spotify_url": "https://open.spotify.com/artist/...",
  "soundcloud_url": "https://soundcloud.com/johndoe",
  "portfolio_url": "https://johndoe.com",
  "sample_track_1": "https://example.com/track1.mp3",
  "sample_track_2": "https://example.com/track2.mp3",
  "sample_track_3": "https://example.com/track3.mp3"
}
```

**Required Fields:**
- `real_name` (3-100 chars, letters only)
- `turkish_id` (11 digits with algorithm validation)
- `phone` (Turkish format: 05XXXXXXXXX or +905XXXXXXXXX)

**Optional Fields:**
- All social media URLs
- Portfolio and sample tracks

**Response:**
```json
{
  "success": true,
  "message": "Producer application submitted successfully",
  "data": {
    "id": 1,
    "status": "pending"
  }
}
```

### Get Own Application Status
```http
GET /api/producer/application
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "status": "pending",
    "real_name": "John Doe",
    "phone": "05551234567",
    "created_at": "2026-01-16T10:00:00Z"
  }
}
```

### List All Applications (Admin Only)
```http
GET /api/producer/admin/applications?status=pending&page=1&limit=20
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `status` (optional): `pending`, `approved`, `rejected`
- `page` (optional): Default 1
- `limit` (optional): Default 20

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "status": "pending",
      "real_name": "John Doe",
      "email": "john@example.com",
      "username": "johndoe",
      "created_at": "2026-01-16T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```

### Review Application (Admin Only)
```http
POST /api/producer/admin/applications/:id/review
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "approved",
  "admin_notes": "Great portfolio! Welcome to the producer community."
}
```

**Status Options:**
- `approved` - User becomes producer (is_producer = 1)
- `rejected` - User remains listener

**Response:**
```json
{
  "success": true,
  "message": "Application approved successfully",
  "data": {
    "status": "approved"
  }
}
```

---

## 🎵 Track Management

### List Tracks
```http
GET /api/tracks?genre=Electronic&search=beat&sort=newest&limit=20&offset=0
```

**Query Parameters:**
- `genre` (optional): Filter by genre
- `search` (optional): Search in title/artist
- `sort` (optional): `newest`, `popular`, `price_asc`, `price_desc`
- `featured` (optional): `true` to show only featured tracks
- `free_only` (optional): `true` to show only free tracks
- `price_min` (optional): Minimum price
- `price_max` (optional): Maximum price
- `producer` (optional): Filter by producer username
- `limit` (optional): Default 100
- `offset` (optional): Default 0

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Summer Vibes",
      "artist": "John Producer",
      "album": "Summer EP",
      "genre": "House",
      "duration": 198,
      "price": 29.99,
      "cover_url": "https://...",
      "audio_url": "https://...",
      "plays_count": 5634,
      "likes_count": 345,
      "is_featured": 1,
      "producer_username": "john_producer",
      "created_at": "2025-07-20T12:37:14Z"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 13
  }
}
```

### Get Track Details
```http
GET /api/tracks/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Summer Vibes",
    "artist": "John Producer",
    "album": "Summer EP",
    "genre": "House",
    "duration": 198,
    "bpm": 122,
    "mood": "Happy",
    "price": 29.99,
    "description": "Free house track - perfect for your summer playlist!",
    "cover_url": "https://...",
    "audio_url": "https://...",
    "plays_count": 5635,
    "likes_count": 345,
    "producer_username": "john_producer"
  }
}
```

### Get Genres List
```http
GET /api/tracks/genres/list
```

**Response:**
```json
{
  "success": true,
  "data": [
    "House",
    "Techno",
    "Deep House",
    "Progressive House",
    "Melodic Techno"
  ]
}
```

### Create Track (Producer Only)
```http
POST /api/tracks
Authorization: Bearer <producer-token>
Content-Type: application/json

{
  "title": "My New Track",
  "artist": "Producer Name",
  "album": "Album Name",
  "genre": "House",
  "description": "Track description",
  "price": 29.99,
  "bpm": 128,
  "mood": "Energetic",
  "tags": "house,electronic,dance",
  "audio_url": "https://r2-url/audio.mp3",
  "cover_url": "https://r2-url/cover.jpg",
  "duration": 240,
  "release_year": 2026
}
```

**Required Fields:**
- `title` (1-200 chars)
- `artist` (1-200 chars)
- `audio_url` (valid URL)

**Response:**
```json
{
  "success": true,
  "message": "Track created successfully",
  "data": {
    "id": 14,
    "title": "My New Track",
    "price": 29.99,
    "created_at": "2026-01-16T13:00:00Z"
  }
}
```

### Upload Audio File
```http
POST /api/tracks/upload/audio
Authorization: Bearer <producer-token>
Content-Type: multipart/form-data

file: <audio-file>
```

**Supported Formats:** mp3, wav, flac, m4a  
**Max Size:** 100MB

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://r2-url/audio/track-123.mp3",
    "key": "audio/track-123.mp3"
  }
}
```

### Upload Cover Image
```http
POST /api/tracks/upload/cover
Authorization: Bearer <producer-token>
Content-Type: multipart/form-data

file: <image-file>
```

**Supported Formats:** jpg, jpeg, png, webp  
**Max Size:** 5MB

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://r2-url/covers/cover-123.jpg",
    "key": "covers/cover-123.jpg"
  }
}
```

### Update Track (Owner/Admin Only)
```http
PUT /api/tracks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 34.99,
  "description": "Updated description"
}
```

### Delete Track (Owner/Admin Only)
```http
DELETE /api/tracks/:id
Authorization: Bearer <token>
```

---

## 💳 Payments & Purchases

### Initialize Checkout
```http
POST /api/payments/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "trackId": 1,
  "locale": "en"
}
```

**Response:**
```json
{
  "success": true,
  "paymentUrl": "https://sandbox-payment.iyzipay.com/...",
  "token": "payment-token-123"
}
```

**Note:** User is redirected to `paymentUrl` to complete payment with Iyzico.

### Payment Callback (Webhook)
```http
POST /api/payments/callback
Content-Type: application/json

{
  "token": "payment-token-from-iyzico"
}
```

**Response:**
```json
{
  "success": true,
  "redirect": "/dashboard/purchases?status=success&id=1"
}
```

### Get Purchase Details
```http
GET /api/payments/purchase/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "purchase": {
    "id": 1,
    "track_id": 1,
    "title": "Summer Vibes",
    "artist": "John Producer",
    "price": 29.99,
    "payment_status": "completed",
    "created_at": "2026-01-16T13:00:00Z"
  }
}
```

### Generate Download URL
```http
GET /api/payments/download/:purchaseId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "downloadUrl": "https://r2-url/audio/track.mp3",
  "filename": "Summer Vibes.mp3",
  "expiresIn": 3600
}
```

---

## 💰 Wallet Management

### Get Wallet Balance
```http
GET /api/wallet
Authorization: Bearer <producer-token>
```

**Response:**
```json
{
  "success": true,
  "wallet": {
    "balance": 245.32,
    "available": 245.32,
    "pending": 0,
    "totalEarned": 523.45,
    "totalWithdrawn": 278.13,
    "currency": "TRY"
  }
}
```

### Get Transaction History
```http
GET /api/wallet/transactions?limit=10&offset=0
Authorization: Bearer <producer-token>
```

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "id": 8,
      "amount": 29.99,
      "net_amount": 25.49,
      "commission": 4.50,
      "created_at": "2025-12-12T12:37:14Z",
      "track_title": "Midnight Groove",
      "type": "sale",
      "buyer_name": "ayse_k"
    }
  ],
  "total": 3,
  "limit": 10,
  "offset": 0
}
```

### Request Withdrawal
```http
POST /api/wallet/withdraw
Authorization: Bearer <producer-token>
Content-Type: application/json

{
  "amount": 200.00,
  "bankName": "Garanti Bankası",
  "iban": "TR330006100519786457841326",
  "accountHolder": "John Doe",
  "note": "Monthly withdrawal"
}
```

**Requirements:**
- Minimum withdrawal: ₺100
- Must be a producer
- Sufficient available balance

**Response:**
```json
{
  "success": true,
  "message": "Withdrawal request submitted successfully",
  "requestId": 1
}
```

### Get Withdrawal Requests
```http
GET /api/wallet/withdrawals
Authorization: Bearer <producer-token>
```

**Response:**
```json
{
  "success": true,
  "withdrawals": [
    {
      "id": 1,
      "amount": 200.00,
      "status": "pending",
      "bank_name": "Garanti Bankası",
      "iban": "TR33...1326",
      "created_at": "2026-01-16T13:00:00Z"
    }
  ]
}
```

### Get Earnings Chart Data
```http
GET /api/wallet/earnings-chart
Authorization: Bearer <producer-token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "month": "2026-01",
      "earnings": 245.32,
      "sales": 5
    },
    {
      "month": "2025-12",
      "earnings": 180.50,
      "sales": 3
    }
  ]
}
```

---

## ❌ Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Optional validation errors
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal error |

### Common Errors

**Validation Error:**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Required"
    }
  ]
}
```

**Authentication Error:**
```json
{
  "success": false,
  "error": "Invalid token"
}
```

**Permission Error:**
```json
{
  "success": false,
  "error": "Only producers can upload tracks"
}
```

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### List Response with Pagination
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## 🔑 Authentication

### JWT Token
All authenticated endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration
- **Access Token**: 7 days
- **Email Verification Token**: 24 hours
- **Password Reset Token**: 1 hour

### Roles & Permissions

| Role | Permissions |
|------|-------------|
| **user** | View tracks, purchase tracks, submit producer application |
| **producer** | All user permissions + upload tracks, manage own tracks, view wallet |
| **admin** | All permissions + manage users, review applications, delete any content |

---

## 🧪 Testing

### Test Credentials

**Admin:**
```
Email: admin@webapp.com
Password: admin123
```

**Producers:**
```
Email: john@example.com
Password: password123
```

**Sandbox Environment:**
```
Base URL: http://localhost:3000/api
Iyzico: Sandbox mode
Email: Mock mode (console logs)
```

---

## 📊 Rate Limits

Currently no rate limits implemented. Consider adding:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## 🔄 Versioning

Current Version: **v1.0.0**

API versioning not yet implemented. Future versions will use URL versioning:
- `/api/v1/tracks`
- `/api/v2/tracks`

---

## 📞 Support

For API support and bug reports:
- **Repository**: https://github.com/David2020525/musical
- **Documentation**: This file
- **Issues**: GitHub Issues

---

**Last Updated**: January 16, 2026  
**API Version**: 1.0.0  
**Status**: Production Ready ✅
