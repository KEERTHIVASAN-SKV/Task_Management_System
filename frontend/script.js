const API_URL = 'http://localhost:8081/api/tasks';

// Debug: Log the API URL being used
console.log('Task Management System - API URL:', API_URL);
console.log('If you see port 8080 above, clear your browser cache!');

let tasks = [];
let isEditMode = false;
let currentTaskId = null;

const modal = document.getElementById('taskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const taskForm = document.getElementById('taskForm');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchInput');
const tasksContainer = document.getElementById('tasksContainer');

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

function setupEventListeners() {
    addTaskBtn.addEventListener('click', openAddModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    taskForm.addEventListener('submit', handleFormSubmit);
    statusFilter.addEventListener('change', handleFilter);
    searchInput.addEventListener('input', handleSearch);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasksContainer.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 10px; text-align: center; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #d63031;">⚠️ Cannot Connect to Backend</h2>
                <p style="color: #666; margin: 15px 0;">Make sure the backend server is running on port 8081</p>
                <p style="color: #888; font-size: 0.9rem;">Error: ${error.message}</p>
                <button onclick="window.location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem;">
                    🔄 Retry Connection
                </button>
                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: left;">
                    <strong>Quick Fix:</strong>
                    <ol style="margin: 10px 0; padding-left: 20px; color: #333;">
                        <li>Open terminal in project folder</li>
                        <li>Run: <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">cd backend</code></li>
                        <li>Run: <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">mvn spring-boot:run</code></li>
                        <li>Wait for "Started TaskManagementApplication"</li>
                        <li>Click "Retry Connection" above</li>
                    </ol>
                    <p style="margin-top: 15px; color: #666;">
                        <strong>Backend URL:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">http://localhost:8081/api/tasks</code>
                    </p>
                </div>
            </div>
        `;
    }
}

function renderTasks(tasksToRender) {
    if (tasksToRender.length === 0) {
        tasksContainer.innerHTML = '<div id="loadingMessage">No tasks found</div>';
        return;
    }
    
    tasksContainer.innerHTML = tasksToRender.map(task => `
        <div class="task-card ${task.status === 'Completed' ? 'completed' : ''}">
            <div class="task-header">
                <h3 class="task-title">${task.taskTitle}</h3>
                <span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
            <p class="task-description">${task.taskDescription || 'No description'}</p>
            <div class="task-meta">
                <span>📅 Due: ${task.dueDate}</span>
                <span class="status-badge status-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
            </div>
            <div class="task-meta">
                <span>🕒 Created: ${formatDateTime(task.createdDateTime)}</span>
            </div>
            <div class="task-actions">
                ${task.status !== 'Completed' ? 
                    `<button class="btn-complete" onclick="markComplete(${task.taskId})">✓ Complete</button>` : ''}
                <button class="btn-edit" onclick="editTask(${task.taskId})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteTask(${task.taskId})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

function formatDateTime(dateTime) {
    return new Date(dateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function openAddModal() {
    isEditMode = false;
    currentTaskId = null;
    document.getElementById('modalTitle').textContent = 'Add New Task';
    document.getElementById('statusGroup').style.display = 'none';
    taskForm.reset();
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    taskForm.reset();
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const taskData = {
        taskTitle: document.getElementById('taskTitle').value,
        taskDescription: document.getElementById('taskDescription').value,
        priority: document.getElementById('priority').value,
        dueDate: document.getElementById('dueDate').value,
        status: isEditMode ? document.getElementById('status').value : 'Pending'
    };
    
    try {
        const url = isEditMode ? `${API_URL}/${currentTaskId}` : API_URL;
        const method = isEditMode ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) throw new Error('Failed to save task');
        
        closeModal();
        await loadTasks();
        showSuccess(isEditMode ? 'Task updated successfully!' : 'Task created successfully!');
    } catch (error) {
        showError('Error saving task: ' + error.message);
    }
}

async function editTask(id) {
    const task = tasks.find(t => t.taskId === id);
    if (!task) return;
    
    isEditMode = true;
    currentTaskId = id;
    document.getElementById('modalTitle').textContent = 'Edit Task';
    document.getElementById('statusGroup').style.display = 'block';
    
    document.getElementById('taskTitle').value = task.taskTitle;
    document.getElementById('taskDescription').value = task.taskDescription || '';
    document.getElementById('priority').value = task.priority;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('status').value = task.status;
    
    modal.style.display = 'block';
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete task');
        
        await loadTasks();
        showSuccess('Task deleted successfully!');
    } catch (error) {
        showError('Error deleting task: ' + error.message);
    }
}

async function markComplete(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/complete`, { method: 'PATCH' });
        if (!response.ok) throw new Error('Failed to mark task as completed');
        
        await loadTasks();
        showSuccess('Task marked as completed!');
    } catch (error) {
        showError('Error updating task: ' + error.message);
    }
}

async function handleFilter() {
    const status = statusFilter.value;
    
    if (!status) {
        renderTasks(tasks);
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/status/${status}`);
        if (!response.ok) throw new Error('Failed to filter tasks');
        const filteredTasks = await response.json();
        renderTasks(filteredTasks);
    } catch (error) {
        showError('Error filtering tasks: ' + error.message);
    }
}

async function handleSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        renderTasks(tasks);
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/search?title=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('Failed to search tasks');
        const searchResults = await response.json();
        renderTasks(searchResults);
    } catch (error) {
        showError('Error searching tasks: ' + error.message);
    }
}

function showSuccess(message) {
    alert(message);
}

function showError(message) {
    alert(message);
}
