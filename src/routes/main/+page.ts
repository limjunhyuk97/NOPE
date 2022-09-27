import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const { data } = await supabase
		.from('activities')
		.select(
			'title, recruiting, start_at, end_at, id, status, short_details, details, activity_types("type", "type_kor"), images("url"), likes("id")'
		)
		.order('created_at', { ascending: false });

	return { activities: data };
}
