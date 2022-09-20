import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const { data, error } = await supabase
		.from('likes')
		.select(
			'activities(title, recruiting, start_at, end_at, id, status, short_details, details, activities_type("type", "type_kor"), activities_info_images(images("url")), likes("id"))'
		)
		.order('created_at', { ascending: false });
	return { activities: error ? null : data?.map((el) => el.activities) };
}
