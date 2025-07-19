import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Home, Handshake, Clock } from "lucide-react";
import { motion } from "framer-motion";

const onboardingScreens = [
  {
    icon: Home,
    title: "welcome",
    description: "welcome_desc",
    buttonText: "get_started",
    bgColor: "from-primary/10 to-secondary/10",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    buttonColor: "bg-primary hover:bg-primary/90",
  },
  {
    icon: Handshake,
    title: "trusted_services",
    description: "trusted_desc",
    buttonText: "continue",
    bgColor: "from-secondary/10 to-accent/10",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    buttonColor: "bg-secondary hover:bg-secondary/90",
  },
  {
    icon: Clock,
    title: "easy_booking",
    description: "easy_desc",
    buttonText: "start_exploring",
    bgColor: "from-accent/10 to-primary/10",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    buttonColor: "bg-accent hover:bg-accent/90",
  },
];

export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const handleNext = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      setLocation("/home");
    }
  };

  const screen = onboardingScreens[currentScreen];
  const Icon = screen.icon;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <motion.div 
        key={currentScreen}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="h-screen flex flex-col"
      >
        {/* Welcome illustration area */}
        <div className={`flex-1 flex items-center justify-center bg-gradient-to-br ${screen.bgColor}`}>
          <div className="text-center px-8">
            <div className={`w-32 h-32 mx-auto mb-8 ${screen.iconBg} rounded-full flex items-center justify-center`}>
              <Icon className={`h-16 w-16 ${screen.iconColor}`} />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              {t(screen.title as any)}
            </h1>
            <p className="text-slate-600 leading-relaxed">
              {t(screen.description as any)}
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <Button 
            onClick={handleNext}
            className={`w-full ${screen.buttonColor} text-white py-4 rounded-2xl font-semibold shadow-lg transition-all h-auto`}
          >
            {t(screen.buttonText as any)}
          </Button>
          
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {onboardingScreens.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentScreen 
                      ? screen.iconColor.replace('text-', 'bg-')
                      : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
