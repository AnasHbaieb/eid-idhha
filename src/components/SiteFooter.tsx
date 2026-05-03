import logo from "@/assets/logo-kalima.jpg";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-muted/40 mt-16">
      <div className="container mx-auto py-8 flex flex-col items-center gap-3 text-center">
        <img src={logo} alt="شعار جمعية الكلمة الطيبة" className="h-16 w-16 rounded-full object-cover" />
        <p className="font-bold text-primary">جمعية الكلمة الطيبة الخيرية</p>
        <p className="text-sm text-muted-foreground">ساقية الدائر - صفاقس - تونس</p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
};
