import { supabase } from '$lib/supabase';
import { user } from '$lib/stores';
import { get } from 'svelte/store';

// 로그인 안 한 경우 -> null
// 로그인 + 지원 안한 경우 -> none
// 로그인 + 지원 완료 후 대기 -> pending
// 로그인 + 지원 완료 -> participant
// 로그인 + 관리자 -> admin
const getActivityData = async (id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('*, activity_types("type", "type_kor"), images("url")')
		.match({ id });
	return error ? [] : data;
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	const inherit = await parent();
	const userID = get(user);
	const activityData = await getActivityData(params.id);
	return { ...inherit };
}
