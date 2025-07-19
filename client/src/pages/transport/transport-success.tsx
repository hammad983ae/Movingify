import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export default function TransportSuccess() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="h-screen flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
          <Truck className="h-12 w-12 text-accent" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          {t("transport_booked")}
        </h1>
        
        <p className="text-slate-600 text-center mb-8 leading-relaxed">
          {t("transport_confirmation")}
        </p>
        
        <div className="w-full space-y-4">
          <Button 
            onClick={() => setLocation("/home")}
            className="w-full bg-accent text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-accent/90 transition-all h-auto"
          >
            {t("back_home")}
          </Button>
          
          <Button 
            variant="outline"
            className="w-full border-2 border-accent text-accent py-4 rounded-2xl font-semibold hover:bg-accent/5 transition-all h-auto"
          >
            {t("track_driver")}
          </Button>
        </div>
      </div>
    </div>
  );
}
