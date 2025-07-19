import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ServiceCard } from "@/components/service-card";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Trash2, Car, Fan, Leaf } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const services = [
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: t("moving"),
      description: t("moving_desc"),
      onClick: () => setLocation("/moving/options"),
      iconBg: "bg-blue-100",
    },
    {
      icon: <Trash2 className="h-6 w-6 text-secondary" />,
      title: t("disposal"),
      description: t("disposal_desc"),
      onClick: () => setLocation("/disposal/items"),
      iconBg: "bg-green-100",
    },
    {
      icon: <Car className="h-6 w-6 text-accent" />,
      title: t("transport"),
      description: t("transport_desc"),
      onClick: () => setLocation("/transport/locations"),
      iconBg: "bg-purple-100",
    },
    {
      icon: <Fan className="h-6 w-6 text-yellow-600" />,
      title: t("cleaning"),
      description: t("cleaning_desc"),
      onClick: () => {},
      iconBg: "bg-yellow-100",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="pb-20">
        {/* Header */}
        <div className="bg-white px-6 pt-16 pb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {t("hello_user")}
          </h1>
          <p className="text-slate-600">{t("what_service")}</p>
        </div>

        {/* Services Grid */}
        <div className="px-6">
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={
                  <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center`}>
                    {service.icon}
                  </div>
                }
                title={service.title}
                description={service.description}
                onClick={service.onClick}
              />
            ))}

            {/* Gardening Service - Full Width */}
            <Card 
              className="col-span-2 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
              onClick={() => {}}
            >
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {t("gardening")}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {t("gardening_desc")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="px-6 mt-8">
          <h2 className="font-semibold text-slate-800 mb-4">
            {t("recent_bookings")}
          </h2>
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <Fan className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {t("home_cleaning")}
                    </p>
                    <p className="text-sm text-slate-600">Dec 15, 2023</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {t("completed")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
