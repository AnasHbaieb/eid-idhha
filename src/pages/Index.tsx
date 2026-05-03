import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProgressTracker } from "@/components/ProgressTracker";
import { DonationDialog } from "@/components/DonationDialog";
import { Button } from "@/components/ui/button";
import { Coins, HandHeart, MapPin, Clock, Phone } from "lucide-react";
import heroImage from "@/assets/hero-sheep.jpg";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [initialTrack, setInitialTrack] = useState<"financial" | "shoulders" | null>(null);

  const openWith = (track: "financial" | "shoulders") => {
    setInitialTrack(track);
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Right (text) - first in RTL */}
            <div className="text-center lg:text-right space-y-6 order-1">
              <div className="inline-block bg-secondary/20 text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-bold">
                🌙 عيد الأضحى المبارك
              </div>
              <h1 className="font-arabic-display text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight">
                ضْحِيِّتْنَا
              </h1>
              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                بمساهمتكم.. نفرحو عائلاتنا ونعظمو الشعيرة في صفاقس.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Button
                  onClick={() => openWith("financial")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold py-6 px-8 shadow-soft"
                >
                  <Coins className="ml-2 h-5 w-5" />
                  مساهمة مالية
                </Button>
                <Button
                  onClick={() => openWith("shoulders")}
                  size="lg"
                  variant="outline"
                  className="border-2 border-secondary bg-secondary/10 hover:bg-secondary/20 text-foreground text-base font-bold py-6 px-8"
                >
                  <HandHeart className="ml-2 h-5 w-5" />
                  صدقة الأكتاف
                </Button>
              </div>
            </div>

            {/* Left (image) */}
            <div className="order-2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-soft ring-4 ring-secondary/30">
                <img
                  src={heroImage}
                  alt="رسم لخروف يرمز لعيد الأضحى"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="container mx-auto px-4 pb-12">
          <ProgressTracker />
        </section>

        {/* How it works */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-10">كيفاش تساهم؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Coins className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">مساهمة مالية</h3>
              <p className="text-muted-foreground mb-4">
                ساهم في شراء الأضاحي بسهم 50د، 100د أو مبلغ حر. هدفنا 30,000 د.ت.
              </p>
              <ul className="space-y-2 text-sm">
                <li>✓ كاش</li>
                <li>✓ تحويل بنكي</li>
                <li>✓ شيك</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="bg-secondary/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <HandHeart className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">صدقة الأكتاف</h3>
              <p className="text-muted-foreground mb-4">
                توزيع الأكتاف يوم العيد على العائلات المحتاجة في صفاقس.
              </p>
              <ul className="space-y-2 text-sm">
                <li>✓ تجي للمقر بساقية الدائر</li>
                <li>✓ نجيو نخوذوها (في 15 كم)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact info */}
        <section className="bg-primary/5 py-12 border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-primary mb-8">معلومات الاتصال</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-7 w-7 text-secondary" />
                <p className="font-bold">العنوان</p>
                <p className="text-sm text-muted-foreground">ساقية الدائر، صفاقس</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="h-7 w-7 text-secondary" />
                <p className="font-bold">يوم العيد</p>
                <p className="text-sm text-muted-foreground">من 10:00 إلى المغرب</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Phone className="h-7 w-7 text-secondary" />
                <p className="font-bold">الاستلام</p>
                <p className="text-sm text-muted-foreground">من 13:00 إلى 18:00</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <DonationDialog open={open} onOpenChange={setOpen} initialTrack={initialTrack} />
    </div>
  );
};

export default Index;
