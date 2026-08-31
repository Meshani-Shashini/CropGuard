-- Create is_admin function to avoid policy recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate policies on profiles table
DROP POLICY IF EXISTS "select_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "update_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "delete_own_profile" ON public.profiles;

CREATE POLICY "select_own_profile" ON public.profiles FOR SELECT
  TO authenticated USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "update_own_profile" ON public.profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "delete_own_profile" ON public.profiles FOR DELETE
  TO authenticated USING (auth.uid() = id OR public.is_admin());

-- Update other tables to use the is_admin function for clarity and performance
DROP POLICY IF EXISTS "insert_crops" ON public.crops;
DROP POLICY IF EXISTS "update_crops" ON public.crops;
DROP POLICY IF EXISTS "delete_crops" ON public.crops;

CREATE POLICY "insert_crops" ON public.crops FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "update_crops" ON public.crops FOR UPDATE
  TO authenticated USING (public.is_admin());

CREATE POLICY "delete_crops" ON public.crops FOR DELETE
  TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "insert_diseases" ON public.diseases;
DROP POLICY IF EXISTS "update_diseases" ON public.diseases;
DROP POLICY IF EXISTS "delete_diseases" ON public.diseases;

CREATE POLICY "insert_diseases" ON public.diseases FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "update_diseases" ON public.diseases FOR UPDATE
  TO authenticated USING (public.is_admin());

CREATE POLICY "delete_diseases" ON public.diseases FOR DELETE
  TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "insert_treatments" ON public.treatments;
DROP POLICY IF EXISTS "update_treatments" ON public.treatments;
DROP POLICY IF EXISTS "delete_treatments" ON public.treatments;

CREATE POLICY "insert_treatments" ON public.treatments FOR INSERT
  TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "update_treatments" ON public.treatments FOR UPDATE
  TO authenticated USING (public.is_admin());

CREATE POLICY "delete_treatments" ON public.treatments FOR DELETE
  TO authenticated USING (public.is_admin());
