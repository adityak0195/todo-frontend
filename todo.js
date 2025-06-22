let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = `${task.text} (Due: ${task.dueDate || 'N/A'}, Priority: ${task.priority || 'low'})`;
    span.className = task.completed ? 'completed' : '';
    span.onclick = () => toggleComplete(index);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function addTask(text, dueDate, priority) {
  tasks.push({
    text: text,
    dueDate: dueDate,
    priority: priority,
    completed: false
  });
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

document.getElementById('todo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('task-input');
  const date = document.getElementById('due-date');
  const priority = document.getElementById('priority');

  if (input.value.trim() !== '') {
    addTask(input.value.trim(), date.value, priority.value);
    input.value = '';
    date.value = '';
    priority.value = 'low';
  }
});

renderTasks();
