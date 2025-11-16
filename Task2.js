const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");
const counter = document.getElementById("task-counter");

// Motivational Quotes
const quotes = [
  "Keep going, you’re doing great! 🚀",
  "Small steps lead to big results 🌱",
  "Focus on progress, not perfection ✨",
  "You’ve got this 💪"
];
function showQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[random];
}
showQuote();

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  updateCounter();
}

function updateCounter() {
  const tasks = document.querySelectorAll(".task-item");
  const completed = document.querySelectorAll(".task-item.completed");
  counter.textContent = `✅ Completed: ${completed.length} | ⏳ Pending: ${tasks.length - completed.length}`;
}

function createTask(taskText) {
  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = taskText;
  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
    updateCounter();
  };

  const btnGroup = document.createElement("div");
  btnGroup.className = "task-buttons";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.onclick = () => {
    li.style.animation = "fadeOut 0.4s ease forwards";
    setTimeout(() => {
      li.remove();
      saveTasks();
      updateCounter();
    }, 400);
  };

  btnGroup.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(btnGroup);
  taskList.appendChild(li);
  saveTasks();
  updateCounter();
}

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTask(taskText);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

clearBtn