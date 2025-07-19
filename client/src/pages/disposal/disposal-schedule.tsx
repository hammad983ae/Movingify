import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function DisposalSchedule() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    address: "",
    date: "",
    time: "",
    fullName: "",
    phone: "",
    instructions: ""
  });

  const createBooking = useMutation({
    mutationFn: async (bookingData: any) => {
      return await apiRequest("/api/bookings", "POST", bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      setLocation("/disposal/success");
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
    if (!formData.address || !formData.date || !formData.time || !formData.fullName || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const scheduledDate = new Date(`${formData.date}T${formData.time}`);
    
    const bookingData = {
      serviceType: "disposal",
      status: "pending",
      data: {
        items: ["sofa", "chair", "table"], // This would come from previous step
        photos: [],
        instructions: formData.instructions
      },
      contactInfo: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address
      },
      scheduledDate: scheduledDate.toISOString()
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
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
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
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="p-4 rounded-2xl border-slate-200 focus:border-secondary"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-800 mb-2">
                {t("time")}
              </Label>
              <Input 
                type="time" 
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
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
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
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
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
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
            onClick={handleSubmit}
            disabled={createBooking.isPending}
            className="w-full bg-secondary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-secondary/90 transition-all h-auto"
          >
            {createBooking.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating booking...
              </>
            ) : (
              t("book_disposal")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
