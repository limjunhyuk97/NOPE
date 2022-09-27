import { supabase } from '$lib/supabase';

const getActivity = async (id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('details, title, images("url")')
		.match({ id });
	return error ? null : data[0];
};

export const getComments = async (id: string) => {
	const { data, error } = await supabase
		.from('activity_comments')
		.select('id, created_at, contents,  users(name, id, images(url))')
		.match({ activity_id: id })
		.order('created_at', { ascending: false });
	return error ? null : data;
};

/** @type {import('./$types').PageLoad} */
export async function load(params: any) {
	await params.parent();
	const activity_id = params.params.id;
	const activity = await getActivity(activity_id);
	const comments = await getComments(activity_id);
	return { activity, comments, activity_id };
}
