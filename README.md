# Make.com Blueprint Visualizer & Executor

An AI-powered tool to visualize, understand, execute, and document your Make.com workflows by generating plain-English explanations from `blueprint.json` files.

## 🚀 Live Deployments

- **Frontend (Netlify)**: [Coming Soon]
- **Backend API (Render)**: [Coming Soon]

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Tailwind CSS (deployed to Netlify)
- **Backend**: Node.js + Express (deployed to Render)
- **AI Integration**: Google Gemini API
- **Auto-Deploy**: GitHub → Netlify + Render

## ✨ Features

### Visualization (Current)
- 📊 **Instant Workflow Visualization**: Interactive flow diagrams
- 🔍 **Module Inspector**: Detailed configuration viewer
- 🤖 **AI-Powered Explanations**: Business logic summaries via Gemini API

### Execution (New!)
- ▶️ **Module Execution**: Run individual modules
- 🔄 **Workflow Execution**: Execute entire workflows
- 📡 **HTTP Module Support**: API calls and webhooks
- 🔧 **JSON Transformations**: Data mapping and processing

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/deancacioppo-OCS/blueprint.git
   cd blueprint
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**:
   ```bash
   # Frontend (.env)
   GEMINI_API_KEY=your_gemini_api_key_here
   VITE_BACKEND_URL=http://localhost:3001

   # Backend (backend/.env)
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start both servers**:
   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: Backend
   cd backend
   npm run dev
   ```

6. **Open**: http://localhost:5173

## 📦 Deployment

### Automatic Deployment Pipeline

Push to `main` branch triggers:
- ✅ **Netlify**: Builds and deploys frontend
- ✅ **Render**: Builds and deploys backend API

### Manual Deployment

#### Netlify (Frontend)
1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables:
   - `GEMINI_API_KEY`
   - `VITE_BACKEND_URL`

#### Render (Backend)
1. Connect GitHub repo to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Set root directory: `backend`
5. Add environment variables:
   - `FRONTEND_URL`
   - `NODE_ENV=production`

## 🔧 API Endpoints

### Backend API
- `GET /api/health` - Health check
- `POST /api/execute/module` - Execute single module
- `POST /api/execute/workflow` - Execute entire workflow

### Example Usage
```javascript
// Execute a module
const response = await fetch('/api/execute/module', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    module: { /* module data */ },
    inputData: { /* input data */ }
  })
});
```

## 🛠️ Development

### Project Structure
```
├── components/          # React components
├── services/           # API services
├── types.ts           # TypeScript types
├── backend/           # Node.js backend
│   ├── routes/        # API routes
│   ├── server.js      # Express server
│   └── package.json   # Backend dependencies
├── netlify.toml       # Netlify config
└── package.json       # Frontend dependencies
```

### Adding New Module Types

1. **Backend**: Add executor in `backend/routes/execution.js`
2. **Frontend**: Update types in `types.ts`
3. **Icons**: Add module icon in `components/icons.tsx`

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for the Make.com automation community