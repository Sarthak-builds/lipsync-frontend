# Lipsync

**Lipsync** is a modern web application designed for voice synthesis, video creation, and clip generation. Built with **React 19** and **TypeScript**, it leverages a powerful stack including **Vite**, **Tailwind CSS**, and **Framer Motion** to deliver a responsive and interactive user experience.

## ✨ Features

- **🔐 Authentication**: Secure user login and registration system.
- **🎙️ Voice Management**: Browse and manage synthesized voices (`/voices`).
- **🗣️ Speech Synthesis**: Convert text to speech with advanced controls (`/speech`).
- **📹 Video Creation**: Tools for generating lipsync videos (`/videos`).
- **✂️ Clip Generation**: Create and manage short video clips (`/Clips`).
- **📊 Dashboard**: Centralized home for managing your media assets.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Primitives), [Lucide React](https://lucide.dev/) (Icons)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Tailwindcss Animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lipsync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
    Ensure you have the necessary environment configuration files (e.g., `.env.development`, `.env.production`) set up in the root directory.

### Running the App

Start the development server:

```bash
npm run dev
# or
npm run dev:development
```

The application will typically be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build:production
```

## 📜 Scripts

- `dev`: Starts the development server.
- `build:production`: Type-checks and builds the application for production.
- `lint`: Runs ESLint to catch code quality issues.
- `preview`: Previews the production build locally.

