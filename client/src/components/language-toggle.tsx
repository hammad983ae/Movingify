import { useLanguage, type Language } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
    { code: "fr", label: "FR" },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-full shadow-lg px-3 py-2 flex gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "ghost"}
            size="sm"
            className={`text-xs font-medium px-2 py-1 rounded-full h-auto ${
              language === lang.code
                ? "bg-primary text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
