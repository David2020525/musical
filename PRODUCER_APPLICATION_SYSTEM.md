# Producer Application System

## Overview
A comprehensive multi-step producer application system with React Hook Form + Zod validation, database persistence, and admin review workflow.

## Features Implemented

### 1. Database Schema
- **Producer Applications Table** (`producer_applications`)
  - Personal information (real name, Turkish ID, phone)
  - Social media links (Instagram, Twitter, YouTube, Spotify, SoundCloud)
  - Portfolio links (website + 3 sample tracks)
  - Application status (pending/approved/rejected)
  - Admin review tracking (reviewer, notes, timestamp)

- **User Extensions**
  - `is_producer` flag for quick access checks
  - `producer_application_id` for relationship

### 2. Multi-Step Form (React Hook Form + Zod)

#### Step 1: Personal Information
- **Real Name**: Turkish characters supported, 3-100 characters
- **Turkish ID**: 11-digit validation with Turkish ID algorithm verification
- **Phone**: Turkish mobile format validation (05XXXXXXXXX or +905XXXXXXXXX)

#### Step 2: Social Links (Optional)
- Instagram URL
- Twitter/X URL
- YouTube URL
- Spotify Artist URL
- SoundCloud Profile URL
- All with URL format validation

#### Step 3: Portfolio & Samples (Optional)
- Portfolio website URL
- 3 sample track URLs (SoundCloud, YouTube, etc.)
- All with URL format validation

### 3. Validation Rules

#### Turkish ID Validation
```typescript
// 11-digit numeric validation
// Turkish ID algorithm verification:
// - Last two digits are checksums
// - Digit 10 = ((sum of odd positions) * 7 - sum of even positions) mod 10
// - Digit 11 = (sum of first 10 digits) mod 10
```

#### Phone Validation
```typescript
// Accepts formats:
// - 05551234567 (11 digits starting with 05)
// - +905551234567 (13 digits starting with +905)
```

#### URL Validation
```typescript
// Must start with http:// or https://
// Optional fields can be empty
```

### 4. Backend API Routes

#### User Endpoints
```
GET    /api/producer/application
POST   /api/producer/application
```

**GET /api/producer/application**
- Requires authentication
- Returns current user's application or null
- Response: `{ success: true, data: ProducerApplication | null }`

**POST /api/producer/application**
- Requires authentication
- Validates all form data with Zod
- Checks for existing application
- Creates new application with status 'pending'
- Updates user's `producer_application_id`
- Response: `{ success: true, data: { id, status }, message }`

#### Admin Endpoints
```
GET    /api/producer/admin/applications?status=pending&page=1&limit=20
POST   /api/producer/admin/applications/:id/review
```

**GET /api/producer/admin/applications**
- Requires admin role
- Query parameters:
  - `status`: Filter by pending/approved/rejected
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
- Returns applications with user info and pagination
- Response: `{ success: true, data: [...], pagination: {...} }`

**POST /api/producer/admin/applications/:id/review**
- Requires admin role
- Body: `{ status: 'approved' | 'rejected', admin_notes?: string }`
- Updates application status
- If approved, sets user's `is_producer` flag to true
- Records reviewer and timestamp
- Response: `{ success: true, message }`

### 5. Frontend Components

#### ProducerApplicationForm
Multi-step form with:
- Step indicator progress bar
- Per-step validation
- Form state persistence across steps
- Error handling and display
- Submit confirmation

#### ProducerApplicationPage
Full application flow:
- Initial information page (benefits, requirements, process)
- Form display
- Application status display
- Different views for:
  - New users (show benefits and start button)
  - Users with pending application (show status)
  - Users with approved/rejected application (show details)
  - Existing producers (show dashboard links)

#### AdminProducerApplications
Admin management interface:
- Tabbed view (pending/approved/rejected)
- Application cards with all details
- Inline review form
- Approve/reject actions
- Admin notes field
- Review history

### 6. User States

```
┌─────────────┐
│   New User  │
│ (no app)    │
└─────┬───────┘
      │ Submit Application
      ▼
┌─────────────┐
│  Pending    │
│ (blocked)   │
└─────┬───────┘
      │
      ├─ Approved ──► Producer (can upload)
      │
      └─ Rejected ──► Can view notes
```

### 7. Access Control

#### Upload Restriction
```typescript
// Before allowing track upload:
if (!user.is_producer) {
  // Block upload
  // Show message about becoming a producer
  // Link to application page
}
```

#### Application Rules
- One application per user
- Cannot reapply if pending or approved
- Can view rejection reasons
- Must be authenticated

### 8. Internationalization (i18n)

Full Turkish/English support for:
- Form labels and placeholders
- Validation error messages
- Status badges
- Info text and help messages
- Application process descriptions
- Benefits and requirements lists

### 9. Security Features

- JWT authentication required for all endpoints
- Admin role verification for admin endpoints
- Input validation on both client and server
- SQL injection prevention (parameterized queries)
- XSS prevention (React auto-escaping)
- Turkish ID algorithm verification

