# Development Plan: "À quoi on joue ?"

**Kids Activity Picker Web App**

---

## 1. Overview

A kid-friendly web application to help children (ages 7 and 10) independently choose screen-free activities. The app features a browsable activity list with images, filtering options, favorites, and a random picker. Includes an admin panel for parents to manage content.

**Language**: French
**Target Device**: Tablet (especially iPad)
**Hosting**: Local home server
**Integration**: Embeddable in Home Assistant dashboard

---

## 2. Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React or similar
- **State Management**: React hooks (useState, useContext)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **File Upload**: Multer
- **CORS**: cors middleware

### Data Storage
- **Activities**: JSON file (`activities.json`)
- **Images**: Local filesystem (`/public/images/activities/`)
- **Favorites**: LocalStorage (client-side)

### Deployment
- **Containerization**: Docker + Docker Compose
- **Web Server**: Express serves both API and static React build

---

## 3. Project Structure

```
à-quoi-on-joue/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── ActivityList.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── SurpriseMeButton.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── types/
│   │   │   └── Activity.ts
│   │   ├── hooks/
│   │   │   ├── useActivities.ts
│   │   │   └── useFavorites.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── images/
│   ├── package.json
│   └── vite.config.ts
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── activities.ts
│   │   │   └── admin.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── data/
│   │   │   └── activities.json
│   │   └── server.ts
│   ├── uploads/              # Uploaded images
│   └── package.json
│
├── docker-compose.yml
├── Dockerfile
├── README.md
└── development_plan.md
```

---

## 4. Data Model

### Activity Type (TypeScript)

```typescript
interface Activity {
  id: string;
  name: string;
  image: string;              // filename or URL
  tags: {
    location: 'indoor' | 'outdoor' | 'both';
    participants: ('solo' | 'sibling' | 'family')[];
  };
  isFavorite?: boolean;       // managed client-side
  createdAt: string;
}
```

---

## 5. Implementation Steps

### Phase 1: Project Setup
- [ ] Initialize Vite React TypeScript project
- [ ] Install dependencies (React, Tailwind, Express, etc.)
- [ ] Configure Tailwind CSS
- [ ] Set up folder structure
- [ ] Create TypeScript types

### Phase 2: Backend Development
- [ ] Create Express server
- [ ] Implement REST API endpoints:
  - `GET /api/activities` - List all activities
  - `POST /api/activities` - Add new activity (admin)
  - `PUT /api/activities/:id` - Update activity (admin)
  - `DELETE /api/activities/:id` - Delete activity (admin)
  - `POST /api/upload` - Upload image (admin)
- [ ] Add simple password authentication for admin routes
- [ ] Set up file upload handling with Multer
- [ ] Create `activities.json` with starter data

### Phase 3: Kids UI (Main Interface)
- [ ] **Activity List View**
  - Display activities as cards with image, name, tags
  - Implement responsive grid layout
  - Large touch targets (min 44x44px)

- [ ] **Filter Bar**
  - Indoor/Outdoor toggle
  - Solo/Sibling/Family multi-select
  - Clear filters button

- [ ] **Favorites System**
  - Star icon to mark/unmark favorites
  - Store favorites in localStorage
  - Filter to show only favorites

- [ ] **"Surprise Me" Button**
  - Random activity picker
  - Full-screen modal showing selected activity
  - "Encore!" (Again) button to pick another

- [ ] **French Text**
  - All UI labels in French
  - Activity names and descriptions in French

### Phase 4: Admin Panel
- [ ] Create admin route (`/admin`)
- [ ] Password protection (simple input check)
- [ ] **Activity Management**
  - Form to add new activities
  - Edit existing activities
  - Delete activities
  - Upload/select images
  - Assign tags
- [ ] Image preview before upload
- [ ] Success/error notifications

