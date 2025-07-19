import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sofa, UtensilsCrossed, Bed, Bath, Monitor, Car, Plus } from "lucide-react";

interface Room {
  id: string;
  name: string;
  icon: any;
  iconColor: string;
  iconBg: string;
  selected: boolean;
  itemCount: number;
}

export default function MovingRooms() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [currentFloor, setCurrentFloor] = useState("ground");
  const [floors, setFloors] = useState(["ground", "first"]);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "living",
      name: t("living_room"),
      icon: Sofa,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      selected: false,
      itemCount: 0,
    },
    {
      id: "kitchen",
      name: t("kitchen"),
      icon: UtensilsCrossed,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      selected: false,
      itemCount: 0,
    },
    {
      id: "bedroom",
      name: t("bedroom"),
      icon: Bed,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      selected: false,
      itemCount: 0,
    },
    {
      id: "bathroom",
      name: t("bathroom"),
      icon: Bath,
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-100",
      selected: false,
      itemCount: 0,
    },
    {
      id: "office",
      name: t("office"),
      icon: Monitor,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      selected: false,
      itemCount: 0,
    },
    {
      id: "garage",
      name: t("garage"),
      icon: Car,
      iconColor: "text-gray-600",
      iconBg: "bg-gray-100",
      selected: false,
      itemCount: 0,
    },
  ]);

  const addFloor = () => {
    const newFloor = `floor${floors.length + 1}`;
    setFloors([...floors, newFloor]);
  };

  const selectRoom = (roomId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            selected: !room.selected,
            itemCount: !room.selected ? Math.floor(Math.random() * 10 + 1) : 0
          }
        : room
    ));
  };

  const getFloorName = (floor: string) => {
    switch (floor) {
      case "ground": return t("ground_floor");
      case "first": return t("first_floor");
      default: return `Floor ${floor.replace("floor", "")}`;
    }
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
              onClick={() => setLocation("/moving/options")}
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <h1 className="text-xl font-bold text-slate-800">
              {t("select_rooms")}
            </h1>
          </div>
          <p className="text-slate-600">{t("map_your_home")}</p>
        </div>

        {/* Floor Selector */}
        <div className="px-6 py-4 bg-lighter">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {floors.map((floor) => (
              <Button
                key={floor}
                variant={currentFloor === floor ? "default" : "outline"}
                size="sm"
                className={`text-sm font-medium whitespace-nowrap ${
                  currentFloor === floor
                    ? "bg-primary text-white"
                    : "bg-white text-slate-600 border-slate-200"
                }`}
                onClick={() => setCurrentFloor(floor)}
              >
                {getFloorName(floor)}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="text-sm font-medium whitespace-nowrap border-dashed"
              onClick={addFloor}
            >
              <Plus className="h-4 w-4 mr-1" />
              {t("add_floor")}
            </Button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {rooms.map((room) => {
              const Icon = room.icon;
              return (
                <Card
                  key={room.id}
                  className={`room-item transition-all cursor-pointer border-2 ${
                    room.selected 
                      ? "selected border-primary bg-blue-50" 
                      : "border-transparent hover:-translate-y-1"
                  }`}
                  onClick={() => selectRoom(room.id)}
                >
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 ${room.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className={`h-5 w-5 ${room.iconColor}`} />
                    </div>
                    <h3 className="font-medium text-slate-800 mb-1">
                      {room.name}
                    </h3>
                    <p className="text-xs text-slate-600 mb-2">
                      {t("tap_to_add")}
                    </p>
                    <div className="mt-2">
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          room.selected
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {room.itemCount} items
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          <Button 
            onClick={() => setLocation("/moving/locations")}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-all mt-6 h-auto"
          >
            {t("continue_locations")}
          </Button>
        </div>
      </div>
    </div>
  );
}
