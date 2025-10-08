# Deployment Guide for Unraid

This guide will help you deploy "À quoi on joue" on your Unraid server and integrate it with Home Assistant.

## Prerequisites

- Unraid server with Docker support
- Git installed on Unraid (or ability to transfer files)
- Home Assistant running at `http://homeassistant.local:8123`
- Port 3010 available on your Unraid server

## Deployment Steps

### 1. Transfer Code to Unraid

**Option A: Using Git (Recommended)**
```bash
cd /mnt/user/appdata/
git clone <your-git-repo-url> a-quoi-on-joue
cd a-quoi-on-joue
```

**Option B: Manual Transfer**
- Copy the entire project folder to `/mnt/user/appdata/a-quoi-on-joue` on your Unraid server

### 2. Set Admin Password (Important!)

Create or edit the `.env` file in the project root:
```bash
cd /mnt/user/appdata/a-quoi-on-joue
echo "ADMIN_PASSWORD=your_secure_password_here" > .env
```

⚠️ **Security Note**: Change `your_secure_password_here` to a strong password!

### 3. Build and Start the Docker Container

```bash
cd /mnt/user/appdata/a-quoi-on-joue
docker-compose up -d
```

This will:
- Build the client application
- Build the server application
- Create a Docker container
- Start the app on port 3010

### 4. Verify Deployment

Check if the container is running:
```bash
docker ps | grep a-quoi-on-joue
```

View logs:
```bash
docker-compose logs -f
```

Test the app by visiting:
- **App**: `http://your-unraid-ip:3010`
- **Admin Panel**: `http://your-unraid-ip:3010/admin`

### 5. Integrate with Home Assistant

Add an iframe card to your Home Assistant dashboard:

```yaml
type: iframe
url: http://your-unraid-ip:3010
aspect_ratio: 75%
```

**For dashboard YAML mode**, add this to your view:
```yaml
- type: iframe
  url: http://your-unraid-ip:3010
  title: À quoi on joue
  aspect_ratio: "16:9"
```

**Tips for better integration:**
- Use `aspect_ratio: 75%` for a good mobile view
- Consider using a custom card like `panel: true` for full-screen
- The app is already configured to work in iframes from Home Assistant

### Example Home Assistant Card

```yaml
type: vertical-stack
cards:
  - type: markdown
    content: "# 🎲 Activités pour les enfants"
  - type: iframe
    url: http://192.168.1.100:3010
    aspect_ratio: 75%
```

## Updating the App

When you make changes and want to update:

```bash
cd /mnt/user/appdata/a-quoi-on-joue

# Pull latest changes (if using git)
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Data Persistence

Your data is stored in these directories (automatically mapped as volumes):
- `./server/src/data/` - Activity database (JSON file)
- `./server/uploads/` - Uploaded images
- `./server/public/images/` - Static images

These directories are preserved even if you rebuild the container.

## Changing the Port

If you need to use a different port:

1. Edit `docker-compose.yml`
2. Change `"3010:3000"` to `"YOUR_PORT:3000"`
3. Restart: `docker-compose down && docker-compose up -d`

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs

# Check if port is already in use
netstat -tulpn | grep 3010
```

### Can't access from Home Assistant iframe
- Verify the URL is correct in your iframe card
- Check that both services can reach each other on the network
- Check container logs for any errors

### Images not showing
- Images use emoji fallbacks by default
- To add custom images, place them in `./server/public/images/`
- Or use the admin panel to upload images

### Changes to admin password not working
- Make sure `.env` file is in the project root
- Restart the container: `docker-compose restart`
- Check environment variables: `docker-compose exec app env | grep ADMIN`

## Accessing from Outside Your Network (Optional)

If you want to access this from outside your home network:

1. **Use a reverse proxy** (nginx, Caddy, Traefik, etc.)
2. **Set up SSL** with Let's Encrypt
3. **Update the CSP header** in `server/src/server.ts` to include your external domain
4. **Configure port forwarding** on your router (not recommended without SSL)

## Backup

To backup your data:
```bash
tar -czf aquoionjoue-backup-$(date +%Y%m%d).tar.gz \
  server/src/data \
  server/uploads \
  server/public/images
```

## Uninstalling

To completely remove the app:
```bash
cd /mnt/user/appdata/a-quoi-on-joue
docker-compose down
cd ..
rm -rf a-quoi-on-joue
```

## Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify the container is running: `docker ps`
3. Test direct access before testing iframe
4. Check Home Assistant logs for iframe-related errors

---

**Enjoy using "À quoi on joue" with your family! 🎉**
