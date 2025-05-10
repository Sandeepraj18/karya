
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AppHeaderProps {
  onAddTaskClick: () => void;
}

const AppHeader = ({ onAddTaskClick }: AppHeaderProps) => {
  return (
    <header className="flex flex-col py-4 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <img 
          src="/lovable-uploads/d26b3a6d-5f32-4485-9c5b-cb799eabca9a.png" 
          alt="Karya Logo" 
          className="w-8 h-8"
        />
        <h1 className="text-4xl font-light text-gray-200">Karya</h1>
      </div>
      
      <Button 
        onClick={onAddTaskClick}
        className="bg-karya-dark-card hover:bg-karya-dark-input text-gray-200 rounded-full py-6 flex items-center gap-2 w-full justify-start px-6"
      >
        <Plus size={24} />
        <span className="text-xl font-normal">Add Task</span>
      </Button>
    </header>
  );
};

export default AppHeader;
