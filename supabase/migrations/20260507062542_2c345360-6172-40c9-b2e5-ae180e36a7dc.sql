CREATE OR REPLACE FUNCTION public.get_donation_total()
 RETURNS TABLE(total_amount numeric, donor_count bigint, shoulders_count bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    COALESCE(SUM(amount) FILTER (WHERE track = 'financial' AND status = 'collected'), 0) AS total_amount,
    COUNT(*) FILTER (WHERE track = 'financial' AND status = 'collected') AS donor_count,
    COUNT(*) FILTER (WHERE track = 'shoulders' AND status = 'collected') AS shoulders_count
  FROM public.donations;
$function$;