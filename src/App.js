import { useState } from "react";
import "./App.css";

const tasks = [
  {
    id: "1",
    title: "Buy groceries",
    completed: false,
  },
  {
    id: "2",
    title: "Finish React project",
    completed: true,
  },
  {
    id: "3",
    title: "Practice coding for 1 hour",
    completed: false,
  },
];

export default function App() {
  return (
    <main className="app-container">
      <Header />
      <Search />
      <AddTask />
      <Filter />
      <Tasks />
    </main>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>⭐ To-Do App</h1>
    </header>
  );
}

function Search() {
  const [search, setSearch] = useState("");
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks... "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

function AddTask() {
  const [addTask, setAddTask] = useState("");
  return (
    <section className="add-task-container">
      <h3>Add a new task</h3>
      <div className="add-task-form">
        <input
          type="text"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
          placeholder="What do you want to do today?"
        />
        <button>+</button>
      </div>
    </section>
  );
}

function Filter() {
  const [filter, setFilter] = useState("");
  return (
    <section className="filter-container">
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed ">Completed </option>
      </select>
    </section>
  );
}

function Tasks() {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItems task={task} key={task.id} />
      ))}
    </ul>
  );
}

function TaskItems({ task }) {
  return (
    <li className="task-item">
      <div className="task-details">
        <input type="checkbox" /> <p>{task.title}</p>
      </div>
      <div className="task-actions">
        <button>✏ Edit</button>
        <button>❌ Delete</button>
      </div>
    </li>
  );
}
