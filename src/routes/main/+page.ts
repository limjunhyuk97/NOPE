import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

const getActivities = async () => {
	const { data, error } = await supabase
		.from('activities')
		.select(
			'title, recruiting, start_at, end_at, id, status, short_details, details, activity_types("type", "type_kor"), images("url"), likes("id")'
		)
		.order('created_at', { ascending: false });
	return error ? [] : data;
};

const getLikes = async () => {
	const { data, error } = await supabase
		.from('likes')
		.select('activity_id')
		.match({ user_id: get(user)?.id });
	return error ? [] : data;
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const activities = await getActivities();
	const likes = get(user) ? await getLikes() : [];
	return { activities, likes };
}
