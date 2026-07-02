
-- 1) Split profiles into public and private views to protect phone/birth_date
-- Restrict SELECT on the base table to owner only, then expose non-sensitive fields via a view

DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Public directory view (no sensitive fields)
CREATE OR REPLACE VIEW public.profiles_public
WITH (security_invoker = true) AS
SELECT id, first_name, last_name, avatar_url, bio, city, created_at, updated_at
FROM public.profiles;

GRANT SELECT ON public.profiles_public TO authenticated, anon;

-- 2) Prevent privilege escalation on user_roles
-- Ensure no self-insert of admin role: trigger that blocks role inserts/updates unless performed by an admin or by service_role/postgres

CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow service_role and postgres to do anything (used by triggers/edge functions)
  IF current_setting('request.jwt.claims', true) IS NULL THEN
    RETURN NEW;
  END IF;

  -- Allow existing admins
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  -- Otherwise block any insert/update on user_roles from regular authenticated users
  RAISE EXCEPTION 'Not authorized to modify user roles';
END;
$$;

DROP TRIGGER IF EXISTS enforce_role_assignment ON public.user_roles;
CREATE TRIGGER enforce_role_assignment
BEFORE INSERT OR UPDATE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.prevent_role_escalation();

-- 3) Revoke EXECUTE on internal SECURITY DEFINER functions from authenticated/anon/public
-- These are trigger functions and should never be callable directly
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prevent_role_escalation() FROM PUBLIC, anon, authenticated;
