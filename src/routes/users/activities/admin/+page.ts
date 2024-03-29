import { user } from '$lib/stores';
import { get } from 'svelte/store';
import { supabase } from '$lib/supabase';

const exceptedStatus = ['pending', 'denied', 'quit', 'granted', 'ejected'];

// 내가 등록하였고, 운영하는 활동들
const _getParticipatingActivities = async () => {
	const user_id = get(user)?.id;
	const { data, error } = await supabase
		.from('participants')
		.select('status, activities(id, title, status, confirmation, activity_types(type_kor))')
		.eq('user_id', user_id);

	console.log(data, error);

	if (error) return [];
	return data.filter((activity) => !exceptedStatus.some((status) => status === activity.status));
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const activityList = await _getParticipatingActivities();
	return { activityList };
}
