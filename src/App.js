import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const tasksSample = [
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
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Combine filter and search
  const filterTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "Active") return !task.completed && matchesSearch;
    if (filter === "Completed") return task.completed && matchesSearch;

    return matchesSearch;
  });

  function handleDeleteClear() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleCompleteToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleUpdateTask(id, newTitle) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  }

  return (
    <main className="app-container">
      <Header />
      <Search search={search} setSearch={setSearch} />
      <AddTask onAddTask={handleAddTask} />
      <Filter filter={filter} setFilter={setFilter} />
      <Tasks
        tasks={tasks}
        onCompleteToggle={handleCompleteToggle}
        onUpdateTask={handleUpdateTask}
        onDeletetask={handleDeleteTask}
        filterTasks={filterTasks}
      />
      <Footer onDeleteClear={handleDeleteClear} tasks={tasks} />
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

function Search({ search, setSearch }) {
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

function AddTask({ onAddTask }) {
  const [userInput, setUserInput] = useState("");
  const inEl = useRef(null);

  function hanldeNewTask() {
    if (!userInput.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: userInput,
      completed: false,
    };
    onAddTask(newTask);
    setUserInput("");
  }

  useEffect(() => {
    function callback(e) {
      if (
        !inEl.current.value &&
        e.code.toLowerCase() === "Enter".toLowerCase()
      ) {
        if (document.activeElement === inEl.current) return;
        inEl.current.focus();
      } else if (
        inEl.current.value &&
        e.code.toLowerCase() === "Enter".toLowerCase()
      ) {
        hanldeNewTask();
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [userInput]);

  return (
    <section className="add-task-container">
      <h3>Add a new task</h3>
      <div className="add-task-form">
        <input
          ref={inEl}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="What do you want to do today?"
        />
        <button onClick={hanldeNewTask}>+</button>
      </div>
    </section>
  );
}

function Filter({ filter, setFilter }) {
  const filters = ["All", "Active", "Completed"];
  return (
    <section className="filter-container">
      {filters.map((f) => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? "active" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </section>
  );
}

function Tasks({ filterTasks, onCompleteToggle, onUpdateTask, onDeletetask }) {
  return (
    <ul className="task-list">
      {filterTasks.map((filterTask) => (
        <TaskItems
          task={filterTask}
          key={filterTask.id}
          onCompleteToggle={onCompleteToggle}
          onUpdateTask={onUpdateTask}
          onDeletetask={onDeletetask}
        />
      ))}
    </ul>
  );
}

function TaskItems({ task, onCompleteToggle, onUpdateTask, onDeletetask }) {
  const [isEditing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  function handleSave() {
    if (editText.trim()) {
      onUpdateTask(task.id, editText);
    }
    setEditing(false);
  }

  if (!isEditing) {
    return (
      <li className={`task-item ${task.completed ? "completed" : ""}`}>
        <div className="task-details">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onCompleteToggle(task.id)}
          />
          <p>{task.title}</p>
        </div>
        <div className="task-actions">
          <button onClick={() => setEditing(true)}>✏ Edit</button>
          <button onClick={() => onDeletetask(task.id)}>❌ Delete</button>
        </div>
      </li>
    );
  }

  return (
    <li className="task-item">
      <input
        className="edit-input"
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />{" "}
      <div className="task-actions">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={() => setEditing(false)}>
          Cancel
        </button>
      </div>
    </li>
  );
}

function Footer({ onDeleteClear, tasks }) {
  const taskLeft = tasks.filter((task) => !task.completed).length;

  return (
    <footer className="footer">
      <button className="clear-completed-btn" onClick={onDeleteClear}>
        Clear completed
      </button>
      <p className="tasks-left">Tasks left: {taskLeft}</p>
    </footer>
  );
}
