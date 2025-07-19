import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Home, Handshake, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const { t } = useLanguage();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col"
      >
        {/* Hero illustration area */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="text-center px-8">
            <div className="w-32 h-32 mx-auto mb-8 bg-primary/20 rounded-full flex items-center justify-center">
              <Home className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              {t("welcome")}
            </h1>
            <p className="text-slate-600 leading-relaxed mb-8">
              {t("welcome_desc")}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Handshake className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{t("trusted_services")}</h3>
                <p className="text-sm text-slate-600">{t("trusted_desc")}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{t("easy_booking")}</h3>
                <p className="text-sm text-slate-600">{t("easy_desc")}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <Button 
            onClick={handleLogin}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-all h-auto mb-4"
          >
            {t("get_started")}
          </Button>
          
          <p className="text-center text-sm text-slate-500">
            Sign in to access your local services
          </p>
        </div>
      </motion.div>
    </div>
  );
}