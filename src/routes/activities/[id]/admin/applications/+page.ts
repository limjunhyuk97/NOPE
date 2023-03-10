import { supabase } from '$lib/supabase';

export const _getParticipants = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('participants')
		.select('status, id, users(name, images(storage_id))')
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

export const _changeParticipantStatus = async (participant_id: string, status: string) => {
	const { error } = await supabase.from('participants').update({ status }).eq('id', participant_id);

	return error;
};

export async function load({ parent, params }) {
	await parent();

	const activity_id = params.id;
	const participants = await _getParticipants(activity_id);
	const activity_name = await _getActivityName(activity_id);

	return { participants, activity_name, activity_id };
}
