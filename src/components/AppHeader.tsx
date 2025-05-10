
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AppHeaderProps {
  onAddTaskClick: () => void;
}

const AppHeader = ({ onAddTaskClick }: AppHeaderProps) => {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/d26b3a6d-5f32-4485-9c5b-cb799eabca9a.png" 
          alt="Karya Logo" 
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-bold text-karya-gold">Karya</h1>
      </div>
      
      <Button 
        onClick={onAddTaskClick}
        className="bg-karya-gold hover:bg-karya-gold-light text-black rounded-full w-10 h-10 p-0"
      >
        <Plus size={20} />
      </Button>
    </header>
  );
};

export default AppHeader;
