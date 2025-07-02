// Select elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = task;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = input.value.trim();
  if (value) {
    tasks.push(value);
    saveTasks();
    renderTasks();
    input.value = '';
  }
});

// Initial render
renderTasks(); 