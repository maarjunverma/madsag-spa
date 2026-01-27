
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

## 3. ProcessStep (Collection Type)
| Field | Type | Description |
|---|---|---|
| title | String | Step heading |
| description | Text | Step body text |
| icon | String | FontAwesome class name |
| order | Integer | Sorting |

## 4. API Permissions Configuration
1. Navigate to **Settings** > **Users & Permissions Plugin** > **Roles**.
2. Select the **Public** role.
3. Check the following permissions:
   - **Hero**: `find`
   - **Service**: `find`, `findOne`
   - **Process-Step**: `find`
4. Save the changes.

## 5. Example Frontend Fetch Logic
```typescript
const fetchServices = async () => {
  const response = await fetch(`${STRAPI_URL}/api/services?populate=*&sort=order:asc`);
  const { data } = await response.json();
  return data;
};
```
