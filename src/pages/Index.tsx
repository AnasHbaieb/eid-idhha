import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DonationDialog } from "@/components/DonationDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HandHeart, Coins } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-sheep.jpg";

const GOAL = 30000;

const Index = () => {
  const [open, setOpen] = useState(false);
  const [initialTrack, setInitialTrack] = useState<"financial" | "shoulders" | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTotal = async () => {
    const { data, error } = await supabase.rpc("get_donation_total");
    if (!error && data && data.length > 0) {
      setTotal(Number(data[0].total_amount) || 0);
    }
  };

  useEffect(() => {
    fetchTotal();
    const channel = supabase
      .channel("donations-progress")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "donations" },
        () => fetchTotal()
      )
      .subscribe();
    const interval = setInterval(fetchTotal, 30000);
    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const percentage = Math.min((total / GOAL) * 100, 100);

  const openWith = (track: "financial" | "shoulders") => {
    setInitialTrack(track);
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background hearts-bg">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image (left in LTR, appears left in RTL via order) */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-soft">
                <img
                  src={heroImage}
                  alt="ضحيتنا - عيد الأضحى"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Text (right) */}
            <div className="order-2 lg:order-1 text-right space-y-5">
              <h1 className="font-arabic-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                ضْحِيِّتْنَا
              </h1>
              <p className="text-lg text-secondary font-bold">
<<<<<<< HEAD
                "​قال رسول الله ﷺ: «أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ سُرُورٌ تُدْخِلُهُ عَلَى مُسْلِمٍ..» وعن الأضاحي أمرنا فقال: «أَطْعِمُوا»."
=======
                "بمساهمتكم.. نفرحو عائلاتنا ونعظمو الشعيرة في صفاقس"
>>>>>>> 63344bc8c7d6ad89d45ed80dbce533a5b35a3f62
              </p>
              <p className="text-base text-foreground/80 leading-relaxed">
                بفضل الله، ومع قرب عيد الأضحى المبارك، تطلق جمعية{" "}
                <span className="font-bold">الكلمة الطيبة</span> مشروع{" "}
                <span className="font-bold">"ضْحِيِّتْنَا"</span> لتوفير لحوم
                الأضاحي وتوزيعها على العائلات المحتاجة في صفاقس. هدفنا جمع{" "}
                <span className="font-bold">30.000 دينار</span> وتوزيع الأكتاف
                يوم العيد.
              </p>

              {/* Progress */}
              <div className="space-y-2 pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">المبلغ المجموع</span>
                  <span className="text-2xl font-bold text-secondary">
                    {total.toLocaleString("ar-TN")} دينار
                  </span>
                </div>
                <Progress value={percentage} className="h-3" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{percentage.toFixed(1)}% من الهدف</span>
                  <span>الهدف: {GOAL.toLocaleString("ar-TN")} دينار</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Button
                  onClick={() => openWith("financial")}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold py-6 shadow-soft"
                >
                  <Coins className="ml-2 h-5 w-5" />
                  ساهم في ضحيتنا الآن
                </Button>
                <Button
                  onClick={() => openWith("shoulders")}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-secondary bg-secondary/10 hover:bg-secondary/20 text-foreground text-base font-bold py-6"
                >
                  <HandHeart className="ml-2 h-5 w-5" />
                  صدقة الأكتاف
                </Button>
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
