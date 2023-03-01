import { supabase } from '$lib/supabase';
const getActivityData = async (id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('*, activity_types("type", "type_kor"), images("storage_id")')
		.match({ id });
	return error ? [] : data[0];
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	await parent();
	const activityData = await getActivityData(params.id);

	return { activityData };
}
