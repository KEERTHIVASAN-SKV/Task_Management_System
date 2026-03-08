-- Run this script in MySQL Workbench or MySQL command line
-- to setup the database

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS task_management_db;

-- Use the database
USE task_management_db;

-- Show tables (will be empty initially, Spring Boot will create them)
SHOW TABLES;

-- After running the application, you can check the tasks table:
-- SELECT * FROM tasks;
