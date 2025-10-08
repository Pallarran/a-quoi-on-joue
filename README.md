# À quoi on joue ? 🎮

A kid-friendly web application to help children choose fun, screen-free activities. Built with React, TypeScript, and Express.

## Features

### For Kids 👧👦
- **Browse Activities**: Scrollable grid of activities with images and tags
- **Smart Filters**: Filter by location (Indoor/Outdoor) and participants (Solo/Sibling/Family)
- **Favorites System**: Mark favorite activities with a star ⭐
- **Surprise Me**: Random activity picker for when they can't decide
- **French Interface**: All text in French for your French-speaking kids

### For Parents (Admin Panel) 👨‍👩‍👧‍👦
- **Activity Management**: Add, edit, and delete activities
- **Image Upload**: Upload custom images for activities
- **Tag Assignment**: Categorize activities by location and participants
- **Password Protected**: Simple password authentication to keep kids out

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js + Express
- **Data Storage**: JSON file (simple, no database needed)
- **Deployment**: Docker + Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker & Docker Compose (for production deployment)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "À quoi on joue"
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Client (.env in client/)
   VITE_API_URL=http://localhost:3000

   # Server (.env in server/)
   PORT=3000
   ADMIN_PASSWORD=admin123
   NODE_ENV=development
   ```

4. **Start development servers**

   Open two terminal windows:

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

5. **Access the app**
   - Kids App: http://localhost:5173
   - Admin Panel: http://localhost:5173/admin
   - API: http://localhost:3000/api

### Production Deployment with Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the app**
   - App: http://localhost:3000
   - Admin: http://localhost:3000/admin

3. **Stop the app**
   ```bash
   docker-compose down
   ```

### Environment Variables

Create a `.env` file in the root directory for Docker:

```env
ADMIN_PASSWORD=your_secure_password
```

## Project Structure

```
À quoi on joue/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── ActivityList.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── SurpriseMeButton.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useActivities.ts
│   │   │   └── useFavorites.ts
│   │   ├── types/             # TypeScript types
│   │   │   └── Activity.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── activities.ts  # Activity CRUD endpoints
│   │   │   └── admin.ts       # Admin routes (image upload)
│   │   ├── middleware/
│   │   │   └── auth.ts        # Password authentication
│   │   ├── data/
│   │   │   └── activities.json # Activity data
│   │   └── server.ts          # Express app
│   ├── uploads/               # Uploaded images
│   ├── public/images/         # Static activity images
│   └── package.json
│
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Usage Guide

### Kids Interface

1. **Browse Activities**: Scroll through the activity cards
2. **Filter**: Click on filters to narrow down activities
   - Location: Indoor, Outdoor, or All
   - Participants: Solo, Sibling, Family (can select multiple)
   - Favorites: Show only starred activities
3. **Mark Favorites**: Click the star icon on any activity card
4. **Surprise Me**: Click the floating button to get a random activity suggestion

### Admin Panel

1. **Access**: Navigate to `/admin`
2. **Login**: Enter the admin password (default: `admin123`)
3. **Add Activity**:
   - Click "Nouvelle activité"
   - Fill in the activity name
   - Upload an image or provide URL
   - Select location (Indoor/Outdoor/Both)
   - Select participants (Solo/Sibling/Family)
   - Click "Ajouter"
4. **Edit Activity**: Click the edit icon on any activity
5. **Delete Activity**: Click the trash icon on any activity

## API Endpoints

### Public Endpoints
- `GET /api/activities` - Get all activities

### Admin Endpoints (require `x-admin-password` header)
- `POST /api/activities` - Create activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity
- `POST /api/admin/upload` - Upload image

## Starter Activities

The app comes pre-loaded with 10 French activities:

1. **Chasse au Trésor** - Treasure hunt
2. **Statues Musicales** - Musical statues
3. **Course de Cuillères** - Spoon race
4. **Dessin à l'Aveugle** - Blindfolded drawing
5. **Cache-Cache** - Hide and seek
6. **Jeu de Mime** - Charades
7. **Yoga Animalier** - Animal yoga
8. **Chasse aux Couleurs** - Color scavenger hunt
9. **Tente en Couverture** - Blanket fort
10. **Pique-nique Imaginaire** - Pretend picnic

## Customization

### Adding Custom Images

Place your images in `server/public/images/` with these filenames:
- chasse-tresor.jpg
- statues-musicales.jpg
- course-cuilleres.jpg
- dessin-aveugle.jpg
- cache-cache.jpg
- jeu-mime.jpg
- yoga-animalier.jpg
- chasse-couleurs.jpg
- tente-couverture.jpg
- pique-nique.jpg

Or use the admin panel to upload new images.

### Changing Colors

Edit `client/tailwind.config.js` to customize the color scheme.

### Changing Admin Password

Set `ADMIN_PASSWORD` environment variable in:
- Development: `server/.env`
- Production: Docker Compose `.env` file or `docker-compose.yml`

## Home Assistant Integration

### Option 1: Iframe Card

```yaml
type: iframe
url: http://your-server-ip:3000
aspect_ratio: 75%
```

### Option 2: Panel Iframe (Full Page)

Add to `configuration.yaml`:

```yaml
panel_iframe:
  activities:
    title: "À quoi on joue ?"
    url: http://your-server-ip:3000
    icon: mdi:gamepad-variant
```

## Troubleshooting

### Images not displaying
- Check that images exist in `server/public/images/`
- Verify image paths in `activities.json`
- Check browser console for 404 errors

### Admin panel not working
- Verify admin password matches in server `.env`
- Check browser console for authentication errors
- Ensure `x-admin-password` header is being sent

### App won't start
- Check that ports 3000 and 5173 are not in use
- Verify all dependencies are installed
- Check server logs for errors

## License

MIT License - Feel free to use and modify for your family!

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## Credits

Built with ❤️ for kids who need help choosing what to play!
