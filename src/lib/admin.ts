import { createClient } from '@supabase/supabase-js';

export const admin = createClient(
	import.meta.env.VITE_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_SERVICE_KEY
);
