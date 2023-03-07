import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

const getAnswers = async () => {
	const { data, error } = await supabase
		.from('participants')
		.select(
			'*, activities(title, activity_types(type_kor)), activity_answers(*, activity_forms(*))'
		)
		.eq('user_id', get(user)?.id)
		.neq('status', 'super');
	return error ? [] : data;
};

export async function load({ parent }) {
	await parent();
	const answers = await getAnswers();

	return { answers };
}
