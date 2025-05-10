
import { cn } from "@/lib/utils";
import { Home, Check } from "lucide-react";

interface BottomNavigationProps {
  activeTab: "home" | "completed";
  onTabChange: (tab: "home" | "completed") => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-karya-dark-input py-4">
      <div className="container max-w-md flex items-center justify-around">
        <button
          className={cn(
            "flex flex-col items-center justify-center p-2",
            activeTab === "home" 
              ? "text-gray-200" 
              : "text-gray-500"
          )}
          onClick={() => onTabChange("home")}
        >
          <Home size={26} />
        </button>
        
        <button
          className={cn(
            "flex flex-col items-center justify-center p-2",
            activeTab === "completed" 
              ? "text-gray-200" 
              : "text-gray-500"
          )}
          onClick={() => onTabChange("completed")}
        >
          <Check size={26} />
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
