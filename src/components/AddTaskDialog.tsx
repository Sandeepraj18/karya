
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Task } from "@/types/task";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
}

const AddTaskDialog = ({ isOpen, onClose, onAddTask }: AddTaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [isPriority, setIsPriority] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [titleError, setTitleError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate title
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }
    
    // Add new task
    onAddTask({
      title: title.trim(),
      isCompleted: false,
      isPriority,
      isRecurring,
      time: time || undefined,
    });
    
    // Reset form and close dialog
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setTitle("");
    setTime("");
    setIsPriority(false);
    setIsRecurring(false);
    setTitleError("");
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="bg-karya-dark-card border-karya-dark-input sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-karya-gold">Add New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Task Name</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              placeholder="What needs to be done?"
              className={cn(
                "bg-karya-dark-input border-karya-dark-input focus-visible:ring-karya-gold",
                titleError && "border-red-500"
              )}
            />
            {titleError && <p className="text-red-500 text-xs">{titleError}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time (Optional)</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-karya-dark-input border-karya-dark-input focus-visible:ring-karya-gold"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                type="button"
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isPriority ? "bg-karya-gold text-black" : "bg-karya-dark-input text-karya-gold"
                )}
                onClick={() => setIsPriority(!isPriority)}
              >
                <Star size={18} fill={isPriority ? "#000000" : "transparent"} />
              </button>
              <Label htmlFor="priority-toggle">Priority Task</Label>
            </div>
            <Switch
              id="priority-toggle"
              checked={isPriority}
              onCheckedChange={setIsPriority}
              className="data-[state=checked]:bg-karya-gold"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="recurring-toggle">Repeat Daily</Label>
            <Switch
              id="recurring-toggle"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
              className="data-[state=checked]:bg-karya-gold"
            />
          </div>
          
          <DialogFooter className="pt-2">
            <Button 
              variant="outline" 
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="border-karya-gold text-karya-gold hover:bg-karya-dark-input"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-karya-gold hover:bg-karya-gold-light text-black"
            >
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
