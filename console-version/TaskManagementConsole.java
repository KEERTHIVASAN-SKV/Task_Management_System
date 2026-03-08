import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

class Task {
    private static long idCounter = 1;
    private long taskId;
    private String taskTitle;
    private String taskDescription;
    private String priority;
    private LocalDate dueDate;
    private String status;
    private LocalDateTime createdDateTime;
    
    public Task(String taskTitle, String taskDescription, String priority, LocalDate dueDate) {
        this.taskId = idCounter++;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.priority = priority;
        this.dueDate = dueDate;
        this.status = "Pending";
        this.createdDateTime = LocalDateTime.now();
    }
    
    public long getTaskId() { return taskId; }
    public String getTaskTitle() { return taskTitle; }
    public void setTaskTitle(String taskTitle) { this.taskTitle = taskTitle; }
    public String getTaskDescription() { return taskDescription; }
    public void setTaskDescription(String taskDescription) { this.taskDescription = taskDescription; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedDateTime() { return createdDateTime; }
    
    @Override
    public String toString() {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return String.format("ID: %d | Title: %s | Priority: %s | Due: %s | Status: %s | Created: %s",
            taskId, taskTitle, priority, dueDate.format(dateFormatter), status, 
            createdDateTime.format(dateTimeFormatter));
    }
}

public class TaskManagementConsole {
    private static ArrayList<Task> taskList = new ArrayList<>();
    private static HashMap<Long, Task> taskMap = new HashMap<>();
    private static Scanner scanner = new Scanner(System.in);
    
    public static void main(String[] args) {
        System.out.println("=== Task & Deadline Management System ===");
        
        while (true) {
            displayMenu();
            int choice = getIntInput("Enter your choice: ");
            
            switch (choice) {
                case 1: addTask(); break;
                case 2: viewAllTasks(); break;
                case 3: updateTask(); break;
                case 4: deleteTask(); break;
                case 5: filterByStatus(); break;
                case 6: searchByTitle(); break;
                case 7: markAsCompleted(); break;
                case 8: 
                    System.out.println("Exiting... Goodbye!");
                    return;
                default: 
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
    
    private static void displayMenu() {
        System.out.println("\n--- Menu ---");
        System.out.println("1. Add New Task");
        System.out.println("2. View All Tasks");
        System.out.println("3. Update Task");
        System.out.println("4. Delete Task");
        System.out.println("5. Filter by Status");
        System.out.println("6. Search by Title");
        System.out.println("7. Mark as Completed");
        System.out.println("8. Exit");
    }
    
    private static void addTask() {
        System.out.println("\n--- Add New Task ---");
        String title = getStringInput("Task Title: ");
        String description = getStringInput("Task Description: ");
        String priority = getPriorityInput();
        LocalDate dueDate = getDateInput("Due Date (yyyy-MM-dd): ");
        
        Task task = new Task(title, description, priority, dueDate);
        taskList.add(task);
        taskMap.put(task.getTaskId(), task);
        System.out.println("Task added successfully! ID: " + task.getTaskId());
    }
    
    private static void viewAllTasks() {
        System.out.println("\n--- All Tasks ---");
        if (taskList.isEmpty()) {
            System.out.println("No tasks available.");
            return;
        }
        for (Task task : taskList) {
            System.out.println(task);
        }
    }
    
    private static void updateTask() {
        long id = getLongInput("Enter Task ID to update: ");
        Task task = taskMap.get(id);
        if (task == null) {
            System.out.println("Task not found.");
            return;
        }
        
        task.setTaskTitle(getStringInput("New Title: "));
        task.setTaskDescription(getStringInput("New Description: "));
        task.setPriority(getPriorityInput());
        task.setDueDate(getDateInput("New Due Date (yyyy-MM-dd): "));
        System.out.println("Task updated successfully!");
    }
    
    private static void deleteTask() {
        long id = getLongInput("Enter Task ID to delete: ");
        Task task = taskMap.remove(id);
        if (task != null) {
            taskList.remove(task);
            System.out.println("Task deleted successfully!");
        } else {
            System.out.println("Task not found.");
        }
    }
    
    private static void filterByStatus() {
        String status = getStatusInput();
        System.out.println("\n--- Tasks with Status: " + status + " ---");
        boolean found = false;
        for (Task task : taskList) {
            if (task.getStatus().equalsIgnoreCase(status)) {
                System.out.println(task);
                found = true;
            }
        }
        if (!found) System.out.println("No tasks found with this status.");
    }
    
    private static void searchByTitle() {
        String keyword = getStringInput("Enter search keyword: ");
        System.out.println("\n--- Search Results ---");
        boolean found = false;
        for (Task task : taskList) {
            if (task.getTaskTitle().toLowerCase().contains(keyword.toLowerCase())) {
                System.out.println(task);
                found = true;
            }
        }
        if (!found) System.out.println("No tasks found.");
    }
    
    private static void markAsCompleted() {
        long id = getLongInput("Enter Task ID to mark as completed: ");
        Task task = taskMap.get(id);
        if (task != null) {
            task.setStatus("Completed");
            System.out.println("Task marked as completed!");
        } else {
            System.out.println("Task not found.");
        }
    }
    
    private static String getStringInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine().trim();
    }
    
    private static int getIntInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return Integer.parseInt(scanner.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
            }
        }
    }
    
    private static long getLongInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return Long.parseLong(scanner.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid ID.");
            }
        }
    }
    
    private static LocalDate getDateInput(String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return LocalDate.parse(scanner.nextLine().trim());
            } catch (Exception e) {
                System.out.println("Invalid date format. Use yyyy-MM-dd.");
            }
        }
    }
    
    private static String getPriorityInput() {
        while (true) {
            System.out.print("Priority (Low/Medium/High): ");
            String priority = scanner.nextLine().trim();
            if (priority.equalsIgnoreCase("Low") || priority.equalsIgnoreCase("Medium") || 
                priority.equalsIgnoreCase("High")) {
                return priority.substring(0, 1).toUpperCase() + priority.substring(1).toLowerCase();
            }
            System.out.println("Invalid priority. Choose Low, Medium, or High.");
        }
    }
    
    private static String getStatusInput() {
        while (true) {
            System.out.print("Status (Pending/In Progress/Completed): ");
            String status = scanner.nextLine().trim();
            if (status.equalsIgnoreCase("Pending") || status.equalsIgnoreCase("In Progress") || 
                status.equalsIgnoreCase("Completed")) {
                return status;
            }
            System.out.println("Invalid status.");
        }
    }
}
