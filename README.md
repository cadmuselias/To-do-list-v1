# React To-Do List App (v1)

This is a simple yet powerful to-do list application built with React. It provides a clean and modern user interface for managing daily tasks efficiently.

## About The Project

This application allows users to manage their tasks with a range of useful features:

- **Add Tasks:** Quickly add new tasks to your list.
- **Edit Tasks:** Update the title of existing tasks.
- **Delete Tasks:** Remove tasks you no longer need.
- **Mark as Complete:** Toggle the completion status of each task.
- **Filter Tasks:** View tasks by their status (All, Active, Completed).
- **Search Tasks:** Instantly find tasks by typing in a search query.
- **Clear Completed:** Remove all completed tasks with a single click.
- **Responsive and Styled:** A colorful and visually appealing design that works well on different screen sizes.

## What I Learned

Building this project was a great exercise in understanding fundamental and intermediate React concepts. Here are some of the key takeaways:

- **Component-Based Architecture:** I learned to break down the application's UI into small, reusable components like `Header`, `Search`, `AddTask`, `Filter`, `Tasks`, `TaskItems`, and `Footer`. This makes the code more organized and maintainable.

- **State Management (`useState`)**: I used the `useState` hook extensively to manage the component's internal state, such as the list of tasks, the current filter, search queries, and the editing state of a task.

- **Props for Communication:** I practiced passing data (like the tasks array) and functions (event handlers like `onDeleteTask`) from parent components to child components. This is the core of component communication in React.

- **Lifting State Up:** To share state between sibling components (like the `Tasks` list and the `Footer`), I learned to "lift the state up" to their closest common ancestor, which in this case is the `App` component.

- **Handling User Events:** I implemented event handlers like `onClick` and `onChange` to make the application interactive, responding to button clicks and text input.

- **Conditional Rendering:** I used conditional logic to render different UI elements based on the application's state. For example, displaying an input field for editing a task when `isEditing` is true, or applying a "completed" style to a task.

- **Rendering Lists (`.map()`):** I learned how to dynamically render a list of components from an array of data using the `.map()` method and the importance of providing a unique `key` prop to each item for performance and to avoid potential bugs.

- **Side Effects (`useEffect`):** I used the `useEffect` hook to add a global keyboard event listener (`Enter` key to add a task) and learned the importance of the cleanup function to remove the event listener when the component unmounts, preventing memory leaks.

- **DOM Manipulation (`useRef`):** I utilized the `useRef` hook to get a direct reference to a DOM element, allowing me to programmatically focus the input field.

- **Immutability in State Updates:** I practiced updating state immutably. Instead of modifying the tasks array directly, I created new arrays using methods like `.map()` and `.filter()`, which is a core principle in React for predictable state management.

- **Styling in React:** I got hands-on experience with styling components by importing a CSS file and using `className` to apply styles. I also used CSS variables (`:root`) to create a themeable and easily maintainable color scheme.

---

This project solidified my understanding of how to structure and build a dynamic single-page application (SPA) with React.
