# Ultramed MVP Engineering Specification
## Clinic Platform (EHR + CRM + POS + MLM) for Thailand

---

## 1. MVP Scope Definition

### Must-Have Features (MVP Core)
- **EHR**: Patient profiles, HN generation, basic SOAP notes, medication templates
- **CRM**: Basic membership tiers, patient wallet
- **POS**: Product sales, basic payment methods (cash, QR)
- **Inventory**: SKU management, stock tracking
- **User Management**: Basic roles (Admin, Doctor, Staff)
- **Settings**: Theme, clinic info, basic customization

### Future Features (Post-MVP)
- Thai ID card reading & OCR
- AI-assisted SOAP notes (ChatGPT integration)
- Advanced lab charts/graphs
- MLM commission calculations
- Google Calendar sync
- Advanced reporting & analytics
- Multi-language support
- Thermal printer integration

---

## 2. Technical Architecture

### Frontend Stack
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **PDF Generation**: React-PDF
- **Notifications**: React Hot Toast

### Backend Stack
- **Runtime**: Node.js + Express.js
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + bcrypt
- **File Storage**: AWS S3 / Local storage
- **Payment**: PromptPay QR generation
- **API Documentation**: Swagger/OpenAPI

### Database Schema (Core Tables)
```sql
-- Users & Authentication
users (id, email, password_hash, role, clinic_id, created_at)
clinics (id, name, logo_url, theme_color, settings_json)

-- Patient Management
patients (id, hn, first_name, last_name, thai_id, phone, email, address, insurance_info, image_url, clinic_id)
visits (id, patient_id, doctor_id, visit_date, soap_notes, diagnosis_codes, status)
medications (id, visit_id, name, dosage, frequency, duration)

-- Inventory & Products
products (id, sku, name, category, price, cost, stock_quantity, low_stock_threshold, image_url, clinic_id)
inventory_transactions (id, product_id, type, quantity, reference_id, created_at)

-- Sales & Payments
orders (id, patient_id, staff_id, total_amount, discount_amount, payment_method, status, created_at)
order_items (id, order_id, product_id, quantity, unit_price)
payments (id, order_id, amount, method, reference_id, status, created_at)

-- Membership & Wallet
memberships (id, name, discount_percentage, benefits_json, clinic_id)
patient_memberships (id, patient_id, membership_id, start_date, end_date)
wallet_transactions (id, patient_id, type, amount, description, reference_id, created_at)
```

### Security & Compliance
- HTTPS enforcement
- JWT token expiration (24h)
- Role-based access control (RBAC)
- Input validation & sanitization
- SQL injection prevention (Prisma ORM)
- File upload restrictions
- Data encryption for sensitive fields

---

## 3. Key User Stories & Acceptance Criteria

### Story 1: Patient Registration
**As a** clinic staff member  
**I want to** register new patients with auto-generated HN  
**So that** I can maintain unique patient records  

**Acceptance Criteria:**
- Auto-generate sequential HN (format: YYMMDD-XXX)
- Prevent duplicate patient names with confirmation dialog
- Capture basic demographics (name, phone, address, insurance)
- Upload patient photo (optional)
- Validate Thai phone number format

### Story 2: Patient Visit Management
**As a** doctor  
**I want to** create and manage patient visits  
**So that** I can maintain medical records  

**Acceptance Criteria:**
- Create new visit with date/time
- Record SOAP notes with rich text editor
- Add ICD-10 diagnosis codes (searchable dropdown)
- Prescribe medications with templates
- Save visit and generate summary

### Story 3: Product Sales (POS)
**As a** clinic staff  
**I want to** sell products to patients  
**So that** I can process transactions efficiently  

**Acceptance Criteria:**
- Search products by name/SKU
- Add items to cart with quantity
- Apply membership discounts automatically
- Process payment (cash/QR code)
- Generate receipt (digital/print)
- Update inventory automatically

### Story 4: Inventory Management
**As a** clinic manager  
**I want to** manage product inventory  
**So that** I can track stock levels and prevent shortages  

**Acceptance Criteria:**
- Add/edit products with SKU, pricing, images
- Set low-stock thresholds with alerts
- View inventory levels and transaction history
- Import/export product data via CSV
- Generate inventory reports

### Story 5: Patient Wallet & Membership
**As a** patient  
**I want to** use my wallet balance and membership benefits  
**So that** I can get discounts and convenient payments  