### Phase 5: Styling & UX
- [ ] Kid-friendly color scheme (bright, playful)
- [ ] Large, colorful buttons
- [ ] Smooth animations (fade-in, slide)
- [ ] Image optimization (lazy loading)
- [ ] Tablet-optimized layout (iPad 10.2", iPad Pro)
- [ ] Touch-friendly interactions
- [ ] Minimal text per screen

### Phase 6: Starter Content
- [ ] Generate or source images for 10 starter activities:
  1. Chasse au Trésor
  2. Statues Musicales
  3. Course de Cuillères
  4. Dessin à l'Aveugle
  5. Cache-Cache
  6. Jeu de Mime
  7. Yoga Animalier
  8. Chasse aux Couleurs
  9. Tente en Couverture
  10. Pique-nique Imaginaire
- [ ] Pre-populate `activities.json`

### Phase 7: Deployment
- [ ] Create Dockerfile
- [ ] Create Docker Compose configuration
- [ ] Build production React bundle
- [ ] Configure Express to serve static files
- [ ] Test local deployment
- [ ] Document Home Assistant iframe embedding
- [ ] Write setup instructions in README

### Phase 8: Testing & Refinement
- [ ] Test on iPad (primary device)
- [ ] Test filtering logic
- [ ] Test favorites persistence
- [ ] Test admin panel CRUD operations
- [ ] Test image uploads
- [ ] Test "Surprise Me" randomizer
- [ ] Fix any bugs or UX issues

---

## 6. API Endpoints

### Public Endpoints
- `GET /api/activities` - Retrieve all activities

### Admin Endpoints (Password Protected)
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity
- `POST /api/admin/upload` - Upload activity image

---

## 7. Key Features Detail

### Filter System
- **Location**: Radio buttons (Indoor / Outdoor / Tous)
- **Participants**: Checkboxes (Solo / Frère et sœur / Famille)
- Filters apply in real-time
- Show activity count: "12 activités trouvées"

### Surprise Me Feature
- Button with dice icon: "Surprise-moi! 🎲"
- Randomly selects from filtered results (or all if no filters)
- Full-screen overlay showing:
  - Activity image (large)
  - Activity name
  - Tags
  - "Encore!" button (pick another)
  - "Fermer" button (close)

### Favorites
- Star icon on each activity card
- Filled star ⭐ = favorite
- Empty star ☆ = not favorite
- Stored in `localStorage` as array of activity IDs
- Filter option: "Mes favoris"

### Admin Panel Access
- Option 1: Hidden route `/admin` + password prompt
- Option 2: URL parameter `/admin?key=password`
- Simple password check (stored in environment variable)
- No complex authentication needed

---

## 8. French Text Strings

### Kids UI
- **Title**: "À quoi on joue ?"
- **Filters**:
  - "Intérieur" / "Extérieur" / "Tous"
  - "Solo" / "Frère et sœur" / "Famille"
  - "Mes favoris"
  - "Effacer les filtres"
- **Buttons**:
  - "Surprise-moi! 🎲"
  - "Encore!"
  - "Fermer"
- **Status**: "X activités trouvées"

### Admin UI
- "Panneau d'administration"
- "Ajouter une activité"
- "Nom de l'activité"
- "Télécharger une image"
- "Type de jeu"
- "Enregistrer"
- "Annuler"

---

## 9. Responsive Breakpoints

- **Mobile**: < 640px (not priority)
- **Tablet**: 640px - 1024px (PRIMARY TARGET)
- **Desktop**: > 1024px

### Tablet Layout
- 2-column grid for activities
- Large filter buttons at top
- Fixed "Surprise Me" button (always visible)
- Min touch target: 44x44px
- Font sizes: 18px+ for readability

---

## 10. Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy built frontend
COPY client/dist ./client/dist

# Copy server
COPY server ./server

EXPOSE 3000
CMD ["node", "server/src/server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./server/data:/app/server/data
      - ./server/uploads:/app/server/uploads
    environment:
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
```

---

## 11. Home Assistant Integration

### Iframe Card Config
```yaml
type: iframe
url: http://localhost:3000
aspect_ratio: 75%
```

### Panel Iframe (Full Page)
```yaml
panel_iframe:
  activities:
    title: "À quoi on joue ?"
    url: http://localhost:3000
    icon: mdi:gamepad-variant
```

---

## 12. Future Enhancements (Out of Scope)

- [ ] Activity timer (set duration)
- [ ] Activity history tracking
- [ ] Weather-based suggestions (outdoor only when sunny)
- [ ] Age-appropriate filtering
- [ ] Multi-language support (beyond French)
- [ ] Activity ratings/reviews
- [ ] Print activity cards

---

## 13. Success Criteria

✅ Kids can browse 10+ activities with images
✅ Filters work correctly (location, participants)
✅ Favorites can be marked and filtered
✅ "Surprise Me" randomly picks an activity
✅ All text is in French
✅ App works smoothly on iPad
✅ Admin can add/edit/delete activities
✅ App runs locally via Docker
✅ App embeds in Home Assistant dashboard

---

## 14. Development Timeline Estimate

- **Phase 1-2** (Setup & Backend): 4-6 hours
- **Phase 3** (Kids UI): 8-10 hours
- **Phase 4** (Admin Panel): 4-6 hours
- **Phase 5** (Styling): 4-6 hours
- **Phase 6** (Content): 2-3 hours
- **Phase 7** (Deployment): 2-3 hours
- **Phase 8** (Testing): 2-4 hours

**Total Estimate**: 26-38 hours

---

## 15. Getting Started Checklist

- [ ] Review this development plan
- [ ] Confirm tech stack choices
- [ ] Set up development environment
- [ ] Initialize project repository
- [ ] Begin Phase 1 implementation

---

**Document Version**: 1.0
**Last Updated**: 2025-10-07
**Status**: Ready for Development
