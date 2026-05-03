
# ضْحِيِّتْنَا — Adha Donation Platform

Replace the placeholder Index page with a full RTL Arabic donation site for جمعية الكلمة الطيبة, backed by Lovable Cloud.

## 1. Branding & Layout
- RTL Arabic throughout (Tajawal / Cairo font).
- Color palette: Adha greens + warm gold (matching the charity logo).
- Charity logo (uploaded `kalima.jpg`) placed in header and footer.
- Mobile-first, responsive.

## 2. Landing Page (Hero)
Two-column hero (stacks on mobile):
- **Right half**: Title `ضْحِيِّتْنَا` with diacritics, persuasive line *"بمساهمتكم.. نفرحو عائلاتنا ونعظمو الشعيرة في صفاقس."*, two big CTA buttons (مساهمة مالية / صدقة الأكتاف).
- **Left half**: Image area (user will provide; placeholder image until then).
- Below hero: dynamic progress bar showing collected / 30,000 TND with percentage and donor count, pulled live from the database.

## 3. Donation Flow (multi-step modal/page)

**Step 1 — Choose track:**
- Option A: مساهمة مالية
- Option B: صدقة الأكتاف (يوم العيد)

**Option A — Financial:**
- Share selector: 50 د / 100 د / مبلغ حر (custom amount input).
- Payment method: Cash / Bank Transfer / Check (instructions shown for each — IBAN / pickup address).
- Donor info: name, phone (validated with zod).

**Option B — Shoulders charity:**
- Question: كيف ستصلنا الصدقة؟
  - "سآتي للمقر" → show address: ساقية الدائر, hours 10:00 → المغرب.
  - "جيو خوذوها مني" → form with: full name*, phone*, pickup time (13:00–18:00 picker), Google Maps GPS link* (validated as URL). Note: "متوفر فقط في نطاق 15 كم من ساقية الدائر".

**Step 4 — Success page (Tunisian Arabic):**
> بارك الله في رزقك.. مساهمتك في (ضْحِيِّتْنَا) وصلت لجمعية الكلمة الطيبة. فريق المتطوعين سيتصل بك قريباً لتنسيق الاستلام (خاصة لصدقة الأكتاف). عيدكم مبروك مسبقاً!

## 4. Backend (Lovable Cloud)

`donations` table:
- id, created_at
- project_type (text, default 'Adha')
- track ('financial' | 'shoulders')
- full_name, phone
- amount (nullable, for financial)
- payment_method (cash/transfer/check, nullable)
- pickup_required (bool)
- pickup_method ('headquarters' | 'home', nullable)
- pickup_time (time, nullable)
- gps_location (text, nullable)
- status ('pending' | 'collected'), default 'pending'

RLS:
- Public INSERT allowed (anonymous donations).
- SELECT only for authenticated admins (via `user_roles` table + `has_role()` security-definer function, role enum `admin`).
- Public can read an aggregated total via a SECURITY DEFINER function `get_donation_total()` returning sum + count only (no PII).

## 5. Admin Dashboard (`/admin`)
- Email/password login (Lovable Cloud auth).
- Only users with `admin` role can view.
- Table of all donations with filters (track, status), totals card, export to CSV.
- Mark donation as "collected".
- First admin: created manually by inserting into `user_roles` after the user signs up (instructions shown).

## 6. Routes
- `/` — landing + donation flow
- `/success` — confirmation message
- `/admin` — login + dashboard
- `*` — NotFound

## Technical notes
- Stack: existing React + Vite + Tailwind + shadcn.
- Add Tajawal font, set `dir="rtl"` on `<html>`.
- Use zod for all form validation; phone regex for Tunisian numbers (8 digits, optional +216).
- Progress bar uses Supabase Realtime subscription on `donations` (or polling every 30s) so it updates live.
- Logo copied to `src/assets/logo-kalima.jpg`.
