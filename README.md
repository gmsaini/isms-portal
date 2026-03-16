# 🛡️ ISMS — Infrastructure Service Management System

A full-featured **Infrastructure Service Management Portal** built as a single-page React application. Designed for IT infrastructure teams to track activities, log time, manage bandwidth, analyse productivity, and integrate with ticketing tools.

> **Status:** v1.0.0-beta · UI Prototype · No backend required

---

## 📸 Features at a Glance

| Section | What it does |
|---|---|
| **Dashboard** | KPI cards, charts, drill-down overlays — all clickable |
| **Activities** | Create, edit, track work items with ticket numbers, nature & work type |
| **Time Log** | Tabular time logging per activity with multi-log sessions |
| **Bandwidth & Capacity** | Team utilisation, per-activity time breakdown, leave calendar |
| **Productivity** | Org health score, flags & risks, effort heatmap, AI-generated suggestions |
| **Reports & Planning** | Capacity forecasting, custom reports |
| **Data Connect** | Upload ticket CSVs (JIRA, HPSM, SMAX) or configure live integrations |
| **Team & Member Management** | Add/edit/delete teams and members with cascade rename |

---

## 👥 Role-Based Access

| Feature | Admin 🛡️ | Manager 👑 | Member 👤 |
|---|---|---|---|
| View all teams & data | ✅ | Own team | Own team |
| Create/edit activities | ❌ Read-only | ✅ | ❌ |
| Log time | ❌ | ✅ | ✅ |
| Add/edit members & teams | ✅ | ❌ | ❌ |
| Productivity & reports | ✅ Full | Team-scoped | Limited |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### 1. Create a Vite + React project

```bash
npm create vite@latest isms-portal -- --template react
cd isms-portal
npm install
```

### 2. Replace the App component

Copy `ISMS-portal.jsx` into the project:

```bash
# Copy the portal file
cp ISMS-portal.jsx src/App.jsx
```

Update `src/main.jsx` to:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — ready to deploy to any static host.

---

## ☁️ Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Create `vercel.json` to fix client-side routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify
Drag and drop the `dist/` folder at [app.netlify.com](https://app.netlify.com).  
Create `public/_redirects`:
```
/*    /index.html   200
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json`:
```json
"homepage": "https://<your-username>.github.io/isms-portal",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Add to `vite.config.js`:
```js
export default { base: '/isms-portal/' }
```
Then run:
```bash
npm run deploy
```

### SharePoint / Intranet
Upload the contents of `dist/` to a SharePoint Document Library, then embed via a **Full Width** page with an **Embed** web part pointing to `index.html`.

---

## 🔗 Integration Support

The **Data Connect** section supports:

| Tool | Method |
|---|---|
| **JIRA** (Cloud & Data Center) | CSV upload + REST API (direct sync) |
| **Power BI** (Microsoft) | Push dataset via REST API + .pbix template |
| **HP Service Manager** | CSV upload + REST/SOAP API |
| **OpenText SMAX** | CSV upload + OData REST + OAuth 2.0 |

> **Note:** Live API integrations are UI prototypes in this release. Production deployment requires a backend proxy to handle authentication tokens securely.

---

## 🗂️ Project Structure

```
isms-portal/
├── src/
│   ├── App.jsx          ← Entire portal (single file)
│   └── main.jsx         ← React entry point
├── public/
│   └── _redirects       ← Netlify routing fix
├── vercel.json          ← Vercel routing fix
├── vite.config.js       ← Vite config
├── package.json
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

- **React 18** — hooks only, no class components
- **Vite** — build tool
- **Pure CSS-in-JS** — no external UI library, no Tailwind
- **SVG charts** — all charts are hand-built SVG, no chart library dependency
- **Zero external dependencies** beyond React itself

---

## 📋 Roadmap

- [ ] Backend API (Node.js / FastAPI) for persistent data storage
- [ ] Real JIRA / SMAX API integration
- [ ] Power BI embedded report panel
- [ ] Email/Teams notifications for flags & risks
- [ ] Export to Excel / PDF
- [ ] Dark mode
- [ ] Multi-language support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## 💬 Support

Open an [issue](../../issues) for bugs or feature requests.

