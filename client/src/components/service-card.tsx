import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function ServiceCard({ icon, title, description, onClick, className = "" }: ServiceCardProps) {
  return (
    <Card 
      className={`hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
