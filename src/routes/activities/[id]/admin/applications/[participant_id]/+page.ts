import { supabase } from '$lib/supabase';

export const _getUser = async (participant_id: string) => {
	const { data, error } = await supabase
		.from('participants')
		.select('status, users(images(storage_id), name, descriptions, user_stacks(stacks(*)))')
		.match({ id: participant_id })
		.single();

	return error ? null : data;
};

export const _getResume = async (participant_id: string) => {
	const { data, error } = await supabase
		.from('activity_answers')
		.select('answer, activity_forms(question)')
		.match({ participant_id });

	return error ? [] : data;
};

export const _changeParticipantStatus = async (participant_id: string, status: string) => {
	const { error } = await supabase.from('participants').update({ status }).eq('id', participant_id);

	return error;
};

export async function load({ parent, params }) {
	await parent();

	const { participant_id } = { ...params };

	const participantData = await _getUser(participant_id);
	const resumeData = await _getResume(participant_id);

	return { participantData, resumeData, participant_id };
}
