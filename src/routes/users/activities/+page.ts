import { user } from '$lib/stores';
import { get } from 'svelte/store';
import { supabase } from '$lib/supabase';

const _getParticipatingActivities = async () => {
	const user_id = get(user)?.id;
	const { data, error } = await supabase
		.from('participants')
		.select('status, activities(id, title, status)')
		.eq('user_id', user_id);

	if (error) return null;
	return data.filter((activity) => activity.status !== 'pending');
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const activityList = await _getParticipatingActivities();
	return { activityList };
}
