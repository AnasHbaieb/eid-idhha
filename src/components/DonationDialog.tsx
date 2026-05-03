import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FinancialDonationForm } from "./FinancialDonationForm";
import { ShouldersDonationForm } from "./ShouldersDonationForm";
import { Coins, HandHeart } from "lucide-react";

type Track = "financial" | "shoulders" | null;

export const DonationDialog = ({
  open,
  onOpenChange,
  initialTrack,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialTrack?: Track;
}) => {
  const [track, setTrack] = useState<Track>(initialTrack ?? null);

  // reset when closed
  const handleOpenChange = (v: boolean) => {
    if (!v) setTrack(initialTrack ?? null);
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-arabic-display text-primary">
            ضْحِيِّتْنَا
          </DialogTitle>
        </DialogHeader>

        {!track && (
          <div className="space-y-4 py-2">
            <p className="text-center text-muted-foreground">اختار نوع المساهمة</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTrack("financial")}
                className="rounded-2xl border-2 border-border p-6 text-center hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Coins className="h-10 w-10 mx-auto mb-3 text-secondary" />
                <p className="font-bold text-lg mb-1">مساهمة مالية</p>
                <p className="text-sm text-muted-foreground">سهم بـ 50د / 100د / مبلغ حر</p>
              </button>
              <button
                onClick={() => setTrack("shoulders")}
                className="rounded-2xl border-2 border-border p-6 text-center hover:border-primary hover:bg-primary/5 transition-all"
              >
                <HandHeart className="h-10 w-10 mx-auto mb-3 text-primary" />
                <p className="font-bold text-lg mb-1">صدقة الأكتاف</p>
                <p className="text-sm text-muted-foreground">يوم العيد - تسليم أو استلام</p>
              </button>
            </div>
          </div>
        )}

        {track === "financial" && <FinancialDonationForm onBack={() => setTrack(null)} />}
        {track === "shoulders" && <ShouldersDonationForm onBack={() => setTrack(null)} />}
      </DialogContent>
    </Dialog>
  );
};
