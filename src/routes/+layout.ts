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
	if (error) {
		console.log(error);
	} else {
		user.set(data.user);
	}
};

const getActivityTypes = async () => {
	const { data, error } = await supabase.from('activities_type').select('*');
	if (error) {
		console.log(error);
	} else {
		return data;
	}
};

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	await setUserData();
	const activityTypes = await getActivityTypes();
	return { activityTypes: activityTypes };
}
