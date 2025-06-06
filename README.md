# Journel 📝

**Journel** is a modern journaling app built with React and Vite. Users can create, edit, and delete personal entries, attach photos, categorize their thoughts, and organize them using tags. It also features user authentication and profile management.

---

## ✨ Features

- 🔐 **Authentication** via email and password
- 📝 **Create, edit, and delete entries**
  - Each entry includes:
    - Title
    - Text
    - Optional photo
    - Tags (persisted via Redis)
    - Category
- 🧑‍💼 **User profile management**
  - Update name and profile photo
  - Delete account
- 📌 **Persistent user session** using Redux Toolkit
- 💡 **Responsive UI** with Tailwind CSS
- 🧭 **Client-side routing** with React Router

---

## 🚀 Tech Stack

| Tech              | Version   | Description                         |
|-------------------|-----------|-------------------------------------|
| React             | 19.1.0    | JavaScript library for UI           |
| Vite              | 6.3.5     | Fast build tool                     |
| Redux Toolkit     | 2.8.2     | State management                    |
| React Redux       | 9.2.0     | React bindings for Redux            |
| React Router      | 7.6.2     | Declarative routing                 |
| Tailwind CSS      | 4.1.8     | Utility-first CSS framework         |

---

## 🛠️ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/journel.git
   cd journel
2. **Install dependencies**
   ```bash
   npm install
3. **Start the dev server**
   ```bash
   npm run dev

## 📦 Build
To build the project for production:
  npm run build


## ⚠️ Notes
- This app uses Redux to store the JWT token securely in the store.
- Tags are saved and managed through a Redis backend.



## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