**Acceptance Criteria:**
- View wallet balance and transaction history
- Add funds to wallet (cash/transfer)
- Apply wallet balance to purchases
- Display membership tier and benefits
- Calculate automatic discounts

### Story 6: User Role Management
**As a** clinic administrator  
**I want to** manage user accounts and permissions  
**So that** I can control system access  

**Acceptance Criteria:**
- Create user accounts (Admin, Doctor, Staff)
- Assign roles with specific permissions
- Deactivate/reactivate users
- View user activity logs
- Reset passwords

### Story 7: Clinic Settings Configuration
**As a** clinic administrator  
**I want to** customize clinic settings  
**So that** I can brand and configure the system  

**Acceptance Criteria:**
- Upload clinic logo and set theme colors
- Configure clinic information (name, address, contact)
- Set default language (Thai/English)
- Customize patient form fields
- Configure receipt templates

### Story 8: Financial Reporting
**As a** clinic manager  
**I want to** view sales and financial reports  
**So that** I can track business performance  

**Acceptance Criteria:**
- Daily/weekly/monthly sales summaries
- Product performance reports
- Payment method breakdowns
- Outstanding balances
- Export reports to PDF/Excel

### Story 9: Medical Certificate Generation
**As a** doctor  
**I want to** generate medical certificates  
**So that** I can provide official documentation  

**Acceptance Criteria:**
- Select certificate type (sick leave, fitness, travel)
- Auto-fill patient information
- Edit certificate content
- Preview before printing
- Save as PDF and print

### Story 10: Patient Search & History
**As a** clinic staff  
**I want to** search patients and view their history  
**So that** I can provide continuity of care  

**Acceptance Criteria:**
- Search by name, HN, phone, or Thai ID
- View patient profile with photo
- Display visit history chronologically
- Show medication history and allergies
- Quick access to recent visits

---

## 4. UI/UX Guidelines

