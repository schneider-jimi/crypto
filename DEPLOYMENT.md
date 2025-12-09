# Deploying CryptoFolio to Vercel

## Prerequisites
- A GitHub account
- A Vercel account (sign up at https://vercel.com)
- Git installed on your computer

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Select your repository from the list

3. **Configure Build Settings**
   - Framework Preset: `Create React App`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Environment Variables (if needed)**
   - Add any environment variables your app needs
   - For this project, no additional env vars are required

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from the client directory**
   ```bash
   cd client
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: cryptofolio (or your preferred name)
   - Directory: ./
   - Override settings: No

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Important Notes

### For Client-Only Deployment
Since your project has a separate client and server:
- Deploy the **client** folder to Vercel
- Deploy the **server** folder separately (to Vercel, Heroku, Railway, or Render)
- Update API URLs in your client code to point to your deployed server

### Update API URLs
Before deploying, update all API endpoints in your code:

**Files to update:**
- `client/src/Components/Transactions/CoinBuy.jsx`
- `client/src/Components/Transactions/CoinSell.jsx`
- `client/src/Components/UserInformation/Dashboard.jsx`
- `client/src/Components/Nav.jsx`

Replace:
```javascript
"https://cryptofolio-backstack-aiwo.onrender.com"
```

With your deployed server URL.

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure there are no TypeScript errors
- Check the build logs in Vercel dashboard

### Routing Issues
- The `vercel.json` file handles client-side routing
- All routes redirect to `index.html` for React Router to handle

### Environment Variables
- Add them in Vercel dashboard under Settings > Environment Variables
- Redeploy after adding new variables

## Continuous Deployment
Once connected to GitHub:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- You can configure branch deployments in Vercel settings

## Server Deployment Options

### Option 1: Deploy Server to Render
1. Go to https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Set root directory to `server`
5. Build command: `npm install`
6. Start command: `npm start`

### Option 2: Deploy Server to Railway
1. Go to https://railway.app
2. Create new project from GitHub
3. Select your repository
4. Set root directory to `server`
5. Railway auto-detects Node.js and deploys

### Option 3: Keep Server on Render (Current)
Your server is already deployed at:
`https://cryptofolio-backstack-aiwo.onrender.com`

Just deploy the client to Vercel and it will work!

## Post-Deployment Checklist
- [ ] Client deployed successfully
- [ ] Server is accessible
- [ ] API calls work correctly
- [ ] Wallet connection works
- [ ] All routes are accessible
- [ ] Images and assets load properly
- [ ] Custom domain configured (if applicable)

## Support
For issues, check:
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
