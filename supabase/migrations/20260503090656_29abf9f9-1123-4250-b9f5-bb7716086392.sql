
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Enums
CREATE TYPE public.donation_track AS ENUM ('financial', 'shoulders');
CREATE TYPE public.payment_method AS ENUM ('cash', 'transfer', 'check');
CREATE TYPE public.pickup_method AS ENUM ('headquarters', 'home');
CREATE TYPE public.donation_status AS ENUM ('pending', 'collected');

-- Donations
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  project_type TEXT NOT NULL DEFAULT 'Adha',
  track public.donation_track NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  amount NUMERIC(10,2),
  payment_method public.payment_method,
  pickup_required BOOLEAN NOT NULL DEFAULT false,
  pickup_method public.pickup_method,
  pickup_time TEXT,
  gps_location TEXT,
  status public.donation_status NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Anyone (anonymous) can insert
CREATE POLICY "Anyone can submit a donation"
  ON public.donations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read/update/delete
CREATE POLICY "Admins can view donations"
  ON public.donations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update donations"
  ON public.donations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete donations"
  ON public.donations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Public aggregate function (no PII)
CREATE OR REPLACE FUNCTION public.get_donation_total()
RETURNS TABLE (total_amount NUMERIC, donor_count BIGINT)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COALESCE(SUM(amount), 0) AS total_amount,
    COUNT(*) FILTER (WHERE track = 'financial') AS donor_count
  FROM public.donations
  WHERE track = 'financial';
$$;

GRANT EXECUTE ON FUNCTION public.get_donation_total() TO anon, authenticated;
