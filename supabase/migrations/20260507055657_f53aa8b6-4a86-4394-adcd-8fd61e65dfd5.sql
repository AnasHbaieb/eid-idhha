DROP FUNCTION public.get_donation_total();
CREATE FUNCTION public.get_donation_total()
 RETURNS TABLE(total_amount numeric, donor_count bigint, shoulders_count bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    COALESCE(SUM(amount) FILTER (WHERE track = 'financial'), 0) AS total_amount,
    COUNT(*) FILTER (WHERE track = 'financial') AS donor_count,
    COUNT(*) FILTER (WHERE track = 'shoulders') AS shoulders_count
  FROM public.donations;
$function$;