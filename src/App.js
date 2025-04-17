import React, { useState, useEffect } from 'react';
import './App.css';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPage('todo');

        const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid));
        const unsubscribeTasks = onSnapshot(q, (snapshot) => {
          const taskList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTasks(taskList);
        });

        return () => unsubscribeTasks();
      } else {
        setUser(null);
        setPage('login');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!editing && editId === null) {
      setInput('');
    }
  }, [tasks]);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!');
      setPage('todo');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPage('todo');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setPage('login');
  };

  const addTask = async () => {
    if (input.trim() === '') return;
  
    try {
      // Add new task to Firestore
      await addDoc(collection(db, "tasks"), {
        name: input,
        done: false,
        userId: user.uid,
        createdAt: new Date(),
      });
  
      // Reset the input field after adding the task
      setInput('');
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  
  

  const toggleDone = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    const currentTask = tasks.find(t => t.id === id);
    if (currentTask) {
      await updateDoc(taskDoc, { done: !currentTask.done });
    }
  };

  const removeTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const saveEdit = async () => {
    if (!editId || input.trim() === '') return;
  
    const taskRef = doc(db, "tasks", editId);
    try {
      // Update the task name in Firestore
      await updateDoc(taskRef, { name: input });
  
      // Reset the input field and switch back to Add mode
      setInput('');
      setEditing(false);
      setEditId(null); // Clear the editId to stop editing mode
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  
  
  
  
  
  const startEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setInput(task.name);  // Set input to task's current name
      setEditId(id);  // Store task ID for reference when saving
      setEditing(true);  // Switch to "Save" mode
    }
  };  
  

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {page === 'login' && (
        <div className="card p-4 col-md-4 mx-auto shadow rounded-4">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <input
            type="email"
            className="form-control mb-3 rounded-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3 rounded-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100 rounded-3" onClick={handleLogin}>Login</button>
          <p className="text-center mt-3">
            Don't have an account?{' '}
            <span className="text-decoration-underline text-primary fw-semibold" style={{ cursor: 'pointer' }} onClick={() => setPage('signup')}>Sign Up</span>
          </p>
        </div>
      )}

      {page === 'signup' && (
        <div className="card p-4 col-md-4 mx-auto shadow rounded-4">
          <h2 className="text-center mb-4 text-success">Signup</h2>
          <input
            type="email"
            className="form-control mb-3 rounded-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3 rounded-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-success w-100 rounded-3" onClick={handleSignup}>Sign Up</button>
          <p className="text-center mt-3">
            Already have an account?{' '}
            <span className="text-decoration-underline text-success fw-semibold" style={{ cursor: 'pointer' }} onClick={() => setPage('login')}>Login</span>
          </p>
        </div>
      )}

      {page === 'todo' && (
        <div className="card p-4 col-md-6 mx-auto shadow position-relative rounded-4">
          <h2 className="text-center text-dark mb-4">Task Manager</h2>

          <button
            className="btn btn-outline-danger position-absolute top-0 end-0 m-3"
            onClick={handleLogout}
          >
            Logout
          </button>

          <div className="input-group mb-4">
            <span className="input-group-text bg-white">
              🔍
            </span>
            <input
              type="text"
              className="form-control rounded-end-3"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control rounded-start-3"
              placeholder="Add a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
  className="btn btn-primary rounded-end-3"
  onClick={() => {
    if (editing) {
      saveEdit(); // Save the edited task
    } else {
      addTask(); // Add new task
    }
  }}
>
  {editing ? 'Save' : 'Add'}
</button>


          </div>

          {filteredTasks.map((task) => (
            <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center rounded-3 shadow-sm mb-2">
              <span className={`me-3 ${task.done ? 'completed' : ''}`}>{task.name}</span>
              <div>
                <button className="btn btn-outline-success btn-sm me-2" onClick={() => toggleDone(task.id)}>
                  {task.done ? 'Undo' : 'Done'}
                </button>
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => startEdit(task.id)}>
                  Edit
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => removeTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
