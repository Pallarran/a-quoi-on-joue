# Complete Unraid Installation Guide

This is a detailed, step-by-step guide for installing "À quoi on joue" on your Unraid server.

## Table of Contents
1. [Accessing Unraid Terminal](#1-accessing-unraid-terminal)
2. [Installing Git (if needed)](#2-installing-git-if-needed)
3. [Cloning the Repository](#3-cloning-the-repository)
4. [Setting Admin Password](#4-setting-admin-password)
5. [Building and Starting Docker Container](#5-building-and-starting-docker-container)
6. [Verifying Installation](#6-verifying-installation)
7. [Adding to Home Assistant](#7-adding-to-home-assistant)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Accessing Unraid Terminal

### Option A: Using Unraid Web Terminal (Easiest)

1. Open your Unraid web interface in a browser: `http://your-unraid-ip`
2. Click on the **Terminal** icon in the top-right corner (looks like `>_`)
3. A terminal window will open in your browser

### Option B: Using SSH

1. Enable SSH in Unraid:
   - Go to **Settings** → **Management Access**
   - Enable "Use SSH"
   - Click **Apply**

2. Connect via SSH from your computer:
   ```bash
   ssh root@your-unraid-ip
   ```
   - Default username: `root`
   - Password: Your Unraid root password

---

## 2. Installing Git (if needed)

Check if Git is already installed:
```bash
git --version
```

### If Git is NOT installed:

**Install using Nerd Tools plugin (Recommended):**

1. In Unraid web interface, go to **Plugins** tab
2. Click **Install Plugin**
3. Paste this URL: `https://raw.githubusercontent.com/dmacias72/NerdPack/master/plugin/nerdpack.plg`
4. Click **Install**
5. Once installed, go to **Settings** → **Nerd Tools**
6. Find **git** in the list and click **Install**
7. Wait for installation to complete

**Alternative - Manual Installation:**
```bash
wget https://slackware.uk/slackware/slackware64-15.0/slackware64/d/git-2.35.1-x86_64-1.txz
installpkg git-2.35.1-x86_64-1.txz
```

Verify Git is installed:
```bash
git --version
```

You should see something like `git version 2.35.1`

---

## 3. Cloning the Repository

Now let's download the app from GitHub:

### Step 1: Navigate to the appdata directory
```bash
cd /mnt/user/appdata/
```

### Step 2: Clone the repository
```bash
git clone https://github.com/Pallarran/a-quoi-on-joue.git
```

You should see output like:
```
Cloning into 'a-quoi-on-joue'...
remote: Enumerating objects: 50, done.
remote: Counting objects: 100% (50/50), done.
...
Receiving objects: 100% (50/50), done.
```

### Step 3: Navigate into the project directory
```bash
cd a-quoi-on-joue
```

### Step 4: Verify files are present
```bash
ls -la
```

You should see files like:
- `Dockerfile`
- `docker-compose.yml`
- `DEPLOYMENT.md`
- `server/` directory
- `client/` directory

---

## 4. Setting Admin Password

⚠️ **Important**: This password protects your admin panel!

### Create the .env file:
```bash
nano .env
```

This opens a text editor. Type:
```
ADMIN_PASSWORD=your_secure_password_here
```

**Replace `your_secure_password_here` with your actual password!**

Example:
```
ADMIN_PASSWORD=MySecurePass123!
```

### Save and exit:
1. Press `Ctrl + O` (that's the letter O) to save
2. Press `Enter` to confirm
3. Press `Ctrl + X` to exit

### Verify the file was created:
```bash
cat .env
```

You should see your password line displayed.

---

## 5. Building and Starting Docker Container

This is where we build and start the app!

### Step 1: Build the Docker image
```bash
docker-compose build
```

**This will take 5-10 minutes**. You'll see a lot of output as it:
- Downloads Node.js
- Installs dependencies
- Builds the React frontend
- Prepares the backend

You'll see lines like:
```
Building app
Step 1/15 : FROM node:18-alpine AS client-builder
...
Successfully built abc123def456
Successfully tagged a-quoi-on-joue_app:latest
```

### Step 2: Start the container
```bash
docker-compose up -d
```

The `-d` flag means "detached" (runs in background).

You should see:
```
Creating a-quoi-on-joue ... done
```

---

## 6. Verifying Installation

Let's make sure everything is working!

### Check if container is running:
```bash
docker ps | grep a-quoi-on-joue
```

You should see output like:
```
abc123    a-quoi-on-joue_app    "npm start"    Up 10 seconds    0.0.0.0:3010->3000/tcp    a-quoi-on-joue
```

Key things to verify:
- Status shows "Up X seconds/minutes"
- Port mapping shows `0.0.0.0:3010->3000/tcp`

### View container logs:
```bash
docker-compose logs -f
```

You should see:
```
app_1  | 🚀 Server running on http://localhost:3000
```

Press `Ctrl + C` to exit log view.

### Test access from browser:

1. Open a browser on any device on your network
2. Go to: `http://YOUR-UNRAID-IP:3010`
   - Replace `YOUR-UNRAID-IP` with your actual Unraid server IP
   - Example: `http://192.168.1.50:3010`

3. You should see the "À quoi on joue ?" app with activity cards!

### Test admin panel:

1. Go to: `http://YOUR-UNRAID-IP:3010/admin`
2. Enter the password you set in step 4
3. You should see the admin panel with activity management

**✅ If you see the app, installation is complete!**

---

## 7. Adding to Home Assistant

Now let's add the app to your Home Assistant dashboard.

### Method 1: Visual Editor (Easiest)

1. Open Home Assistant
2. Go to any dashboard
3. Click the 3 dots (⋮) in the top right
4. Click **Edit Dashboard**
5. Click **+ ADD CARD**
6. Search for **"Iframe"** and select it
7. Configure:
   - **URL**: `http://YOUR-UNRAID-IP:3010` (replace with your IP)
   - **Aspect Ratio**: `75%` (or leave default)
   - **Title**: `À quoi on joue` (optional)
8. Click **Save**

### Method 2: YAML Mode

1. Edit your dashboard in YAML mode
2. Add this card:

```yaml
type: iframe
url: http://192.168.1.50:3010  # Replace with YOUR Unraid IP
aspect_ratio: 75%
title: À quoi on joue
```

### Method 3: Full Panel View (Recommended)

For a dedicated page:

```yaml
title: Activités Enfants
path: activites
icon: mdi:gamepad-variant
panel: true
cards:
  - type: iframe
    url: http://192.168.1.50:3010
    aspect_ratio: 100%
```

### Updating the CSP Header (if needed)

If the iframe doesn't load, you may need to update the server to allow your Home Assistant URL.

1. In Unraid terminal:
```bash
cd /mnt/user/appdata/a-quoi-on-joue
nano server/src/server.ts
```

2. Find the line with `Content-Security-Policy` (around line 26)
3. Add your Home Assistant IP:
```javascript
res.setHeader('Content-Security-Policy', "frame-ancestors 'self' http://homeassistant.local:8123 http://YOUR-HA-IP:8123");
```

4. Save (`Ctrl+O`, `Enter`, `Ctrl+X`)
5. Rebuild and restart:
```bash
docker-compose down
docker-compose up -d --build
```

---

## 8. Troubleshooting

### Container won't start

**Check logs:**
```bash
cd /mnt/user/appdata/a-quoi-on-joue
docker-compose logs
```

**Common issues:**
- Port 3010 already in use: Change port in `docker-compose.yml`
- Build failed: Check if Docker has enough space (`df -h`)

### Can't access the app in browser

**Verify container is running:**
```bash
docker ps | grep a-quoi-on-joue
```

**Check Unraid firewall:**
- Make sure port 3010 is not blocked
- Test from the Unraid server itself: `curl http://localhost:3010`

**Check network:**
- Make sure your device is on the same network as Unraid
- Try accessing Unraid web interface to verify network connectivity

### Build takes too long or fails

**Check disk space:**
```bash
df -h /mnt/user/appdata
```

You need at least 2-3 GB free.

**If build fails, clean and retry:**
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Iframe doesn't load in Home Assistant

1. **Check browser console** for errors (F12 in browser)
2. **Test direct access** first: `http://YOUR-UNRAID-IP:3010`
3. **Update CSP headers** (see Method 3 above)
4. **Check Home Assistant logs** for blocked content

### Admin password doesn't work

**Verify .env file exists:**
```bash
cat /mnt/user/appdata/a-quoi-on-joue/.env
```

**Recreate .env file:**
```bash
cd /mnt/user/appdata/a-quoi-on-joue
echo "ADMIN_PASSWORD=YourNewPassword" > .env
docker-compose restart
```

### Port conflict (3010 already in use)

**Find what's using the port:**
```bash
netstat -tulpn | grep 3010
```

**Change to a different port:**
1. Edit docker-compose.yml:
```bash
nano docker-compose.yml
```

2. Change line 8 from `"3010:3000"` to `"3011:3000"` (or any free port)
3. Save and restart:
```bash
docker-compose down
docker-compose up -d
```

---

## Useful Commands Reference

```bash
# Navigate to app directory
cd /mnt/user/appdata/a-quoi-on-joue

# View logs (live)
docker-compose logs -f

# Restart container
docker-compose restart

# Stop container
docker-compose down

# Start container
docker-compose up -d

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Check container status
docker ps | grep a-quoi-on-joue

# Enter container shell (for debugging)
docker-compose exec app sh

# Update from Git
git pull
docker-compose down
docker-compose up -d --build
```

---

## Next Steps

✅ App is running on port 3010
✅ Admin panel accessible at `/admin`
✅ Added to Home Assistant dashboard

**Now you can:**
1. Add more activities via the admin panel
2. Upload custom images for activities
3. Change the admin password anytime
4. Customize the app appearance

**To update your Home Assistant URL** (if it changes), edit `server/src/server.ts` and rebuild the container.

---

## Questions?

Common questions answered:

**Q: Can I use HTTPS?**
A: Yes! Set up a reverse proxy (like nginx or Caddy) in front of the app.

**Q: Can I change the port?**
A: Yes! Edit `docker-compose.yml` line 8, change `3010` to your desired port.

**Q: Where is my data stored?**
A: In `/mnt/user/appdata/a-quoi-on-joue/server/src/data/activities.json`

**Q: How do I backup?**
A: Copy the entire `/mnt/user/appdata/a-quoi-on-joue/` folder, especially `server/src/data/` and `server/uploads/`

**Q: Can I run this on a different OS?**
A: Yes! The Docker setup works on any system with Docker installed.

---

**Enjoy your new activity picker app! 🎉**
