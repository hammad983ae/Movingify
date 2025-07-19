import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin } from "lucide-react";

export default function DisposalSchedule() {
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
              onClick={() => setLocation("/disposal/items")}
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">
              {t("schedule_pickup")}
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Address */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("pickup_address")}
            </Label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter pickup address" 
                className="pl-12 p-4 rounded-2xl border-slate-200 focus:border-secondary"
              />
              <MapPin className="h-5 w-5 absolute left-4 top-4 text-slate-400" />
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
                className="p-4 rounded-2xl border-slate-200 focus:border-secondary"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-800 mb-2">
                {t("time")}
              </Label>
              <Input 
                type="time" 
                className="p-4 rounded-2xl border-slate-200 focus:border-secondary"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("full_name")}
            </Label>
            <Input 
              type="text" 
              placeholder="Enter your full name" 
              className="p-4 rounded-2xl border-slate-200 focus:border-secondary"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("phone_number")}
            </Label>
            <Input 
              type="tel" 
              placeholder="Enter your phone number" 
              className="p-4 rounded-2xl border-slate-200 focus:border-secondary"
            />
          </div>

          {/* Special Instructions */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("special_instructions")}
            </Label>
            <Textarea 
              placeholder="Access information, floor level, etc..." 
              className="p-4 rounded-2xl border-slate-200 h-24 resize-none focus:border-secondary"
            />
          </div>

          {/* Selected Items Summary */}
          <Card className="bg-lighter">
            <CardContent className="p-4">
              <h3 className="font-medium text-slate-800 mb-2">
                {t("selected_items")}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-sm text-slate-600">
                  {t("sofa")}
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-slate-600">
                  {t("chair")}
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-slate-600">
                  {t("table")}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            onClick={() => setLocation("/disposal/success")}
            className="w-full bg-secondary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-secondary/90 transition-all h-auto"
          >
            {t("book_disposal")}
          </Button>
        </div>
      </div>
    </div>
  );
}
