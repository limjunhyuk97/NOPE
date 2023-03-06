import { user } from '$lib/stores';
import { get } from 'svelte/store';
import { supabase } from '$lib/supabase';

const exceptedStatus = ['pending', 'denied', 'quit'];

// 내가 참가하고 있는 허가된 활동들
const _getParticipatingActivities = async () => {
	const user_id = get(user)?.id;
	const { data, error } = await supabase
		.from('participants')
		.select('status, activities(id, title, status, confirmation, activity_types(type_kor))')
		.match({ user_id });

	if (error) return null;
	return data.filter(
		(activity) =>
			!exceptedStatus.some((status) => status === activity.status) &&
			activity.activities.confirmation === 'confirmed'
	);
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const activityList = await _getParticipatingActivities();
	return { activityList };
}
