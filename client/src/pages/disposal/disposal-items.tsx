import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sofa, Armchair, Bed, Tv, DoorOpen, BookOpen, Camera, Plus } from "lucide-react";

interface DisposalItem {
  id: string;
  name: string;
  icon: any;
  category: string;
  selected: boolean;
}

export default function DisposalItems() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [currentCategory, setCurrentCategory] = useState("furniture");
  const [disposalItems, setDisposalItems] = useState<DisposalItem[]>([
    { id: "sofa", name: t("sofa"), icon: Sofa, category: "furniture", selected: false },
    { id: "chair", name: t("chair"), icon: Armchair, category: "furniture", selected: false },
    { id: "bed", name: t("bed"), icon: Bed, category: "furniture", selected: false },
    { id: "table", name: t("table"), icon: Tv, category: "furniture", selected: false },
    { id: "wardrobe", name: t("wardrobe"), icon: DoorOpen, category: "furniture", selected: false },
    { id: "bookshelf", name: t("bookshelf"), icon: BookOpen, category: "furniture", selected: false },
  ]);

  const categories = [
    { id: "furniture", label: t("furniture") },
    { id: "appliances", label: t("appliances") },
    { id: "electronics", label: t("electronics") },
    { id: "general", label: t("general") },
  ];

  const selectDisposalItem = (itemId: string) => {
    setDisposalItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const filteredItems = disposalItems.filter(item => item.category === currentCategory);

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
              {t("disposal_items")}
            </h1>
          </div>
          <p className="text-slate-600">{t("select_items")}</p>
        </div>

        <div className="p-6">
          {/* Categories */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={currentCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`text-sm font-medium whitespace-nowrap ${
                  currentCategory === category.id
                    ? "bg-secondary text-white"
                    : "bg-white text-slate-600 border-slate-200"
                }`}
                onClick={() => setCurrentCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className={`disposal-item transition-all cursor-pointer text-center border-2 ${
                    item.selected 
                      ? "selected border-secondary bg-green-50" 
                      : "border-transparent hover:scale-105"
                  }`}
                  onClick={() => selectDisposalItem(item.id)}
                >
                  <CardContent className="p-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <p className="text-xs font-medium text-slate-800">
                      {item.name}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Photo Upload Section */}
          <Card className="bg-lighter mb-6">
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 mb-3">
                {t("add_photos")}
              </h3>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
                <Camera className="h-8 w-8 text-slate-400 mb-3 mx-auto" />
                <p className="text-slate-600 mb-2">{t("take_photo")}</p>
                <p className="text-xs text-slate-500 mb-3">{t("photo_help")}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 hover:border-slate-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("add_photo")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            onClick={() => setLocation("/disposal/schedule")}
            className="w-full bg-secondary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-secondary/90 transition-all h-auto"
          >
            {t("continue_schedule")}
          </Button>
        </div>
      </div>
    </div>
  );
}
