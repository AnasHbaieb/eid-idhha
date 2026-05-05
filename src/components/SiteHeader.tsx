import { Link } from "react-router-dom";
import logo from "@/assets/logo-kalima.jpg";

export const SiteHeader = () => {
  return (
    <header className="w-full bg-background/70 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="شعار جمعية الكلمة الطيبة"
            className="h-14 w-14 rounded-full object-cover"
          />
          <span className="text-lg sm:text-2xl font-bold text-primary">
            الجمعية الخيرية الكلمة الطيبة
          </span>
        </Link>
        <Link
          to="/admin"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          دخول الإدارة
        </Link>
      </div>
    </header>
  );
};
