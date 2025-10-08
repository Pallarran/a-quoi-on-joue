# Quick Start Guide 🚀

## First Time Setup

### 1. Install Dependencies
```bash
npm run install:all
```

This will install dependencies for both the client and server.

## Development Mode

You need to run **two terminal windows**:

### Terminal 1: Backend Server
```bash
npm run dev:server
```

The server will start on http://localhost:3000

### Terminal 2: Frontend App
```bash
npm run dev:client
```

The app will start on http://localhost:5173

### Access the App
- **Kids Interface**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin (password: `admin123`)

## Production Mode (Docker)

### Build and Run
```bash
npm run docker:up
```

### Access
- **App**: http://localhost:3000
- **Admin**: http://localhost:3000/admin

### View Logs
```bash
npm run docker:logs
```

### Stop
```bash
npm run docker:down
```

## Default Admin Password

**Username**: None (just password)
**Password**: `admin123`

⚠️ **Important**: Change this in production!

Edit `server/.env`:
```env
ADMIN_PASSWORD=your_secure_password_here
```

## Adding Custom Images

1. Place your images in `server/public/images/`
2. Use these filenames (or upload via admin panel):
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

## Troubleshooting

### Port Already in Use
If port 3000 or 5173 is in use:

**Find the process (Windows)**:
```bash
netstat -ano | findstr :3000
```

**Kill the process**:
```bash
taskkill /PID <process_id> /F
```

### App Can't Connect to Server
1. Ensure backend is running on port 3000
2. Check `client/.env` has correct API URL
3. Clear browser cache and refresh

### Images Not Showing
- Images will use placeholders if files don't exist
- Add real images to `server/public/images/` directory
- Or upload via admin panel

## Next Steps

1. ✅ Start both servers (backend + frontend)
2. ✅ Open http://localhost:5173 in your browser
3. ✅ Test the kids interface
4. ✅ Go to /admin and add/edit activities
5. ✅ Add your own images
6. ✅ Change the admin password
7. ✅ Deploy with Docker when ready!

Enjoy! 🎉
