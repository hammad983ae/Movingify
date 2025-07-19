import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Recycle } from "lucide-react";

export default function DisposalSuccess() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="h-screen flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Recycle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          {t("disposal_booked")}
        </h1>
        
        <p className="text-slate-600 text-center mb-8 leading-relaxed">
          {t("disposal_confirmation")}
        </p>
        
        <div className="w-full space-y-4">
          <Button 
            onClick={() => setLocation("/home")}
            className="w-full bg-secondary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-secondary/90 transition-all h-auto"
          >
            {t("back_home")}
          </Button>
        </div>
      </div>
    </div>
  );
}
