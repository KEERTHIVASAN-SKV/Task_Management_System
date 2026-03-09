const API_URL = 'http://localhost:8081/api';
let currentUser = null;
let allTasks = [];
let isEditMode = false;
let currentTaskId = null;

// Check authentication
document.addEventListener('DOMContentLoaded', () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userStr);
    initializeDashboard();
});

function initializeDashboard() {
    // Set user info
    document.getElementById('userName').textContent = currentUser.fullName;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userAvatar').textContent = currentUser.fullName.charAt(0).toUpperCase();
    
    // Load tasks
    loadTasks();
}

async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks?userId=${currentUser.userId}`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        
        allTasks = await response.json();
        updateStats();
        renderTasks(allTasks);
    } catch (error) {
        showNotification('Error loading tasks: ' + error.message, 'error');
    }
}

function updateStats() {
    const total = allTasks.length;
    const pending = allTasks.filter(t => t.status === 'Pending').length;
    const inProgress = allTasks.filter(t => t.status === 'In Progress').length;
    const completed = allTasks.filter(t => t.status === 'Completed').length;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('inProgressTasks').textContent = inProgress;
    document.getElementById('completedTasks').textContent = completed;
}

function renderTasks(tasks) {
    const container = document.getElementById('tasksContainer');
    
    if (tasks.length === 0) {
        container.innerHTML = '<div class="loading">No tasks found. Create your first task!</div>';
        return;
    }
    
    container.innerHTML = tasks.map(task => `
        <div class="task-card ${task.status === 'Completed' ? 'completed' : ''}">
            <div class="task-header">
                <h3 class="task-title">${task.taskTitle}</h3>
                <span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
            <p class="task-description">${task.taskDescription || 'No description'}</p>
            <div class="task-meta">
                <span>📅 ${task.dueDate}</span>
                <span class="status-badge status-${task.status.toLowerCase().replace(' ', '-')}">${task.status}</span>
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

function openTaskModal() {
    isEditMode = false;
    currentTaskId = null;
    document.getElementById('modalTitle').textContent = 'Create New Task';
    document.getElementById('submitBtnText').textContent = 'Create Task';
    document.getElementById('statusGroup').style.display = 'none';
    document.getElementById('taskForm').reset();
    document.getElementById('taskModal').classList.add('show');
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('show');
}

document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const taskData = {
        taskTitle: document.getElementById('taskTitle').value,
        taskDescription: document.getElementById('taskDescription').value,
        priority: document.getElementById('priority').value,
        dueDate: document.getElementById('dueDate').value,
        status: isEditMode ? document.getElementById('status').value : 'Pending',
        userId: currentUser.userId
    };
    
    try {
        const url = isEditMode ? `${API_URL}/tasks/${currentTaskId}` : `${API_URL}/tasks`;
        const method = isEditMode ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        
        if (!response.ok) throw new Error('Failed to save task');
        
        closeTaskModal();
        await loadTasks();
        showNotification(isEditMode ? 'Task updated successfully!' : 'Task created successfully!', 'success');
    } catch (error) {
        showNotification('Error saving task: ' + error.message, 'error');
    }
});

function editTask(id) {
    const task = allTasks.find(t => t.taskId === id);
    if (!task) return;
    
    isEditMode = true;
    currentTaskId = id;
    document.getElementById('modalTitle').textContent = 'Edit Task';
    document.getElementById('submitBtnText').textContent = 'Update Task';
    document.getElementById('statusGroup').style.display = 'block';
    
    document.getElementById('taskTitle').value = task.taskTitle;
    document.getElementById('taskDescription').value = task.taskDescription || '';
    document.getElementById('priority').value = task.priority;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('status').value = task.status;
    
    document.getElementById('taskModal').classList.add('show');
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete task');
        
        await loadTasks();
        showNotification('Task deleted successfully!', 'success');
    } catch (error) {
        showNotification('Error deleting task: ' + error.message, 'error');
    }
}

async function markComplete(id) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/complete`, { method: 'PATCH' });
        if (!response.ok) throw new Error('Failed to mark task as completed');
        
        await loadTasks();
        showNotification('Task marked as completed!', 'success');
    } catch (error) {
        showNotification('Error updating task: ' + error.message, 'error');
    }
}

function handleFilter() {
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    
    let filtered = allTasks;
    
    if (statusFilter) {
        filtered = filtered.filter(t => t.status === statusFilter);
    }
    
    if (priorityFilter) {
        filtered = filtered.filter(t => t.priority === priorityFilter);
    }
    
    renderTasks(filtered);
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        renderTasks(allTasks);
        return;
    }
    
    const filtered = allTasks.filter(t => 
        t.taskTitle.toLowerCase().includes(searchTerm) ||
        (t.taskDescription && t.taskDescription.toLowerCase().includes(searchTerm))
    );
    
    renderTasks(filtered);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
