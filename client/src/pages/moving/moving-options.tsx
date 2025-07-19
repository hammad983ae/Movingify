import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calculator, Users, ChevronRight } from "lucide-react";

export default function MovingOptions() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="pb-20">
        {/* Header with back button */}
        <div className="bg-white px-6 pt-16 pb-6 border-b border-slate-100">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4 p-2 -ml-2 rounded-full hover:bg-slate-100"
              onClick={() => setLocation("/home")}
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">
              {t("moving_service")}
            </h1>
          </div>
          <p className="text-slate-600">{t("choose_option")}</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {/* Request Quote Option */}
            <Card 
              className="hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
              onClick={() => setLocation("/moving/rooms")}
            >
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {t("request_quote")}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {t("get_estimate")}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            {/* Choose Supplier Option */}
            <Card className="hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 border-2 border-transparent hover:border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {t("choose_supplier")}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {t("browse_movers")}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
