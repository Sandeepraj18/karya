
import { Task } from "@/types/task";

// This is a mock database using localStorage
// In a real app, you'd use SQLite, Hive, or another local database

const TASKS_KEY = "karya_tasks";

// Get all tasks from storage
export const getTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(TASKS_KEY);
    if (!tasksJson) return [];
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error("Error getting tasks:", error);
    return [];
  }
};

// Save tasks to storage
export const saveTasks = (tasks: Task[]): boolean => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Error saving tasks:", error);
    return false;
  }
};

// Add a new task
export const addTask = (task: Omit<Task, "id" | "createdAt">): Task | null => {
  try {
    const tasks = getTasks();
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    saveTasks([...tasks, newTask]);
    return newTask;
  } catch (error) {
    console.error("Error adding task:", error);
    return null;
  }
};

// Delete a task
export const deleteTask = (id: string): boolean => {
  try {
    const tasks = getTasks();
    const newTasks = tasks.filter(task => task.id !== id);
    return saveTasks(newTasks);
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};

// Toggle task completion
export const toggleTaskCompletion = (id: string): Task | null => {
  try {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task => {
      if (task.id !== id) return task;
      
      const isCompleted = !task.isCompleted;
      return {
        ...task,
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : undefined
      };
    });
    
    saveTasks(updatedTasks);
    return updatedTasks.find(task => task.id === id) || null;
  } catch (error) {
    console.error("Error toggling task completion:", error);
    return null;
  }
};

// Process recurring tasks (should be called when the app loads)
export const processRecurringTasks = (): void => {
  try {
    const tasks = getTasks();
    const today = new Date().toISOString().split('T')[0];
    
    // Find completed recurring tasks from previous days
    const recurringTasksToAdd = tasks.filter(task => 
      task.isRecurring && 
      task.isCompleted && 
      task.completedAt && 
      task.completedAt.split('T')[0] !== today
    );
    
    // Create new instances of these tasks for today
    if (recurringTasksToAdd.length > 0) {
      const newTasks = recurringTasksToAdd.map(task => ({
        ...task,
        id: `${task.id}_${Date.now()}`,
        isCompleted: false,
        completedAt: undefined,
        createdAt: new Date().toISOString()
      }));
      
      saveTasks([...tasks, ...newTasks]);
    }
  } catch (error) {
    console.error("Error processing recurring tasks:", error);
  }
};

// Custom hook to manage tasks without toast notifications
export const useTaskManager = () => {
  return {
    getTasks,
    addTask: (task: Omit<Task, "id" | "createdAt">) => {
      return addTask(task);
    },
    deleteTask: (id: string, title: string) => {
      return deleteTask(id);
    },
    toggleTaskCompletion: (id: string, title: string, currentStatus: boolean) => {
      return toggleTaskCompletion(id);
    },
    processRecurringTasks
  };
};
