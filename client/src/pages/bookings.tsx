import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Trash2, Car, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import type { Booking } from "@shared/schema";

export default function Bookings() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "moving": return { icon: Truck, color: "text-primary", bg: "bg-blue-100" };
      case "disposal": return { icon: Trash2, color: "text-secondary", bg: "bg-green-100" };
      case "transport": return { icon: Car, color: "text-accent", bg: "bg-purple-100" };
      default: return { icon: Truck, color: "text-slate-600", bg: "bg-slate-100" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Date not set";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">No bookings yet</h3>
              <p className="text-slate-600 text-sm">Your service requests will appear here</p>
            </div>
          ) : (
            bookings.map((booking: Booking) => {
              const serviceConfig = getServiceIcon(booking.serviceType);
              const Icon = serviceConfig.icon;
              return (
                <Card key={booking.id} className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 ${serviceConfig.bg} rounded-xl flex items-center justify-center mr-4`}>
                          <Icon className={`h-6 w-6 ${serviceConfig.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 capitalize">
                            {booking.serviceType}
                          </p>
                          <p className="text-sm text-slate-600">
                            {formatDate(booking.scheduledDate)}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
