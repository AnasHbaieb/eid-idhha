import { Link } from "react-router-dom";
import logo from "@/assets/logo-kalima.jpg";

export const SiteHeader = () => {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="شعار جمعية الكلمة الطيبة" className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary/40" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold text-primary">جمعية الكلمة الطيبة</span>
            <span className="text-xs text-muted-foreground">صفاقس - ساقية الدائر</span>
          </div>
        </Link>
        <Link to="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          دخول الإدارة
        </Link>
      </div>
    </header>
  );
};
