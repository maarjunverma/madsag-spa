
# Strapi Content Structure Definition

## 1. Hero (Single Type)
| Field | Type | Description |
|---|---|---|
| headline | String | The main H1 text |
| subtext | Text | Supporting hero text |
| primary_cta | String | Label for primary button |
| secondary_cta | String | Label for secondary button |

## 2. Services (Collection Type)
| Field | Type | Description |
|---|---|---|
| name | String | e.g., "Website Design" |
| slug | UID | Generated from name |
| description | Text | Detailed service description |
| icon | String | FontAwesome class name |
| features | Component (Repeatable) | { text: String } |
| order | Integer | Used for sorting on frontend |
| gradient | String | Tailwind gradient classes |

## 3. Lead (Collection Type)
| Field | Type | Description |
|---|---|---|
| FullName | String | Mandatory |
| Mobile_number | String | Mandatory |
| Email | String | Mandatory |
| Inquiry_subject | String | Mandatory |
| url | String | Optional |
| Message | Text | Mandatory (Long text) |

## 4. API Permissions Configuration (CRITICAL)
To fix "Forbidden" errors, ensure these are set:
1. Navigate to **Settings** > **Users & Permissions Plugin** > **Roles**.
2. Select the **Public** role.
3. Check the following permissions:
   - **Lead**: **`create`** (This allows the form to submit data)
   - **Service**: `find`, `findOne` (Allows the site to load services)
   - **Process-Step**: `find`
4. Save the changes.

## 5. Troubleshooting
- **Forbidden (403)**: Missing 'create' permission in Public Role.
- **Bad Request (400)**: Field name mismatch. Ensure Strapi field names match exactly: `FullName`, `Mobile_number`, etc.
- **Invalid Key**: Ensure no extra fields like `submittedAt` or `source` are sent if they aren't in your collection.
