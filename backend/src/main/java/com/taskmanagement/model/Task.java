package com.taskmanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;
    
    @NotBlank(message = "Task title is required")
    @Column(nullable = false)
    private String taskTitle;
    
    @Column(length = 1000)
    private String taskDescription;
    
    @NotBlank(message = "Priority is required")
    @Column(nullable = false)
    private String priority;
    
    @NotNull(message = "Due date is required")
    @Column(nullable = false)
    private LocalDate dueDate;
    
    @Column(nullable = false)
    private String status = "Pending";
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDateTime;
    
    @PrePersist
    protected void onCreate() {
        createdDateTime = LocalDateTime.now();
    }
    
    // Constructors
    public Task() {}
    
    public Task(String taskTitle, String taskDescription, String priority, LocalDate dueDate) {
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.priority = priority;
        this.dueDate = dueDate;
    }
    
    // Getters and Setters
    public Long getTaskId() {
        return taskId;
    }
    
    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
    
    public String getTaskTitle() {
        return taskTitle;
    }
    
    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }
    
    public String getTaskDescription() {
        return taskDescription;
    }
    
    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
    
    public String getPriority() {
        return priority;
    }
    
    public void setPriority(String priority) {
        this.priority = priority;
    }
    
    public LocalDate getDueDate() {
        return dueDate;
    }
    
    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }
    
    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
