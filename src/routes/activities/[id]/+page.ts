import type { ActivityCard } from '$lib/types/activities';
import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';
import { USER_STATUS } from '$lib/constants';
import axios from 'axios';

const getActivityData = async (id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select(
			'*, comments(users(name), contents, created_at), activity_types("type", "type_kor"), images("url")'
		)
		.match({ id });
	return error ? [] : data;
};

const getUserStatus = async (userID: string | undefined, activityID: string | null) => {
	try {
		const status = await axios({
			method: 'post',
			url: `/activities/${activityID}`,
			data: { userID, activityID }
		});
		return status;
	} catch (err) {
		return USER_STATUS.LOGOUT;
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	await parent();
	const activityData = await getActivityData(params.id);
	const userStatus = await getUserStatus(get(user)?.id, activityData[0]?.id);
	return { activityData, userStatus: userStatus.data };
}
