const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-testid="test-todo-complete-toggle" onchange="toggleTask(${index})">
      <span data-testid="test-todo-title" contenteditable="false" ondblclick="editTask(${index})">${task.text}</span>
      <button class="delete" onclick="deleteTask(${index})">Delete</button>
    `;
    todoList.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
};

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  // Implement double-click edit logic similar to GeeksforGeeks example
}

renderTasks();
setInterval(() => {
  // Update due dates/time remaining here based on current date
}, 30000);