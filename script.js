// Variables globales para el manejo de tareas
let tasks = [];
let currentTask = null;

function addTask() {
    const taskInput = document.getElementById('task').value;
    const priorityInput = document.getElementById('priority').value;
    const commentInput = document.getElementById('comment').value;

    if (taskInput.trim() !== '') {
        const newTask = {
            task: taskInput,
            priority: priorityInput || 'N/A',
            comment: commentInput || 'N/A'
        };

        tasks.push(newTask);
        updateTaskList();
        closeModal();
    }
}

function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span>${task.task}</span>
            <div class="actions">
                <button onclick="completeTask(${index})">Completar</button>
                <button onclick="confirmDeleteTask(${index})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

function completeTask(index) {
    currentTask = index;
    openModal('¿Marcar tarea como completada?', completeCurrentTask);
}

function completeCurrentTask() {
    tasks.splice(currentTask, 1);
    updateTaskList();
    currentTask = null;
}

function confirmDeleteTask(index) {
    currentTask = index;
    openModal('¿Eliminar esta tarea?', deleteCurrentTask);
}

function deleteCurrentTask() {
    tasks.splice(currentTask, 1);
    updateTaskList();
    currentTask = null;
}

function openModal(message, action) {
    const modal = document.getElementById('confirmationModal');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <p>${message}</p>
        <button onclick="executeAction(${action})">Confirmar</button>
        <button onclick="closeModal()">Cancelar</button>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

function executeAction(action) {
    if (typeof action === 'function') {
        action();
    }
    closeModal();
}

// Inicializar la lista de tareas
updateTaskList();
