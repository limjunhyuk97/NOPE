import { supabase } from '$lib/supabase';

const _getQueires = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activity_forms')
		.select('*')
		.eq('activity_id', activity_id);
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

export async function load({ parent, params }) {
	await parent();
	const activity_id = params.id;
	const queries = await _getQueires(activity_id);
	const title = await _getActivityName(activity_id);
	return { queries, title };
}
