import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Circle, MapPin, Route, Car, Truck } from "lucide-react";

export default function TransportLocations() {
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
              onClick={() => setLocation("/home")}
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">
              {t("transport_service")}
            </h1>
          </div>
          <p className="text-slate-600">{t("enter_locations")}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Pickup Location */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("pickup_location")}
            </Label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter pickup address" 
                className="pl-12 p-4 rounded-2xl border-slate-200 focus:border-accent"
              />
              <Circle className="h-5 w-5 absolute left-4 top-4 text-accent" />
            </div>
          </div>

          {/* Drop-off Location */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("dropoff_location")}
            </Label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter destination address" 
                className="pl-12 p-4 rounded-2xl border-slate-200 focus:border-accent"
              />
              <MapPin className="h-5 w-5 absolute left-4 top-4 text-accent" />
            </div>
          </div>

          {/* Route Preview */}
          <div className="bg-slate-100 rounded-2xl h-48 flex items-center justify-center">
            <div className="text-center">
              <Route className="h-8 w-8 text-slate-400 mb-2 mx-auto" />
              <p className="text-slate-600">{t("route_preview")}</p>
              <p className="text-sm text-slate-500 mt-1">
                Estimated distance: 12.5 km
              </p>
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
                className="p-4 rounded-2xl border-slate-200 focus:border-accent"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-800 mb-2">
                {t("time")}
              </Label>
              <Input 
                type="time" 
                className="p-4 rounded-2xl border-slate-200 focus:border-accent"
              />
            </div>
          </div>

          {/* Transport Type */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("transport_type")}
            </Label>
            <RadioGroup defaultValue="small" className="grid grid-cols-2 gap-3">
              <div>
                <Label 
                  htmlFor="small"
                  className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:border-accent"
                >
                  <RadioGroupItem value="small" id="small" className="mr-3" />
                  <div>
                    <div className="flex items-center mb-1">
                      <Car className="h-4 w-4 text-accent mr-2" />
                      <span className="font-medium">{t("small_car")}</span>
                    </div>
                    <p className="text-xs text-slate-500">Up to 300kg</p>
                  </div>
                </Label>
              </div>
              <div>
                <Label 
                  htmlFor="van"
                  className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:border-accent"
                >
                  <RadioGroupItem value="van" id="van" className="mr-3" />
                  <div>
                    <div className="flex items-center mb-1">
                      <Truck className="h-4 w-4 text-accent mr-2" />
                      <span className="font-medium">{t("van")}</span>
                    </div>
                    <p className="text-xs text-slate-500">Up to 1000kg</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("notes")}
            </Label>
            <Textarea 
              placeholder="Special instructions, item details, etc..." 
              className="p-4 rounded-2xl border-slate-200 h-24 resize-none focus:border-accent"
            />
          </div>

          {/* Continue Button */}
          <Button 
            onClick={() => setLocation("/transport/contact")}
            className="w-full bg-accent text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-accent/90 transition-all h-auto"
          >
            {t("continue_contact")}
          </Button>
        </div>
      </div>
    </div>
  );
}
