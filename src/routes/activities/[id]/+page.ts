import type { ActivityCard } from '$lib/types/activities';
import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';
import { USER_STATUS } from '$lib/constants';
import { getSignedUrl } from '$lib/utils';
import axios from 'axios';

const getActivityData = async (id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('*, activity_types("type", "type_kor"), images("storage_id")')
		.match({ id });
	return error ? [] : data[0];
};

export const _getCommentData = async (id: string) => {
	const { data, error } = await supabase
		.from('comments')
		.select(
			'id, users(name, id, descriptions, images("storage_id"), user_stacks(stacks("*"))), contents, created_at'
		)
		.eq('activity_id', id)
		.order('created_at');
	return error ? [] : data;
};

const getUserStatus = async (user_id: string | undefined, activity_id: string | null) => {
	try {
		const status = await axios({
			method: 'post',
			url: `/activities/${activity_id}`,
			data: { userID: user_id, activityID: activity_id }
		});
		return status.data;
	} catch (err) {
		return USER_STATUS.LOGOUT;
	}
};

export const _writeComment = async (user_id: string, activity_id: string, contents: string) => {
	const { error } = await supabase.from('comments').insert({ activity_id, user_id, contents });
	if (error) return false;
	return true;
};

const getUserLike = async (user_id: string | undefined, activity_id: string) => {
	if (!user_id) return false;
	const { data, error } = await supabase
		.from('activity_likes')
		.select('*')
		.match({ user_id, activity_id });
	if (error) return false;
	if (data.length === 0) return false;
	return true;
};

export const _likeActivity = async (user_id: string, activity_id: string) => {
	const { error } = await supabase.from('activity_likes').insert({ user_id, activity_id });
	if (!error) return true;
	else false;
};

export const _unlikeActivity = async (user_id: string, activity_id: string) => {
	const { error } = await supabase.from('activity_likes').delete().match({ user_id, activity_id });
	if (!error) return true;
	else return false;
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	await parent();
	const activityData: ActivityCard = await getActivityData(params.id);
	const userStatus = await getUserStatus(get(user)?.id, params.id);
	const activityImage = await getSignedUrl(activityData.images?.storage_id);
	const comments = await _getCommentData(params.id);
	const userLike = await getUserLike(get(user)?.id, params.id);

	return { activityData, userStatus: userStatus, activityImage, comments, userLike };
}
