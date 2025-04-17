
# Task Manager Application

## Overview

This is a Task Manager application built with **ReactJS** and **Firebase**. It allows users to sign up, log in, and manage their personal to-do list. Each user's tasks are securely stored in Firestore and can be edited, deleted, searched, and marked as done.

---

## 🚀 Features

- Firebase Authentication (Signup/Login/Logout)
- Add, Edit, Delete Tasks
- Mark tasks as Done/Undo
- Real-time Task Syncing with Firestore
- Search Tasks by Name (with search icon UI)
- Responsive, Bootstrap-based UI

---

![Image](https://github.com/user-attachments/assets/76b07a84-049d-4bb3-9476-1c8d0c34e8fe)

[![Watch the full video](https://img.youtube.com/vi/Wq-ref52EHY/0.jpg)](https://youtu.be/Wq-ref52EHY)




## 🛠️ Setup and Run

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up Firebase:

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable **Email/Password Authentication**
- Create a Firestore database
- Copy your Firebase config and replace it in `firebase.js`:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### 4. Start the app:

```bash
npm start
```

---

## 📦 Technologies Used

- **ReactJS**
- **Firebase (Auth + Firestore)**
- **Bootstrap 5** (for styling)
- **React Hooks** (`useState`, `useEffect`)

---

## 🤔 Assumptions Made

- Each task has a `name`, `done` status, and is user-specific (secured by `userId`).
- Email/Password is the only authentication method.
- Tasks are only visible to the logged-in user.

---

## 🧩 Challenges Faced & Solutions

### 🔄 Real-Time Syncing

**Challenge**: Keeping task list in sync across sessions.

**Solution**: Used `onSnapshot()` from Firestore to listen to real-time updates.

### ✍️ Input Not Clearing on Edit Save

**Challenge**: Input field didn't reset after editing a task.

**Solution**: Added a fallback using `useEffect()` to clear input once `tasks` updated and `editId` was null.

### 🔍 Task Search

**Challenge**: Filtering tasks in real-time while maintaining Firestore sync.
**Solution**: Filtered tasks using a derived state before rendering them in the JSX.

### 🎨 UI Layout

**Challenge**: Making the layout responsive and clean.

**Solution**: Used Bootstrap classes and `card`, `shadow`, `rounded` styles to make the UI modern.

---

## 📂 File Structure

```
├── public/
├── src/
│   ├── App.js        # Main React component
│   ├── App.css       # Custom styles
│   ├── firebase.js   # Firebase setup
│   └── index.js      # Entry point
├── .gitignore
├── package.json
└── README.md         # Project documentation
```

> Made with ❤️ by NITHIN B Y
