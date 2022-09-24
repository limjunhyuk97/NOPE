import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

const getActivity = async (id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('details, title, images("url")')
		.match({ id });
	return error ? null : data[0];
};

// 로그인 안 한 경우 -> null
// 로그인 + 지원 안한 경우 -> none
// 로그인 + 지원 완료 후 대기 -> pending
// 로그인 + 지원 완료 -> participant
// 로그인 + 관리자 -> admin
export const getParticipantAuth = async (user_id: string, activity_id: string) => {
	const { data, error } = await supabase
		.from('participants')
		.select('authority, status')
		.match({ activity_id, user_id });

	return error
		? null
		: data.length
		? data[0].status === 'pending'
			? 'pending'
			: data[0].authority
		: 'none';
};

export const getComments = async (id: string) => {
	const { data, error } = await supabase
		.from('activities_comments')
		.select('id, created_at, contents, users(name, id, images(url))')
		.match({ activity_id: id })
		.order('created_at', { ascending: false });
	return error ? null : data;
};

/** @type {import('./$types').PageLoad} */
export async function load(params: any) {
	await params.parent();
	const user_id = get(user)?.id;
	const activity_id = params.params.id;
	const activity = await getActivity(activity_id);
	const comments = await getComments(activity_id);
	const authority = user_id ? await getParticipantAuth(user_id, activity_id) : null;
	return { activity, comments, activity_id, authority };
}
