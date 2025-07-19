import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, HelpCircle, FileText, Star } from "lucide-react";

export default function Support() {
  const { t } = useLanguage();

  const supportOptions = [
    { icon: MessageCircle, label: "Live Chat", description: "Get instant help", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Phone, label: "Call Support", description: "24/7 phone support", color: "text-green-600", bg: "bg-green-100" },
    { icon: Mail, label: "Email Support", description: "Send us an email", color: "text-purple-600", bg: "bg-purple-100" },
    { icon: HelpCircle, label: "FAQ", description: "Frequently asked questions", color: "text-yellow-600", bg: "bg-yellow-100" },
    { icon: FileText, label: "Documentation", description: "User guides & tutorials", color: "text-indigo-600", bg: "bg-indigo-100" },
    { icon: Star, label: "Rate App", description: "Share your feedback", color: "text-pink-600", bg: "bg-pink-100" },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="pb-20">
        {/* Header */}
        <div className="bg-white px-6 pt-16 pb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {t("support")}
          </h1>
          <p className="text-slate-600">How can we help you today?</p>
        </div>

        {/* Quick Contact */}
        <div className="px-6 mb-6">
          <Card className="shadow-lg bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-slate-800 mb-2">Need Quick Help?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Our support team is available 24/7 to assist you
              </p>
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-xl">
                Start Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Options */}
        <div className="px-6 space-y-3">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${option.bg} rounded-xl flex items-center justify-center mr-4`}>
                      <Icon className={`h-6 w-6 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800 mb-1">
                        {option.label}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {option.description}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="px-6 mt-8">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-medium text-slate-800 mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Email:</span>
                  <span className="text-slate-800">support@localservices.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Phone:</span>
                  <span className="text-slate-800">+1 (800) 555-0123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Hours:</span>
                  <span className="text-slate-800">24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
