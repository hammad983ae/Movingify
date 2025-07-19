import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin } from "lucide-react";

export default function MovingLocations() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="pb-20">
        {/* Header */}
        <div className="bg-white px-6 pt-16 pb-6 border-b border-slate-100">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4 p-2 -ml-2 rounded-full hover:bg-slate-100"
              onClick={() => setLocation("/moving/rooms")}
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">
              {t("locations_schedule")}
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Origin Address */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("pickup_address")}
            </Label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter pickup address" 
                className="pl-12 p-4 rounded-2xl border-slate-200 focus:border-primary"
              />
              <MapPin className="h-5 w-5 absolute left-4 top-4 text-slate-400" />
            </div>
          </div>

          {/* Destination Address */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("destination_address")}
            </Label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter destination address" 
                className="pl-12 p-4 rounded-2xl border-slate-200 focus:border-primary"
              />
              <MapPin className="h-5 w-5 absolute left-4 top-4 text-slate-400" />
            </div>
          </div>

          {/* Map Preview */}
          <div className="bg-slate-100 rounded-2xl h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-slate-400 mb-2 mx-auto" />
              <p className="text-slate-600">{t("map_preview")}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-800 mb-2">
                {t("date")}
              </Label>
              <Input 
                type="date" 
                className="p-4 rounded-2xl border-slate-200 focus:border-primary"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-800 mb-2">
                {t("time")}
              </Label>
              <Input 
                type="time" 
                className="p-4 rounded-2xl border-slate-200 focus:border-primary"
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("special_instructions")}
            </Label>
            <Textarea 
              placeholder="Any special requirements or notes..." 
              className="p-4 rounded-2xl border-slate-200 h-24 resize-none focus:border-primary"
            />
          </div>

          {/* Continue Button */}
          <Button 
            onClick={() => setLocation("/moving/contact")}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-all h-auto"
          >
            {t("continue_contact")}
          </Button>
        </div>
      </div>
    </div>
  );
}
