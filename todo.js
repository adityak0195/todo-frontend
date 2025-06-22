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
    span.textContent = task.text;
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

function addTask(text) {
  tasks.push({ text, completed: false });
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

document.getElementById('todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('task-input');
  if (input.value.trim() !== '') {
    addTask(input.value.trim());
    input.value = '';
  }
});

renderTasks();
