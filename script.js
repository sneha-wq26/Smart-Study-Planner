// Active link highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// FAQ toggle
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// Password toggle
const togglePassword = document.querySelector(".toggle-password");
if (togglePassword) {
  const passwordInput = document.getElementById("password");
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
}
// Example: Save a demo task to Local Storage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Example usage (you can replace this later with real form input)
saveTask({ title: "Math Homework", deadline: "2025-09-30" });

// To retrieve:
let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log("Stored Tasks:", storedTasks);

// ===== Task Manager with Local Storage & Progress =====
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDeadline = document.getElementById("taskDeadline");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Handle form submission
if (taskForm) {
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask(taskTitle.value, taskDeadline.value);
    taskTitle.value = "";
    taskDeadline.value = "";
  });
}

function addTask(title, deadline) {
  const task = { title, deadline, completed: false };
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function loadTasks() {
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
      <span style="${task.completed ? "text-decoration: line-through; color: gray;" : ""}">
        ${task.title} - <strong>${task.deadline}</strong>
      </span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });

  updateProgress();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function updateProgress() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let completedTasks = tasks.filter(task => task.completed).length;
  let totalTasks = tasks.length;

  progressText.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
  let percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progressFill.style.width = percent + "%";
}
// Extend renderTasks() to also update timeline view
function renderTasks() {
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
      <span style="${task.completed ? "text-decoration: line-through; color: gray;" : ""}">
        ${task.title} - <strong>${task.deadline}</strong>
      </span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });

  updateProgress();
  renderCalendar(); // 👈 update timeline view
}

// ===== Timeline Calendar View =====
function renderCalendar() {
  const calendarList = document.getElementById("calendarList");
  calendarList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Sort tasks by date
  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="date">${task.deadline}</span>
      <span>${task.title} ${task.completed ? "✅" : ""}</span>
    `;
    calendarList.appendChild(li);
  });
}

