# Quick Deploy Guide - CryptoFolio to Vercel

## 🚀 Fastest Way to Deploy (5 minutes)

### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. Configure:
   - **Root Directory**: `client`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
5. Click **"Deploy"**

### Step 3: Done! 🎉
Your app will be live at: `https://your-project-name.vercel.app`

## 📝 Important Notes

### Your Server is Already Deployed
Your backend is running at:
```
https://cryptofolio-backstack-aiwo.onrender.com
```
No changes needed! The client will connect to it automatically.

### Automatic Updates
- Every push to `main` branch = automatic deployment
- Pull requests = preview deployments

### Custom Domain (Optional)
1. Go to your Vercel project
2. Settings → Domains
3. Add your domain
4. Update DNS records as instructed

## 🔧 Alternative: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from client folder
cd client
vercel --prod
```

## ✅ Verify Deployment
After deployment, test:
- [ ] Homepage loads
- [ ] Market page shows crypto data
- [ ] Wallet connection works
- [ ] Buy/Sell transactions work
- [ ] All navigation links work

## 🆘 Need Help?
Check `DEPLOYMENT.md` for detailed instructions and troubleshooting.
