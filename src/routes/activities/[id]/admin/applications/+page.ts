import { supabase } from '$lib/supabase';

export const _getParticipants = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('participants')
		.select('status, activity_answers(*, activity_forms(*))')
		.match({ activity_id });

	return error ? [] : data;
};

export const _getActivityName = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('title')
		.match({ id: activity_id })
		.single();

	return error ? '' : data;
};

export async function load({ parent, params }) {
	await parent();

	const activity_id = params.id;
	const participants = await _getParticipants(activity_id);
	const activity_name = await _getActivityName(activity_id);

	return { participants, activity_name };
}