### Design System
- **Primary Color**: Teal (#14B8A6)
- **Secondary Colors**: Gray scale (#F9FAFB to #111827)
- **Typography**: Inter font family
- **Spacing**: 4px grid system (4, 8, 12, 16, 24, 32px)
- **Border Radius**: 6px for cards, 4px for buttons
- **Shadows**: Subtle shadows for depth

### Layout Principles
- **Sidebar Navigation**: Collapsible with icons
- **Header**: Clinic logo, user profile, notifications
- **Content Area**: Centered with max-width constraints
- **Mobile-First**: Responsive design for tablets/phones
- **Touch-Friendly**: 44px minimum touch targets

### Key Screen Layouts

#### Dashboard
- Quick stats cards (patients today, revenue, alerts)
- Recent activities timeline
- Shortcuts to common actions

#### Patient Profile
- Photo and basic info header
- Tabbed interface (Profile, Visits, Wallet, History)
- Action buttons (New Visit, Add Payment, Edit)

#### POS Interface
- Product search/browse on left
- Shopping cart on right
- Payment methods at bottom
- Large, touch-friendly buttons

#### Visit Form
- Patient info header (read-only)
- SOAP notes with structured input
- Medication section with templates
- Diagnosis code selector

### Error Handling
- Inline validation messages
- Toast notifications for actions
- Graceful fallbacks for failed requests
- Clear error states with recovery options

---

## 5. Three-Month Sprint Roadmap

### Sprint 1 (Weeks 1-4): Foundation
**Frontend Developer:**
- Set up React + TypeScript project structure
- Implement authentication flow (login/logout)
- Create basic layout with sidebar navigation
- Build user management screens

**Backend Developer:**
- Set up Node.js + Express + PostgreSQL
- Implement JWT authentication
- Create user and clinic management APIs
- Set up database schema and migrations

**QA Engineer:**
- Set up testing environment
- Create test plan documentation
- Begin manual testing of auth flow
- Set up automated testing framework

### Sprint 2 (Weeks 5-8): Core EHR
**Frontend Developer:**
- Patient registration and search
- Patient profile management
- Visit creation and SOAP notes
- Basic medication prescribing

**Backend Developer:**
- Patient management APIs
- Visit and medical record APIs
- File upload for patient photos
- Basic reporting endpoints

**QA Engineer:**
- Test patient management flows
- Validate data integrity
- Performance testing for search
- Security testing for file uploads

### Sprint 3 (Weeks 9-12): POS & Inventory
**Frontend Developer:**
- Product management interface
- POS sales interface
- Inventory tracking screens
- Payment processing UI

**Backend Developer:**
- Product and inventory APIs
- Sales transaction processing
- Payment method integration
- Inventory alerts and reporting

**QA Engineer:**
- End-to-end testing of sales flow
- Inventory accuracy validation
- Payment processing testing
- User acceptance testing prep

---

## 6. Test Plan Overview

### Functional Testing
- **User Authentication**: Login, logout, password reset
- **Patient Management**: CRUD operations, search, validation
- **Visit Management**: Create visits, SOAP notes, prescriptions
- **POS Operations**: Product sales, payments, receipts
- **Inventory**: Stock management, alerts, reporting
- **User Roles**: Permission-based access control

### Security Testing
- **Authentication**: JWT token validation, session management
- **Authorization**: Role-based access control
- **Input Validation**: SQL injection, XSS prevention
- **File Upload**: Type restrictions, size limits
- **Data Protection**: Sensitive data encryption

### Usability Testing
- **Navigation**: Intuitive menu structure
- **Forms**: Clear validation and error messages
- **Mobile Experience**: Touch-friendly interface
- **Performance**: Page load times under 3 seconds
- **Accessibility**: Basic WCAG compliance

### Edge Cases
- **Network Issues**: Offline behavior, error recovery
- **Data Limits**: Large patient databases, file uploads
- **Concurrent Users**: Multiple staff accessing same records
- **Data Migration**: Import existing patient data
- **System Failures**: Database backup and recovery

---

## 7. Go-to-Market Checklist

### Pre-Launch (4 weeks before pilot)
- [ ] Complete MVP development and testing
- [ ] Prepare user training materials (videos, guides)
- [ ] Set up production infrastructure (hosting, backups)
- [ ] Conduct security audit and penetration testing
- [ ] Create data migration tools for existing patient records
- [ ] Prepare customer support documentation

### Pilot Selection & Setup (2 weeks before)
- [ ] Select 3 pilot clinics (small, medium, diverse specialties)
- [ ] Sign pilot agreements with success metrics
- [ ] Install and configure system at each clinic
- [ ] Import existing patient data
- [ ] Train clinic staff (2-hour sessions per role)
- [ ] Set up monitoring and feedback collection

### Launch Week
- [ ] Go-live support (on-site for first 3 days)
- [ ] Daily check-ins with clinic managers
- [ ] Monitor system performance and errors
- [ ] Collect user feedback and usage analytics
- [ ] Document issues and feature requests

### Post-Launch (Weeks 2-8)
- [ ] Weekly feedback sessions with each clinic
- [ ] Analyze usage patterns and adoption rates
- [ ] Prioritize bug fixes and improvement requests
- [ ] Measure key success metrics:
  - Patient registration time reduction (target: 50%)
  - Visit documentation completeness (target: 90%)
  - POS transaction speed (target: <2 minutes)
  - User satisfaction score (target: 4/5)
- [ ] Prepare case studies and testimonials
- [ ] Plan expansion to additional clinics

### Success Metrics
- **Efficiency**: 30% reduction in administrative time
- **Accuracy**: 95% data accuracy in patient records
- **Adoption**: 80% daily active users within 4 weeks
- **Satisfaction**: 4/5 average user rating
- **Revenue**: 15% increase in product sales through POS

---

## Technical Implementation Notes

### Development Environment Setup
```bash
# Frontend
npx create-react-app ultramed-frontend --template typescript
cd ultramed-frontend
npm install @tailwindcss/forms @headlessui/react
npm install zustand react-hook-form @hookform/resolvers zod
npm install react-hot-toast recharts @react-pdf/renderer

# Backend
mkdir ultramed-backend && cd ultramed-backend
npm init -y
npm install express cors helmet bcryptjs jsonwebtoken
npm install prisma @prisma/client multer swagger-ui-express
npm install -D @types/node @types/express nodemon typescript
```

### Deployment Architecture
- **Frontend**: Vercel/Netlify (static deployment)
- **Backend**: Railway/Heroku (containerized deployment)
- **Database**: PostgreSQL (managed service)
- **File Storage**: AWS S3 or local filesystem
- **Monitoring**: Sentry for error tracking
- **Analytics**: Google Analytics for usage insights

This specification provides a comprehensive roadmap for building Ultramed's MVP while maintaining focus on core functionality and user experience.