import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, MapPin, CreditCard, Bell, LogOut } from "lucide-react";

export default function Profile() {
  const { t } = useLanguage();

  const profileOptions = [
    { icon: User, label: "Personal Information", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: MapPin, label: "Addresses", color: "text-green-600", bg: "bg-green-100" },
    { icon: CreditCard, label: "Payment Methods", color: "text-purple-600", bg: "bg-purple-100" },
    { icon: Bell, label: "Notifications", color: "text-yellow-600", bg: "bg-yellow-100" },
    { icon: Settings, label: "Settings", color: "text-gray-600", bg: "bg-gray-100" },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="pb-20">
        {/* Header */}
        <div className="bg-white px-6 pt-16 pb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {t("profile")}
          </h1>
          <p className="text-slate-600">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <div className="px-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Alex Johnson</h3>
                  <p className="text-sm text-slate-600">alex.johnson@email.com</p>
                  <p className="text-sm text-slate-500">+1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Options */}
        <div className="px-6 space-y-3">
          {profileOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${option.bg} rounded-xl flex items-center justify-center mr-4`}>
                        <Icon className={`h-5 w-5 ${option.color}`} />
                      </div>
                      <span className="font-medium text-slate-800">
                        {option.label}
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="px-6 mt-8">
          <Button 
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 py-4 rounded-2xl font-semibold h-auto"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
