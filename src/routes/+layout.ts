import { user } from '$lib/stores';
import { supabase } from '$lib/supabase';

// 유저 데이터 저장(로그인 여부)
const setUserData = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (data) {
		user.set(error ? null : data.user);
	}
};

// 활동 타입 데이터 받아오기
const getActivityTypes = async () => {
	const { data, error } = await supabase.from('activity_types').select('*');
	return error ? null : data;
};

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	await setUserData();
	const activityTypes = await getActivityTypes();
	return { activityTypes };
}
