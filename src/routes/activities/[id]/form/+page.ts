import { supabase } from '$lib/supabase';

export const _isSuper = async (user_id: string, activity_id: string) => {
	const { data, error } = await supabase
		.from('participants')
		.select('status')
		.match({ user_id, activity_id });

	if (error) return false;
	if (data.length === 0) return false;
	if (data[0].status !== 'super') return false;
	return true;
};

const _getActivityData = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('*,images(storage_id)')
		.eq('id', activity_id)
		.single();

	return error ? null : data;
};

const _getQueryData = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activity_forms')
		.select('*')
		.eq('activity_id', activity_id);

	return error ? [] : data;
};

export async function load({ parent, params }) {
	await parent();

	const activity_id = params.id;
	const activity = await _getActivityData(activity_id);
	const queries = await _getQueryData(activity_id);

	return { activity, queries };
}
