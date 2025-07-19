import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Trash2, Car } from "lucide-react";

export default function Bookings() {
  const { t } = useLanguage();

  const mockBookings = [
    {
      id: 1,
      service: "Moving",
      icon: Truck,
      iconColor: "text-primary",
      iconBg: "bg-blue-100",
      date: "Dec 20, 2023",
      status: "confirmed",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      service: "Disposal",
      icon: Trash2,
      iconColor: "text-secondary",
      iconBg: "bg-green-100",
      date: "Dec 18, 2023",
      status: "pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      service: "Transport",
      icon: Car,
      iconColor: "text-accent",
      iconBg: "bg-purple-100",
      date: "Dec 15, 2023",
      status: "completed",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
      <LanguageToggle />
      
      <div className="pb-20">
        {/* Header */}
        <div className="bg-white px-6 pt-16 pb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {t("bookings")}
          </h1>
          <p className="text-slate-600">Track your service requests</p>
        </div>

        {/* Bookings List */}
        <div className="px-6 space-y-4">
          {mockBookings.map((booking) => {
            const Icon = booking.icon;
            return (
              <Card key={booking.id} className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${booking.iconBg} rounded-xl flex items-center justify-center mr-4`}>
                        <Icon className={`h-6 w-6 ${booking.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {booking.service}
                        </p>
                        <p className="text-sm text-slate-600">{booking.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full capitalize ${booking.statusColor}`}>
                      {booking.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
