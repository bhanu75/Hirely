
# 💼 Hirely

**Hirely** is a sleek, modern, and minimal job listing web application built using **React** and **Vite**. It allows users to browse, add, edit, and delete job postings with a clean UI, light/dark theme toggle, and user authentication state using React Context. This project demonstrates component-based architecture, state management with reducers, and responsive design using **Tailwind CSS**.

---

## 🚀 Features

- 🔐 **Authentication Context** (Login/Logout logic using React Context API)
- 🎨 **Dark/Light Theme Toggle** (Persists using `localStorage`)
- 📋 **Job Listings** (Add, edit, delete, and display jobs in card format)
- 📝 **Dynamic Job Form** (Handles both creating and editing job posts)
- 📱 **Responsive Layout** using Tailwind CSS
- 🔄 **Pagination** for better job navigation
- 🗃️ **LocalStorage Persistence** for theme and auth state

---

## 🧠 Tech Stack

| Tool        | Purpose                          |
|-------------|----------------------------------|
| [React](https://react.dev) | UI library (Component-based SPA) |
| [Vite](https://vitejs.dev) | Fast dev server and build tool |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS framework |
| [Lucide Icons](https://lucide.dev) | Icon set for a professional UI |
| React Context + Reducer | Global auth and app state management |
| LocalStorage | Persisting auth and theme preferences |

---

## 📂 Project Structure

```bash
src/
├── context/
│   └── Hirely.jsx          # Auth Context + App Layout + Logic
├── App.jsx                 # Root component
├── main.jsx                # Vite entry point
├── App.css                 # Global styling (Tailwind)
└── index.css               # Tailwind base imports
```

---

🛠️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Hirely.git
cd Hirely
```




2. Install dependencies

```bash
npm install
```



3. Start the dev server


```bash
npm run dev
```
> App runs locally at http://localhost:5173




---

🧪 Usage

Click “+ Add Job” to add a new job post.

Click the Edit icon on a job to modify it.

Use Delete to remove a job.

Use the Sun/Moon icon in the navbar to toggle theme.

Click Login (mock login) to simulate an authenticated session.



---

🔒 Authentication

Hirely uses a mock login system with:

Context API + useReducer for state management

localStorage to persist login sessions

Login/Logout UI changes based on isAuthenticated state



---

📦 Build for Production

npm run build

Output goes to the dist/ directory.


---

🌟 Author

Made with 💙 by bhanu75


---

📃 License

This project is licensed under the MIT License.


---

🙌 Contributions
