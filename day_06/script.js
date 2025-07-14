const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');

// Load from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTodos);

// Handle form submit
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = todoInput.value.trim();

  if (task === '') {
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');
  addTodo(task);
  saveTodo(task);
  todoInput.value = '';
});

function addTodo(task, completed = false) {
  const li = document.createElement('li');
  li.textContent = task;
  if (completed) li.classList.add('completed');

  // Toggle complete
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateStorage();
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  });

  li.appendChild(delBtn);
  todoList.appendChild(li);
}

function saveTodo(task) {
  const todos = getTodos();
  todos.push({ task, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = getTodos();
  todos.forEach(todo => addTodo(todo.task, todo.completed));
}

function updateStorage() {
  const todos = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    todos.push({
      task: li.childNodes[0].nodeValue.trim(),
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
}
