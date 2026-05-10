import { useEffect, useState } from "react";
import { AlertTriangle, Copy, MoreVertical, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const detectInAppBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /(FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|Twitter|TikTok|MicroMessenger|MiuiBrowser|Snapchat|Pinterest|LinkedInApp)/i.test(ua);
};

export const InAppBrowserBanner = () => {
  const [isInApp, setIsInApp] = useState(false);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const dismiss = sessionStorage.getItem("inapp_banner_dismissed") === "1";
    setDismissed(dismiss);
    setIsInApp(detectInAppBrowser());
  }, []);

  if (!isInApp || dismissed) return null;

  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("تم نسخ الرابط");
    } catch {
      toast.error("ما نجمناش ننسخو الرابط");
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem("inapp_banner_dismissed", "1");
    setDismissed(true);
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-secondary text-secondary-foreground shadow-soft" dir="rtl">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm flex-1 font-medium">
            للحصول على دقة أفضل في تحديد الموقع، يُرجى فتح هذا الرابط في متصفحك (Chrome / Safari).
          </p>
          <Button
            size="sm"
            variant="outline"
            className="bg-background text-foreground border-background/40 shrink-0"
            onClick={() => setOpen(true)}
          >
            كيف؟
          </Button>
          <button
            onClick={handleDismiss}
            aria-label="إغلاق"
            className="shrink-0 rounded-full p-1 hover:bg-secondary-foreground/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent dir="rtl" className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-arabic-display text-primary">
              افتح الرابط في المتصفح
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              لكي تستعمل خاصية تحديد الموقع بدقة، يرجى فتح الصفحة في متصفح الهاتف.
            </p>

            <ol className="space-y-3">
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">1</span>
                <div className="flex-1">
                  <p className="font-bold mb-1">اضغط على الثلاث نقاط</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                    <span>في أعلى الشاشة (يمين أو يسار)</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">2</span>
                <div className="flex-1">
                  <p className="font-bold mb-1">اختر "Open in Browser"</p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ExternalLink className="h-4 w-4" />
                    <span>أو "فتح في المتصفح" / "Chrome" / "Safari"</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">3</span>
                <div className="flex-1">
                  <p className="font-bold mb-1">أو انسخ الرابط والصقه في المتصفح</p>
                  <Button size="sm" variant="outline" onClick={copyLink} className="gap-2 mt-1">
                    <Copy className="h-3.5 w-3.5" />
                    نسخ الرابط
                  </Button>
                </div>
              </li>
            </ol>

            <Button onClick={() => setOpen(false)} className="w-full">
              فهمت
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
