import { supabase } from '$lib/supabase';
import { toast } from '$lib/stores';
import axios from 'axios';

const _getQueires = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activity_forms')
		.select('*')
		.match({ activity_id, is_valid: true });
	return error ? null : data;
};

const _getActivityName = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('title')
		.eq('id', activity_id)
		.single();
	return error ? null : data;
};

export const _createAnswer = async ({
	user_id,
	activity_id,
	answers
}: {
	activity_id: string;
	user_id: string;
	answers: { content: string; query_id: string; query: string }[];
}) => {
	try {
		const response = await axios({
			method: 'post',
			url: `/activities/${activity_id}/application`,
			data: { user_id, activity_id, answers }
		});
		return response.data;
	} catch (error) {
		console.log(error);
		toast.set(error.response.data.msg);
	}
};

export async function load({ parent, params }) {
	await parent();
	const activity_id = params.id;
	const queries = await _getQueires(activity_id);
	const title = await _getActivityName(activity_id);
	return { queries, title, activity_id };
}
