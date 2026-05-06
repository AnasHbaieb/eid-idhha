import { z } from "zod";

const phoneRegex = /^(\+?216)?\s?[2459]\d{7}$/;

const baseFields = {
  full_name: z.string().trim().min(2, "الاسم قصير برشة").max(100, "الاسم طويل برشة"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "رقم الهاتف موش صحيح (8 أرقام)"),
};

export const financialSchema = z.object({
  ...baseFields,
  amount: z
    .number({ invalid_type_error: "أدخل مبلغ" })
    .min(1, "المبلغ لازم يكون أكثر من 0")
    .max(100000, "مبلغ كبير برشة"),
  payment_method: z.enum(["cash", "transfer", "check"], {
    errorMap: () => ({ message: "اختار طريقة الدفع" }),
  }),
});

export const headquartersSchema = z.object({
  ...baseFields,
});

export const homePickupSchema = z.object({
  ...baseFields,
<<<<<<< HEAD
=======
  pickup_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "وقت موش صحيح")
    .refine((v) => {
      const [h] = v.split(":").map(Number);
      return h >= 13 && h < 18;
    }, "الوقت بين 13:00 و 18:00"),
>>>>>>> 63344bc8c7d6ad89d45ed80dbce533a5b35a3f62
  gps_location: z
    .string()
    .trim()
    .url("لازم يكون رابط Google Maps صحيح")
    .max(500, "الرابط طويل برشة"),
});

export type FinancialForm = z.infer<typeof financialSchema>;
export type HeadquartersForm = z.infer<typeof headquartersSchema>;
export type HomePickupForm = z.infer<typeof homePickupSchema>;
