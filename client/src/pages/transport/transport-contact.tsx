import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function TransportContact() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: ""
  });

  const createBooking = useMutation({
    mutationFn: async (bookingData: any) => {
      return await apiRequest("/api/bookings", "POST", bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      setLocation("/transport/success");
    },
    onError: (error) => {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Failed",
        description: "Unable to create your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      serviceType: "transport",
      status: "pending",
      data: {
        pickupLocation: "Sample pickup location",
        dropoffLocation: "Sample dropoff location",
        transportType: "small_car",
        distance: "12.5 km",
        estimatedCost: "€25 - €35"
      },
      contactInfo: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email
      },
      scheduledDate: new Date().toISOString()
    };

    createBooking.mutate(bookingData);
  };

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
              onClick={() => setLocation("/transport/locations")}
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">
              {t("contact_info")}
            </h1>
          </div>
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
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="p-4 rounded-2xl border-slate-200 focus:border-accent"
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
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="p-4 rounded-2xl border-slate-200 focus:border-accent"
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
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="p-4 rounded-2xl border-slate-200 focus:border-accent"
            />
          </div>

          {/* Trip Summary */}
          <Card className="bg-lighter">
            <CardContent className="p-4">
              <h3 className="font-medium text-slate-800 mb-3">
                {t("trip_summary")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t("transport_type")}:</span>
                  <span className="text-slate-800">Small Car</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t("distance")}:</span>
                  <span className="text-slate-800">12.5 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t("estimated_cost")}:</span>
                  <span className="text-slate-800 font-semibold">€25 - €35</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={createBooking.isPending}
            className="w-full bg-accent text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-accent/90 transition-all h-auto"
          >
            {createBooking.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating booking...
              </>
            ) : (
              t("book_transport")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
