import { user } from '$lib/stores';
import { supabase } from '$lib/supabase';
import { get } from 'svelte/store';

// Activity_Types Type
export interface ActivityTypes {
	id: string;
	type: string;
	type_kor: string;
}

const setUserData = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (data) {
		user.set(data.user);
	}
	return error ? null : data;
};

const getActivityTypes = async () => {
	const { data, error } = await supabase.from('activities_type').select('*');
	return error ? null : data;
};

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	const user = await setUserData();
	const activityTypes = await getActivityTypes();
	return { activityTypes: activityTypes };
}
