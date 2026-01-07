# Producer Application System - Live Demo Guide

## 🌐 Live Application
**URL**: https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai

## 📋 Quick Demo Walkthrough

### 1. User Application Flow

#### Access the Application Page
```
English: https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/en/producer/apply
Turkish: https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/tr/producer/apply
```

#### Test Login Credentials
```
Regular User (can apply):
Email: john@example.com
Password: password123
Status: Has pending application

Approved Producer:
Email: jane@example.com  
Password: password123
Status: Already approved producer

Admin User (can review):
Email: admin@webapp.com
Password: password123
Access: Can review all applications
```

### 2. Multi-Step Form Demo

#### Step 1: Personal Information
**What to Test:**
- Real name validation (3-100 chars, Turkish chars allowed)
- Turkish ID validation (11 digits with algorithm check)
- Phone validation (Turkish mobile format)

**Test Data:**
```
Real Name: Ahmet Yılmaz
Turkish ID: 12345678901
Phone: 05551234567
```

**Expected Behavior:**
- Form validates on submit
- Shows error messages for invalid data
- Turkish characters (ğüşöçİĞÜŞÖÇ) work in name field
- Click "Next" to proceed to Step 2

#### Step 2: Social Media Links
**What to Test:**
- All fields are optional
- URL validation (must start with http:// or https://)
- Can skip entirely or fill some

**Test Data:**
```
Instagram: https://instagram.com/ahmetyilmaz
Twitter: https://twitter.com/ahmetyilmaz
YouTube: https://youtube.com/@ahmetyilmaz
Spotify: https://open.spotify.com/artist/ahmetyilmaz
SoundCloud: https://soundcloud.com/ahmetyilmaz
```

**Expected Behavior:**
- Invalid URLs show error
- Can leave fields empty
- Click "Next" to proceed to Step 3

#### Step 3: Portfolio & Samples
**What to Test:**
- Portfolio website URL
- Up to 3 sample track URLs
- All optional

**Test Data:**
```
Portfolio: https://ahmetyilmaz.com
Sample 1: https://soundcloud.com/ahmetyilmaz/track1
Sample 2: https://soundcloud.com/ahmetyilmaz/track2
Sample 3: https://soundcloud.com/ahmetyilmaz/track3
```

**Expected Behavior:**
- Shows submission info box
- Click "Submit" to complete application
- Redirects to status page after success

### 3. Application Status Views

#### Pending Status
**User**: john@example.com (already has pending application)

**What to See:**
- Yellow banner with "Application Under Review"
- Estimated review time (2-3 business days)
- Application details displayed
- Social links and portfolio links
- Submission timestamp

#### Approved Status
**User**: jane@example.com (approved producer)

**What to See:**
- Green banner with "Application Approved"
- Links to Dashboard and Upload Track
- Review timestamp and approval date
- Can start uploading content

#### Rejected Status
**What to See:**
- Red banner with "Application Rejected"
- Admin notes explaining rejection
- Review timestamp
- Currently no test user with rejected status

### 4. Admin Review Interface

#### Access Admin Panel
```
URL: https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/en/admin/producer-applications
Login as: admin@webapp.com / password123
```

#### What to Test:
1. **Pending Tab**
   - View pending applications (john's application)
   - Click "Review Application"
   - Add admin notes
   - Click "Approve" or "Reject"

2. **Approved Tab**
   - View approved applications (jane's application)
   - See approval notes and reviewer
   - See review timestamp

3. **Rejected Tab**
   - Currently empty (no rejected applications)

#### Review Actions

**To Approve:**
```
1. Click "Review Application" on pending app
2. (Optional) Add notes: "Great portfolio and samples!"
3. Click "✅ Approve"
4. User's is_producer flag set to true
5. User can now upload tracks
```

**To Reject:**
```
1. Click "Review Application" on pending app
2. (Required) Add notes: "Please provide more sample tracks"
3. Click "❌ Reject"
4. User sees rejection reason
5. User cannot upload
```

### 5. API Testing

#### Get Application Status
```bash
# Login first to get token
curl -X POST https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'

# Use token to get application
curl https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/api/producer/application \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 2,
    "real_name": "John Smith",
    "turkish_id": "12345678901",
    "phone": "05551234567",
    "status": "pending",
    "created_at": "2026-01-07T14:00:00.000Z"
  }
}
```

#### Submit New Application
```bash
curl -X POST https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/api/producer/application \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "real_name": "Mehmet Özkan",
    "turkish_id": "98765432109",
    "phone": "05559876543",
    "instagram_url": "https://instagram.com/mehmetozkan",
    "portfolio_url": "https://mehmetozkan.com",
    "sample_track_1": "https://soundcloud.com/mehmetozkan/track1"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Producer application submitted successfully",
  "data": {
    "id": 3,
    "status": "pending"
  }
}
```

#### Admin: List Applications
```bash
# Login as admin first
curl -X POST https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@webapp.com", "password": "password123"}'

# Get pending applications
curl "https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/api/producer/admin/applications?status=pending" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

#### Admin: Approve Application
```bash
curl -X POST https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai/api/producer/admin/applications/1/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "status": "approved",
    "admin_notes": "Excellent portfolio and professional presentation!"
  }'
```

## 🧪 Test Scenarios

### Scenario 1: New User Applies
1. Create a new account or use existing test user
2. Navigate to `/producer/apply`
3. See information page about benefits
4. Click "Start Application"
5. Fill Step 1 (personal info)
6. Fill Step 2 (social links - optional)
7. Fill Step 3 (portfolio - optional)
8. Submit application
9. See "Pending" status page
10. Try to upload track → blocked

### Scenario 2: Admin Reviews Application
1. Login as admin
2. Navigate to `/admin/producer-applications`
3. See pending application in list
4. Click "Review Application"
5. Add admin notes
6. Click "Approve"
7. Application moves to "Approved" tab
8. User receives producer status

### Scenario 3: Producer Uploads Content
1. Login as approved producer (jane@example.com)
2. Navigate to `/producer/apply`
3. See "Already a producer" message
4. Click "Upload Track" button
5. Access upload functionality (not blocked)

### Scenario 4: Validation Testing
1. Try to submit with invalid Turkish ID
   - Should show: "Invalid Turkish ID number"
2. Try to submit with invalid phone
   - Should show: "Invalid Turkish phone number format"
3. Try to submit with invalid URL
   - Should show: "Must be a valid URL"
4. Try to submit empty required fields
   - Should show field-specific errors

## 🎨 UI Features to Notice

### Multi-Step Progress Indicator
- Shows current step (1, 2, or 3)
- Completed steps show checkmark
- Active step highlighted in blue
- Progress bar between steps

### Form Validation
- Real-time validation on submit
- Clear error messages in red
- Help text for complex fields
- Required field indicators

### Status Badges
- 🟡 Yellow badge for "Pending"
- ✅ Green badge for "Approved"
- ❌ Red badge for "Rejected"

### Information Boxes
- Blue info boxes with process steps
- Yellow warning boxes for pending status
- Green success boxes for approval
- Red alert boxes for rejection

## 📊 Database Verification

### Check Applications in Database
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM producer_applications"
```

### Check User Producer Status
```bash
npx wrangler d1 execute webapp-production --local \
  --command="SELECT id, email, is_producer, producer_application_id FROM users"
```

## 🔍 Troubleshooting

### Application Not Showing
- Check if user is logged in
- Verify JWT token in localStorage
- Check browser console for errors

### Validation Errors
- Turkish ID must be exactly 11 digits
- Phone must start with 05 or +905
- URLs must start with http:// or https://

### Admin Panel Access Denied
- Verify user has 'admin' role
- Check JWT token is valid
- Ensure correct admin credentials

### Upload Still Blocked After Approval
- Check user's is_producer flag in database
- Verify application status is 'approved'
- Try logging out and back in

## 📱 Responsive Design

### Mobile View (< 768px)
- Single column layout
- Full-width form fields
- Stacked step indicators
- Touch-friendly buttons

### Tablet View (768px - 1024px)
- Two-column grid for form fields
- Side-by-side social links
- Compact navigation

### Desktop View (> 1024px)
- Optimal layout with max-width
- Multi-column forms
- Full feature set visible

## 🌍 Language Testing

### Switch to Turkish
1. Click "TR" in navigation
2. All text translates to Turkish
3. Form labels in Turkish
4. Error messages in Turkish

### Test Turkish Characters
- Enter: "Ahmet Yılmaz Çetin"
- Should accept: ğ, ü, ş, ö, ç, İ, Ğ, Ü, Ş, Ö, Ç

## 🎯 Key Points to Demo

1. **Multi-step form** - Smooth progression through 3 steps
2. **Real-time validation** - Immediate feedback on errors
3. **Turkish ID algorithm** - Smart validation, not just format
4. **Optional fields** - Social and portfolio links are optional
5. **Admin workflow** - Complete review process
6. **Access control** - Upload blocking until approved
7. **Internationalization** - Full EN/TR support
8. **Responsive design** - Works on all devices
9. **Status tracking** - Clear status indicators
10. **Professional UI** - Polished, production-ready

## 📚 Additional Resources

- **Full Documentation**: `PRODUCER_APPLICATION_SYSTEM.md`
- **Implementation Summary**: `M2_PROMPT_D_IMPLEMENTATION.md`
- **Code Repository**: `/home/user/webapp`
- **API Routes**: `src/routes/producer.ts`
- **Form Component**: `src/components/ProducerApplicationForm.tsx`

---

**Live Demo URL**: https://3000-id959002w1ad3ffz4zxwm-d0b9e1e2.sandbox.novita.ai

**Test Credentials**:
- User with pending app: `john@example.com` / `password123`
- Approved producer: `jane@example.com` / `password123`
- Admin reviewer: `admin@webapp.com` / `password123`

**Status**: ✅ Fully Functional
**Date**: 2026-01-07
