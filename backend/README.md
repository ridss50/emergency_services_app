### `server/README.md` (Backend)

````markdown
# Emergency Services API — Backend (Node.js + Express + TypeScript)

Fast in-memory REST API with seeded ambulance & doctor data.

## Features

- Full CRUD
- 25 pre-loaded realistic services (NYC area)
- Real latitude/longitude for distance calculation
- CORS enabled
- Hot reload in development

## API Endpoints

GET /api/services
GET /api/services/:id
POST /api/services
PUT /api/services/:id
DELETE /api/services/:id

## How to Clone & Start

```bash
 Start the backend
npm run dev   → Development with auto-restart (recommended)
npm run build → Compile TypeScript
npm start     → Run compiled version
npm run test  → Run Jest tests
```
````
