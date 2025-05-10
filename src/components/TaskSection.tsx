
import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  emptyMessage: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskSection = ({ 
  title, 
  tasks, 
  emptyMessage, 
  onToggleComplete, 
  onDelete 
}: TaskSectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-normal uppercase tracking-wider mb-4 text-gray-500">{title}</h2>
      
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggleComplete={onToggleComplete} 
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
};

export default TaskSection;
