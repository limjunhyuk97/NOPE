import { supabase } from '$lib/supabase';

export async function load({ parent, params }) {
	await parent();
	console.log(params.id, params.application_id);
}
