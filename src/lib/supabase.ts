import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	import.meta.env.VITE_PUBLIC_SUPABASE_URL,
	import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

export const supabaseWithToken = (bearer: string) => {
	const options = {
		global: {
			headers: { Authorization: `Bearer ${bearer}` }
		}
	};

	return createClient(
		import.meta.env.VITE_PUBLIC_SUPABASE_URL,
		import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
		options
	);
};
