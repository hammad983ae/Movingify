import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Home, Calendar, User, Headphones } from "lucide-react";

const navItems = [
  { path: "/home", icon: Home, key: "home" as const },
  { path: "/bookings", icon: Calendar, key: "bookings" as const },
  { path: "/profile", icon: User, key: "profile" as const },
  { path: "/support", icon: Headphones, key: "support" as const },
];

export function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className="flex flex-col items-center py-2 h-auto"
              onClick={() => setLocation(item.path)}
            >
              <Icon 
                className={`h-5 w-5 ${
                  isActive ? "text-primary" : "text-slate-400"
                }`} 
              />
              <span 
                className={`text-xs mt-1 ${
                  isActive ? "text-primary font-medium" : "text-slate-400"
                }`}
              >
                {t(item.key)}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
