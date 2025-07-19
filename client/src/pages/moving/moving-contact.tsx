import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Phone, Mail } from "lucide-react";

export default function MovingContact() {
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
              onClick={() => setLocation("/moving/locations")}
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">
              {t("contact_info")}
            </h1>
          </div>
          <p className="text-slate-600">{t("almost_done")}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Full Name */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("full_name")}
            </Label>
            <Input 
              type="text" 
              placeholder="Enter your full name" 
              className="p-4 rounded-2xl border-slate-200 focus:border-primary"
            />
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("email_address")}
            </Label>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="p-4 rounded-2xl border-slate-200 focus:border-primary"
            />
          </div>

          {/* Phone */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("phone_number")}
            </Label>
            <Input 
              type="tel" 
              placeholder="Enter your phone number" 
              className="p-4 rounded-2xl border-slate-200 focus:border-primary"
            />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <Label className="text-sm font-medium text-slate-800 mb-2">
              {t("preferred_contact")}
            </Label>
            <RadioGroup defaultValue="phone" className="grid grid-cols-2 gap-3">
              <div>
                <Label 
                  htmlFor="phone"
                  className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:border-primary"
                >
                  <RadioGroupItem value="phone" id="phone" className="mr-3" />
                  <Phone className="h-4 w-4 mr-2 text-slate-600" />
                  <span>{t("phone")}</span>
                </Label>
              </div>
              <div>
                <Label 
                  htmlFor="email"
                  className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:border-primary"
                >
                  <RadioGroupItem value="email" id="email" className="mr-3" />
                  <Mail className="h-4 w-4 mr-2 text-slate-600" />
                  <span>{t("email")}</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={() => setLocation("/moving/success")}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-all h-auto"
          >
            {t("submit_request")}
          </Button>

          {/* Summary Card */}
          <Card className="bg-lighter">
            <CardContent className="p-4">
              <h3 className="font-medium text-slate-800 mb-2">
                {t("request_summary")}
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{t("service")}:</span>
                  <span>{t("moving")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("rooms")}:</span>
                  <span>3 selected</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("date")}:</span>
                  <span>To be filled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
