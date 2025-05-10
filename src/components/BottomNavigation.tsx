
import { cn } from "@/lib/utils";
import { Home, CheckCircle } from "lucide-react";

interface BottomNavigationProps {
  activeTab: "home" | "completed";
  onTabChange: (tab: "home" | "completed") => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-karya-dark-card border-t border-karya-dark-input p-2">
      <div className="container max-w-md flex items-center justify-around">
        <button
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
            activeTab === "home" 
              ? "text-karya-gold" 
              : "text-gray-500 hover:text-gray-300"
          )}
          onClick={() => onTabChange("home")}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
            activeTab === "completed" 
              ? "text-karya-gold" 
              : "text-gray-500 hover:text-gray-300"
          )}
          onClick={() => onTabChange("completed")}
        >
          <CheckCircle size={24} />
          <span className="text-xs mt-1">Completed</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
