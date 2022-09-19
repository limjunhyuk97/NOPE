import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const { data } = await supabase
		.from('activities')
		.select(
			'title, recruiting, start_at, end_at, id, status, short_details, details, activities_type("type", "type_kor"), activities_info_images(images("url"))'
		)
		.order('created_at', { ascending: false });
	return { activities: data };
}
