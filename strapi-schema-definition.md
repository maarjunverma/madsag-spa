# Strapi Content Type Setup — MADSAG
# api.madsag.in | Private Reference

## ──────────────────────────────────────
## 1. LEAD (Collection Type)  ← CRITICAL FOR FORM
## ──────────────────────────────────────
API ID (plural): leads
API ID (singular): lead

| Field Name      | Type        | Required | Notes                              |
|-----------------|-------------|----------|------------------------------------|
| FullName        | Short Text  | ✅ YES   | Client/contact full name           |
| Mobile_number   | Short Text  | ✅ YES   | Store as string (supports +91 etc) |
| Email           | Email       | ✅ YES   | Standard email field               |
| Inquiry_subject | Short Text  | ✅ YES   | Service they're interested in      |
| url             | Short Text  | ❌ NO    | Their existing website URL         |
| Message         | Long Text   | ✅ YES   | Project brief / budget info        |

### Strapi Permissions Required
Settings → Users & Permissions → Roles → Public:
- Lead → `create` ✅

### Sample POST Payload (from frontend)
POST https://api.madsag.in/api/leads
Content-Type: application/json

```json
{
  "data": {
    "FullName": "Arjun Sharma",
    "Mobile_number": "9876543210",
    "Email": "arjun@example.com",
    "Inquiry_subject": "Website Development",
    "url": "https://oldsite.com",
    "Message": "Budget: ₹75k – ₹2L\n\nWe need a new website for our brand..."
  }
}
```

---

## ──────────────────────────────────────
## 2. GLOBAL (Single Type)  ← SITE CONFIG
## ──────────────────────────────────────
API ID: global

| Field Name      | Type           | Notes                        |
|-----------------|----------------|------------------------------|
| siteName        | Short Text     | e.g., "MADSAG"               |
| siteDescription | Long Text      | Meta description             |
| footerText      | Long Text      | Footer blurb                 |
| contactEmail    | Email          | Contact email                |
| contactPhone    | Short Text     | Contact phone number         |
| logo            | Media (single) | PNG/SVG logo                 |
| favicon         | Media (single) | ICO/PNG favicon              |
| seo             | Component      | → SEO component (see below)  |

### SEO Component
| Field Name      | Type           |
|-----------------|----------------|
| metaTitle       | Short Text     |
| metaDescription | Long Text      |
| keywords        | Short Text     |
| shareImage      | Media (single) |

### Permissions
- Global → `find` (Public)

---

## ──────────────────────────────────────
## 3. SERVICE (Collection Type)  ← OPTIONAL
## ──────────────────────────────────────
(Currently served from frontend constants.tsx — only needed if you want CMS control)

| Field Name  | Type              |
|-------------|-------------------|
| name        | Short Text        |
| slug        | UID (from name)   |
| description | Long Text         |
| icon        | Short Text        |
| order       | Integer           |
| gradient    | Short Text        |
| features    | Repeatable Comp.  |

### Permissions
- Service → `find`, `findOne` (Public)

---

## ──────────────────────────────────────
## TROUBLESHOOTING QUICK REF
## ──────────────────────────────────────
| Error         | Cause                                | Fix                                |
|---------------|--------------------------------------|------------------------------------|
| 403 Forbidden | Missing Public role permissions      | Enable `create` for Lead in Roles  |
| 400 Bad Req.  | Field name mismatch                  | Check exact casing: `FullName` etc |
| 400 Bad Req.  | Extra unknown fields in payload      | Remove any field not in schema     |
| 404 Not Found | Wrong endpoint path                  | Use `/api/leads` (plural)          |
| CORS Error    | Domain not whitelisted in Strapi     | Add frontend domain to CORS config |

### CORS Config (strapi/config/middlewares.js)
```js
'strapi::cors': {
  config: {
    origin: ['https://madsag.in'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Accept'],
  },
},
```

---

## ──────────────────────────────────────
## 4. BLOG POST (Collection Type)  ← ADMIN DASHBOARD
## ──────────────────────────────────────
API ID (plural): blog-posts
API ID (singular): blog-post

| Field Name  | Type           | Required | Notes                              |
|-------------|----------------|----------|------------------------------------|
| title       | Short Text     | ✅ YES   | Post title                         |
| excerpt     | Long Text      | ✅ YES   | Summary shown on listing page      |
| content     | Long Text      | ✅ YES   | Full markdown content              |
| author      | Short Text     | ✅ YES   | e.g. "MADSAG Team"                 |
| category    | Short Text     | ✅ YES   | e.g. "Strategy", "Design"         |
| readTime    | Short Text     | ❌ NO    | e.g. "5 min read"                  |
| image       | Media (single) | ❌ NO    | Cover image                        |

### Permissions Required
Settings → Users & Permissions → Roles:
- Public → `find`, `findOne` ✅  (for public site)
- Authenticated → `find`, `findOne`, `create`, `update`, `delete` ✅  (for admin dashboard)

### Sample Public Endpoint
GET https://api.madsag.in/api/blog-posts?sort=createdAt:desc&populate=*

---

## ──────────────────────────────────────
## 5. PORTFOLIO ITEM (Collection Type)  ← ADMIN DASHBOARD
## ──────────────────────────────────────
API ID (plural): portfolio-items
API ID (singular): portfolio-item

| Field Name  | Type           | Required | Notes                              |
|-------------|----------------|----------|------------------------------------|
| title       | Short Text     | ✅ YES   | Project title                      |
| client      | Short Text     | ✅ YES   | Client/company name                |
| description | Long Text      | ✅ YES   | What the project is about          |
| challenge   | Long Text      | ❌ NO    | Problem the client faced           |
| solution    | Long Text      | ❌ NO    | How MADSAG solved it               |
| result      | Long Text      | ❌ NO    | Measurable outcome                 |
| tags        | JSON           | ❌ NO    | Array of tag strings               |
| thumbnail   | Media (single) | ❌ NO    | Card thumbnail image               |
| images      | Media (multiple)| ❌ NO   | Gallery images                     |

### Permissions Required
Settings → Users & Permissions → Roles:
- Public → `find`, `findOne` ✅  (for public portfolio section)
- Authenticated → `find`, `findOne`, `create`, `update`, `delete` ✅  (for admin dashboard)

### Sample Public Endpoint
GET https://api.madsag.in/api/portfolio-items?sort=createdAt:desc&populate=*

---

## ──────────────────────────────────────
## ADMIN DASHBOARD ACCESS
## ──────────────────────────────────────
- URL: https://madsag.in/admin  (or http://localhost:5173/admin in dev)
- Auth: Strapi user account (email + password via /api/auth/local)
- JWT stored in localStorage key: `madsag_admin_token`

### CORS Update Required for Admin
Add localhost and production domain to Strapi CORS config:
```js
origin: ['https://madsag.in'],
```

### Backend Project Location
Local Strapi project: d:\madsag-spa-main\madsag-backend\
Run locally: cd madsag-backend && npm run develop
