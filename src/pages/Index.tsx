
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { useTaskManager, processRecurringTasks } from "@/utils/storage";
import AppHeader from "@/components/AppHeader";
import TaskSection from "@/components/TaskSection";
import AddTaskDialog from "@/components/AddTaskDialog";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const { 
    getTasks, 
    addTask, 
    deleteTask, 
    toggleTaskCompletion 
  } = useTaskManager();
  
  // Load tasks when component mounts
  useEffect(() => {
    // Process any recurring tasks from previous days
    processRecurringTasks();
    
    // Get all tasks
    const storedTasks = getTasks();
    setTasks(storedTasks);
    
    // Set up local storage listener
    const handleStorageChange = () => {
      setTasks(getTasks());
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  // Handle adding a new task
  const handleAddTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task = addTask(newTask);
    if (task) {
      setTasks(prevTasks => [...prevTasks, task]);
    }
  };
  
  // Handle deleting a task
  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (!taskToDelete) return;
    
    const success = deleteTask(id, taskToDelete.title);
    if (success) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  };
  
  // Handle toggling task completion
  const handleToggleComplete = (id: string) => {
    const taskToToggle = tasks.find(task => task.id === id);
    if (!taskToToggle) return;
    
    const updatedTask = toggleTaskCompletion(id, taskToToggle.title, taskToToggle.isCompleted);
    if (updatedTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-karya-dark text-white flex flex-col">
      <div className="container max-w-md mx-auto px-4 flex-1">
        <AppHeader onAddTaskClick={() => setIsAddDialogOpen(true)} />
        
        <TaskSection
          title="Tasks"
          tasks={tasks}
          emptyMessage="No tasks. Add one to get started!"
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </div>
      
      <AddTaskDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Index;
