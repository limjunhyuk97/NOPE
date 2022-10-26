import { supabase } from '../src/lib/supabase.js';

(async () => {
	const { data, error } = await supabase.from('users').select('*');
	console.log(data, error);
})();
