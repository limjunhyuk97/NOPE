import { user } from '$lib/stores';
import { get } from 'svelte/store';
import { supabase } from '$lib/supabase';

const getActivityData = async (id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('*, activity_forms(*), activity_types("type", "type_kor"), images("storage_id")')
		.match({ id });
	return error ? [] : data[0];
};

const getUserStatus = async ({
	user_id,
	activity_id
}: {
	user_id: string | undefined;
	activity_id: string;
}) => {
	if (!user_id) return 'logout';

	const { data, error } = await supabase
		.from('participants')
		.select('status')
		.match({ user_id, activity_id })
		.single();

	return error ? 'error' : data.status;
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	await parent();
	const activityData = await getActivityData(params.id);
	const userStatus = await getUserStatus({ user_id: get(user)?.id, activity_id: activityData.id });
	return { activityData, userStatus };
}
