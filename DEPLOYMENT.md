# 🚀 IntelWebHosting Deployment Guide

Your Astro portfolio is ready to deploy to IntelWebHosting!

## **Files to Deploy**

All files in the `/dist` folder are production-ready. These are pre-built static HTML/CSS/JS files.

## **Deployment Methods**

### **Method 1: Using cPanel File Manager (Easiest)**

1. **Log in to cPanel**: `https://your-domain.com:2083`
2. **Open File Manager**
3. **Navigate to `public_html` folder**
4. **Delete default files** (if any)
5. **Upload all files from `/dist` folder**:
   - Upload the entire `dist/` directory contents
   - Or use "Extract" if uploading as zip

### **Method 2: Using FTP (FileZilla)**

1. **Download FileZilla**: https://filezilla-project.org
2. **Open Site Manager** (Ctrl+S)
3. **Enter your FTP credentials**:
   - Host: `your-domain.com` (or ftp.your-domain.com)
   - Username: Your cPanel FTP user
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)
4. **Connect**
5. **Navigate to `public_html`**
6. **Drag & drop all files from `/dist` folder**

### **Method 3: Using SFTP (More Secure)**

```bash
# From your local machine or development server
sftp sftp-user@your-domain.com

# Navigate to public_html
cd public_html

# Upload all files
put -r dist/
```

### **Method 4: Using SSH/Terminal (Advanced)**

```bash
# Connect via SSH
ssh user@your-domain.com

# Navigate to public_html
cd public_html

# Remove old files (backup first!)
rm -rf *

# Copy new files from deployment location
cp -r /path/to/dist/* .

# Fix permissions
chmod -R 755 .
find . -type f -exec chmod 644 {} \;
```

---

## **After Deployment**

### ✅ Access Your Site
- Visit: `https://your-domain.com`
- All pages should load correctly
- Links between pages work

### ✅ Test Functionality
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Portfolio page displays
- [ ] Contact form accessible
- [ ] All images load

### ✅ Performance (Optional)
- [ ] Enable GZIP compression in cPanel
- [ ] Set up caching headers
- [ ] Minify HTML/CSS/JS (already done by Astro)

---

## **Troubleshooting**

### **404 Errors on Sub-pages**
If pages like `/portfolio/` show 404, you might need `.htaccess` file:

Create `.htaccess` in `public_html`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### **Blank Page / 500 Error**
- Check file permissions (should be 644 for files, 755 for directories)
- Check server error logs in cPanel
- Ensure all files from `/dist` were uploaded

### **Styles/Images Not Loading**
- Check file paths in Network tab (F12)
- Verify all files were uploaded to correct folders
- Clear browser cache (Ctrl+Shift+Delete)

---

## **Future Updates**

Whenever you make changes:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload updated `/dist` folder** using any method above

3. **Clear browser cache** to see changes

---

## **Your Deployment Info**

- **Build Output**: `/dist` folder
- **Upload To**: `public_html/` in cPanel
- **Live URL**: `https://your-domain.com`
- **Build Command**: `npm run build`
- **Dev Server**: `npm run dev`

**Need help?** Contact IntelWebHosting support if you have FTP/cPanel issues.
