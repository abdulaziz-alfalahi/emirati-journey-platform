import * as React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from 'react-i18next';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation('common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-background">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('toggleLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border">
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={`cursor-pointer flex items-center gap-2 ${language === 'en' ? 'bg-accent' : ''}`}
        >
          <span className="text-base">🇺🇸</span>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("ar")}
          className={`cursor-pointer flex items-center gap-2 ${language === 'ar' ? 'bg-accent' : ''}`}
        >
          <span className="text-base">🇦🇪</span>
          <span>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}