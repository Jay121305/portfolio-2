<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Jay Gautam - Portfolio Website

A modern, responsive portfolio website showcasing projects, skills, education, and experience. Built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

- 🎨 Modern, elegant design with smooth animations
- 📱 Fully responsive across all devices
- ⚡ Fast performance with Vite
- 🎯 Single-page application with smooth scrolling
- 💼 Project showcase with GitHub integration
- 📧 Contact form with validation
- 🌙 Dark theme with custom color scheme

## 🚀 Run Locally

**Prerequisites:** Node.js 18+ 

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   
   **Option A - Using PowerShell helper script (Recommended for Windows):**
   ```powershell
   .\run-dev.ps1
   ```
   
   **Option B - Using node directly:**
   ```powershell
   node "./node_modules/vite/bin/vite.js"
   ```
   
   **Option C - If npm run works on your system:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

3. **Build for production:**
   
   **Using PowerShell helper:**
   ```powershell
   .\run-build.ps1
   ```
   
   **Or using node directly:**
   ```powershell
   node "./node_modules/vite/bin/vite.js" build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

> **Note:** Due to special characters in the folder name, `npm run dev` may not work on Windows PowerShell. Use the helper scripts or node commands above instead.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS (via CDN)
- **Build Tool:** Vite
- **Fonts:** Google Fonts (Playfair Display, Poppins)

## 📦 Project Structure

```
├── App.tsx           # Main application component
├── constants.tsx     # Static content and data
├── hooks.ts          # Custom React hooks
├── types.ts          # TypeScript type definitions
├── index.tsx         # Application entry point
├── index.html        # HTML template
├── vite.config.ts    # Vite configuration
└── assets/           # Images and static assets
```

## 📝 Customization

To customize the portfolio content, edit the following files:

- **`constants.tsx`** - Update personal info, projects, skills, experience
- **`App.tsx`** - Modify layout and components
- **`index.html`** - Change theme colors and fonts

## 📄 License

This project is open source and available for personal use.
