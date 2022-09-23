import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

const getLikes = async () => {
	const { data, error } = await supabase
		.from('likes')
		.select(
			'activities(title, recruiting, start_at, end_at, id, status, short_details, details, activities_type("type", "type_kor"), images("url"))'
		)
		.match({ user_id: get(user)?.id });
	return error ? [] : data;
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const likes = get(user) ? await getLikes() : [];
	return { likes };
}
