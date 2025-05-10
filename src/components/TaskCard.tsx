
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
  
  // Format time from HH:MM to 12-hour format
  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour}:${minutes} ${period}`;
    } catch (error) {
      return time;
    }
  };
  
  return (
    <div
      className={cn(
        "task-card",
        task.isPriority && "priority",
        task.isCompleted && "completed"
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => onToggleComplete(task.id)}
    >
      <div className="flex items-center gap-3">
        <div 
          className={cn(
            "w-6 h-6 rounded-full border-2 border-karya-gold flex items-center justify-center",
            task.isCompleted ? "bg-karya-gold" : "bg-transparent"
          )}
        >
          {task.isCompleted && <Check size={16} className="text-black" />}
        </div>
        
        <div className="flex flex-col">
          <h3 className={cn(
            "font-medium text-base",
            task.isCompleted && "line-through opacity-70"
          )}>
            {task.title}
          </h3>
          
          {task.time && (
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <Clock size={12} className="mr-1" />
              {formatTime(task.time)}
              {task.isRecurring && <span className="ml-2">• Daily</span>}
            </div>
          )}
        </div>
      </div>
      
      {task.isPriority && (
        <Star 
          size={18} 
          fill="#D4AF37" 
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
