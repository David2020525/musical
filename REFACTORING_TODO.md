# MusicHub Refactoring Progress

## Goal: Create Consistent, Maintainable Codebase for M2 & M3

---

## Phase 1: Foundation ✅ IN PROGRESS

### Shared Components
- [x] Create `SharedNavigation.ts` - ✅ Done
- [x] Create `SharedFooter.ts` - ✅ Done  
- [x] Add missing i18n keys (newsletter, etc.) - ✅ Done
- [ ] Test shared components in isolation
- [ ] Create shared `AuthCheck.ts` utility
- [ ] Create shared `PlayerBar.ts` component (for M2)

### Documentation
- [x] Create PROJECT_AUDIT.md - ✅ Done
- [x] Create REFACTORING_TODO.md - ✅ This file

---

## Phase 2: Core Pages Refactor 🔄 NEXT

### Priority: High-Traffic Pages First

#### Home Page
- [ ] Import SharedNavigation
- [ ] Import SharedFooter
- [ ] Remove duplicate nav/footer code
- [ ] Test language switching
- [ ] Test auth dropdown
- [ ] Verify all translations work

#### Dashboard Page (Most Complex)
- [ ] Import SharedNavigation
- [ ] Import SharedFooter
- [ ] Remove duplicate nav/footer code
- [ ] Ensure producer/listener views work
- [ ] Test wallet display (prep for M2)
- [ ] Test track upload link (prep for M2)

#### Browse Page
- [ ] Import SharedNavigation
- [ ] Import SharedFooter
- [ ] Add missing content translations
- [ ] Test filters
- [ ] Test pagination
- [ ] Verify responsive grid

#### Track Detail Page
- [ ] Import SharedNavigation
- [ ] Import SharedFooter
- [ ] Add "Buy Now" button (prep for M2 payments)
- [ ] Add download button logic (prep for M2)
- [ ] Test audio preview player
- [ ] Add producer card

#### Forum Page
- [ ] Import SharedNavigation
- [ ] Import SharedFooter
- [ ] Complete content translations
- [ ] Test topic creation
- [ ] Test reply functionality (prep for M2)

#### Profile Page
- [ ] Import SharedNavigation
- [ ] Import SharedFooter
- [ ] Add edit functionality (prep for M2)
- [ ] Test track portfolio display
- [ ] Add tabs (Tracks, About, Activity)

#### Blog Pages
- [ ] Import SharedNavigation
- [ ] Import SharedFooter
- [ ] Complete blog list translations
- [ ] Complete blog detail translations
- [ ] Test article reading flow

---

## Phase 3: Auth Pages (Add Locale Support) 🔜 MEDIUM PRIORITY

### All auth pages need /:locale/ prefix

#### Login Page
- [ ] Add `locale: Locale` parameter
- [ ] Import SharedNavigation (minimal nav for auth pages)
- [ ] Import SharedFooter (minimal footer)
- [ ] Add all translations
- [ ] Update form labels
- [ ] Update error messages
- [ ] Test login flow with both locales

#### Register Page
- [ ] Add locale support
- [ ] Add SharedNavigation/Footer
- [ ] Translate all form fields
- [ ] Add "I'm a producer" checkbox translation
- [ ] Test registration flow
- [ ] Test email verification flow

#### Forgot Password
- [ ] Add locale support
- [ ] Add SharedNavigation/Footer
- [ ] Translate form
- [ ] Test password reset flow

#### Reset Password
- [ ] Add locale support
- [ ] Add SharedNavigation/Footer
- [ ] Translate form
- [ ] Test with reset token

#### Verify Email
- [ ] Add locale support
- [ ] Add SharedNavigation/Footer
- [ ] Translate success/error messages
- [ ] Test verification flow

#### Producer Application
- [ ] Add locale support
- [ ] Add SharedNavigation/Footer
- [ ] Translate multi-step form
- [ ] Add Turkish field labels
- [ ] Test KYC submission (prep for M2)

---

## Phase 4: Complete Translation Coverage 📝 ONGOING

### Content Needing Translation

#### Browse Page Content
- [ ] Filter labels
- [ ] Sort options
- [ ] Empty state messages
- [ ] Pagination text
- [ ] Price labels (TL/Free)

#### Forum Content
- [ ] Category names
- [ ] Post action buttons
- [ ] Reply form labels
- [ ] Moderator actions
- [ ] Empty states

#### Blog Content
- [ ] Article metadata (date, author)
- [ ] Read time labels
- [ ] Category names
- [ ] Tags
- [ ] Comments section (if added)

#### Profile Content
- [ ] Bio section
- [ ] Tab names
- [ ] Track statistics labels
- [ ] Follow/Unfollow buttons
- [ ] Edit profile labels

