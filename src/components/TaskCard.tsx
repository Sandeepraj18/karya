
import { useState, useRef } from "react";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { Check, Star, Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onToggleComplete, onDelete }: TaskCardProps) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      
      // If swiping left for more than 50px, show delete action
      if (diff > 50) {
        setIsSwiping(true);
      } else {
        setIsSwiping(false);
      }
    }
  };
  
  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      
      // If swiped left for more than 100px, delete the task
      if (diff > 100) {
        onDelete(task.id);
      } else {
        setIsSwiping(false);
      }
    }
    
    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
  };
  
  // Format time from HH:MM to standard format
  const formatTime = (time: string) => {
    try {
      return time;
    } catch (error) {
      return time;
    }
  };
  
  // Format location or description shown under task
  const renderSubtext = () => {
    if (task.time) {
      return (
        <div className="flex items-center text-sm text-gray-400">
          {task.time}
        </div>
      );
    } else if (task.isRecurring) {
      return (
        <div className="flex items-center text-sm text-gray-400">
          Today
        </div>
      );
    }
    return null;
  };
  
  return (
    <div
      className={cn(
        "task-card rounded-2xl mb-3",
        task.isCompleted && "completed"
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => onToggleComplete(task.id)}
    >
      <div className="flex items-center gap-4">
        <div 
          className={cn(
            "w-7 h-7 rounded-full border-2 border-gray-500 flex items-center justify-center",
            task.isCompleted ? "bg-gray-500" : "bg-transparent"
          )}
        >
          {task.isCompleted && <Check size={16} className="text-black" />}
        </div>
        
        <div className="flex flex-col">
          <h3 className={cn(
            "font-normal text-xl",
            task.isCompleted && "line-through opacity-70"
          )}>
            {task.title}
          </h3>
          
          {renderSubtext()}
        </div>
      </div>
      
      {task.isPriority && (
        <Star 
          size={22} 
          className="text-karya-gold" 
          onClick={(e) => e.stopPropagation()}
        />
      )}
      
      {/* Delete action shown when swiping */}
      {isSwiping && (
        <div className="swipe-action">Delete</div>
      )}
    </div>
  );
};

export default TaskCard;