### 10. Database Indexes

```sql
CREATE INDEX idx_producer_applications_user_id ON producer_applications(user_id);
CREATE INDEX idx_producer_applications_status ON producer_applications(status);
CREATE INDEX idx_users_is_producer ON users(is_producer);
```

## Usage Examples

### User Flow

1. **Visit Application Page**
```
Navigate to /{locale}/producer/apply
```

2. **Complete Multi-Step Form**
- Step 1: Fill personal info
- Step 2: Add social links (optional)
- Step 3: Add portfolio (optional)
- Click Submit

3. **Wait for Review**
- Status shows "Pending"
- Upload features are blocked
- Notification sent when reviewed

4. **Get Approved**
- Status changes to "Approved"
- `is_producer` flag set to true
- Can now upload tracks

### Admin Flow

1. **Access Admin Panel**
```
Navigate to /{locale}/admin/producer-applications
```

2. **Review Applications**
- Click "Pending" tab
- View application details
- Check social links and samples
- Click "Review Application"

3. **Approve or Reject**
```typescript
// Approve
{ status: 'approved', admin_notes: 'Great portfolio!' }

// Reject
{ status: 'rejected', admin_notes: 'Need more sample tracks' }
```

## API Testing

### Submit Application
```bash
curl -X POST http://localhost:3000/api/producer/application \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "real_name": "Ahmet Yılmaz",
    "turkish_id": "12345678901",
    "phone": "05551234567",
    "instagram_url": "https://instagram.com/ahmetyilmaz",
    "portfolio_url": "https://ahmetyilmaz.com",
    "sample_track_1": "https://soundcloud.com/ahmetyilmaz/track1"
  }'
```

### Get Application Status
```bash
curl http://localhost:3000/api/producer/application \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Admin: List Pending Applications
```bash
curl "http://localhost:3000/api/producer/admin/applications?status=pending" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Admin: Approve Application
```bash
curl -X POST http://localhost:3000/api/producer/admin/applications/1/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "status": "approved",
    "admin_notes": "Excellent portfolio and samples!"
  }'
```

## Migration Commands

```bash
# Apply migration locally
npm run db:migrate:local

# Apply migration to production
npm run db:migrate:prod

# View database
wrangler d1 execute webapp-production --local --command="SELECT * FROM producer_applications"
```

## File Structure

```
src/
├── components/
│   ├── ProducerApplicationForm.tsx    # Multi-step form component
│   └── ui/                             # Reusable UI components
├── pages/
│   ├── ProducerApplication.tsx         # Main application page
│   └── AdminProducerApplications.tsx   # Admin review interface
├── routes/
│   └── producer.ts                     # API route handlers
├── lib/
│   ├── i18n.ts                         # Translations
│   └── validations/
│       └── producerApplication.ts      # Zod schemas
├── types/
│   └── index.ts                        # TypeScript types
└── migrations/
    └── 0002_producer_applications.sql  # Database schema
```

## Next Steps (Future Enhancements)

1. **Email Notifications**
   - Send email when application is reviewed
   - Reminder emails for pending applications

2. **Application History**
   - Allow users to reapply after rejection
   - Track application versions

3. **Enhanced Verification**
   - ID document upload
   - Phone number verification via SMS
   - Social media account verification

4. **Producer Dashboard**
   - Application analytics
   - Upload statistics
   - Earnings tracking

5. **Bulk Actions**
   - Admin: Approve/reject multiple applications
   - Export applications to CSV

6. **File Uploads**
   - Direct audio file upload for samples
   - ID document verification
   - Portfolio PDF upload

## Troubleshooting

### Turkish ID Validation Fails
- Ensure 11 digits
- Verify checksum algorithm
- Test with valid Turkish IDs

### Application Not Saving
- Check authentication token
- Verify database migration applied
- Check browser console for errors

### Admin Can't See Applications
- Verify user has 'admin' role in database
- Check JWT token contains correct user ID
- Verify database query permissions

## Status Badges

- 🟡 **Pending**: Application submitted, waiting for review
- ✅ **Approved**: Application approved, producer access granted
- ❌ **Rejected**: Application rejected, see admin notes

## Security Considerations

1. **Data Privacy**
   - Turkish ID is sensitive personal data
   - Store securely, don't expose in logs
   - Consider encryption for production

2. **Rate Limiting**
   - Add rate limiting to prevent spam applications
   - Limit reapplications per user

3. **Admin Audit Trail**
   - Log all admin review actions
   - Track who approved/rejected what

4. **Input Sanitization**
   - All inputs validated with Zod
   - URLs checked for valid format
   - SQL injection prevented

## Compliance Notes

- **KVKK Compliance** (Turkish Data Protection Law)
  - Personal data collected with consent
  - Clear purpose statement
  - User can request data deletion
  - Admin notes are internal use only
