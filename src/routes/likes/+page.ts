import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const { data, error } = await supabase
		.from('likes')
		.select(
			'activities(title, recruiting, start_at, end_at, id, status, short_details, details, activity_types("type", "type_kor"), images("url"), likes("id"))'
		)
		.match({ user_id: get(user)?.id })
		.order('created_at', { ascending: false });
	return { activities: error ? null : data?.map((el) => el.activities) };
}
