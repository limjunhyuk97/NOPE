import { supabase } from '$lib/supabase';

const _getAnswer = async (id: string) => {
	const { data, error } = await supabase
		.from('participants')
		.select('*, activities(title), activity_answers(answer, activity_forms(question))')
		.match({ id });

	return error ? null : data;
};

export async function load({ parent, params }) {
	await parent();

	const participant_id = params.id;
	const answer = await _getAnswer(participant_id);

	return { answer };
}