#### Dashboard Content
- [ ] Statistics labels
- [ ] Action button text
- [ ] Empty states
- [ ] Wallet display labels
- [ ] Upload track prompts

#### Track Detail Content
- [ ] Action buttons (Buy, Download, Add to Cart)
- [ ] Track metadata labels
- [ ] License type descriptions
- [ ] Producer info section
- [ ] Similar tracks section

---

## Phase 5: Admin & Routes 🔧 LOW PRIORITY (But Critical for M2)

### Admin Pages (Need Locale Support)

#### Admin Dashboard
- [ ] Add locale support
- [ ] Add SharedNavigation (admin variant)
- [ ] Translate stat cards
- [ ] Translate activity log

#### Producer Applications Management
- [ ] Add locale support
- [ ] Translate table headers
- [ ] Translate approval/rejection messages
- [ ] Translate email notifications

#### User Management
- [ ] Add locale support
- [ ] Translate user table
- [ ] Translate role labels
- [ ] Translate action buttons

#### Transactions (M2)
- [ ] Page structure ready
- [ ] Locale support planned
- [ ] Translation keys prepared

#### Content Management (M2)
- [ ] Blog post editor
- [ ] Announcements
- [ ] Hero slider management

#### Forum Moderation (M2)
- [ ] Moderation controls
- [ ] Ban/delete actions

### Route Updates in index.tsx
- [ ] Ensure ALL routes use `/:locale/` prefix
- [ ] Add locale validation middleware
- [ ] Add locale detection (from URL or browser)
- [ ] Test route generation
- [ ] Update sitemap generation

---

## M2 Preparation Checklist 🎯

### Database Integration Points
- [ ] Auth pages ready for real authentication
- [ ] Dashboard ready for real wallet data
- [ ] Browse page ready for real track data
- [ ] Profile pages ready for user data
- [ ] Forum ready for post/reply data

### File Upload Integration Points
- [ ] Track upload page structure
- [ ] Artwork upload handling
- [ ] Audio file upload handling
- [ ] File validation logic prepared
- [ ] R2 storage integration points marked

### Payment Integration Points
- [ ] "Buy Now" button functional structure
- [ ] Checkout flow page prepared
- [ ] Payment success/failure pages ready
- [ ] Download authorization logic prepared
- [ ] Wallet balance display ready

### Email Notification Points
- [ ] Registration email templates ready
- [ ] Password reset email templates ready
- [ ] Purchase confirmation templates ready
- [ ] Producer approval templates ready
- [ ] Withdrawal processed templates ready

---

## Testing Checklist 🧪

### Per-Page Testing (After Refactor)
- [ ] Navigation displays correctly
- [ ] Footer displays correctly
- [ ] Language switcher works
- [ ] Auth dropdown works (when logged in)
- [ ] Login button shows (when logged out)
- [ ] All links have correct locale prefix
- [ ] All translations load
- [ ] Responsive design works
- [ ] No console errors

### Cross-Page Testing
- [ ] Audio player persists across navigation (M2)
- [ ] User session persists
- [ ] Language preference persists
- [ ] No layout shifts when navigating

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Current Status: Phase 1 - 50% Complete

**Completed:**
- ✅ Project audit document
- ✅ SharedNavigation component
- ✅ SharedFooter component
- ✅ Newsletter translations

**Next Steps:**
1. Test shared components
2. Start refactoring Home page
3. Continue with Dashboard page
4. Update remaining core pages

**Estimated Completion:**
- Phase 1: 2 hours remaining
- Phase 2: 4 hours
- Phase 3: 3 hours
- Phase 4: 3 hours
- Phase 5: 2 hours

**Total Remaining: ~14 hours**

---

## Notes for M2 & M3 Implementation

### Architecture Decisions
- **SSR with Cloudflare Workers**: Keep current architecture, it's correct
- **Locale in URL**: All routes MUST have `/:locale/` prefix
- **Shared Components**: ALL pages use same nav/footer
- **Translations**: 100% coverage before M2 starts

### Database Schema Ready
- All pages designed with database fields in mind
- Forms match database structure
- Ready for Prisma/PostgreSQL integration

### File Upload Ready
- Track upload page structure prepared
- R2 storage integration points identified
- File validation logic placeholders exist

### Payment Ready
- Iyzico integration points marked
- Webhook handlers planned
- Confirmation pages structured

### Security Considerations
- Rate limiting points identified
- CSRF token locations marked
- Input sanitization planned
- File validation required

---

## Questions for Next Session

1. Should admin panel have different styling than main site?
2. Preferred audio player library (Howler.js, Plyr, custom)?
3. Newsletter service preference (Resend, SendGrid)?
4. Error tracking preference (Sentry, LogRocket)?

---

**Last Updated**: 2026-01-16
**Current Phase**: Phase 1 (50% complete)
**Next Milestone**: M2 Database Integration
