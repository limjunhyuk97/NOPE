import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

const getLikes = async () => {
	const { data, error } = await supabase
		.from('activity_likes')
		.select('activity_id, activities(*, images(url))')
		.match({ user_id: get(user)?.id });
	return error ? [] : data;
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const likes = get(user) ? await getLikes() : [];
	return { likes };
}
