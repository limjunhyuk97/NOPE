/** @type {import('./$types').LayoutLoad} */

import { user } from '$lib/stores';
import { supabase } from '$lib/supabase';
import { get } from 'svelte/store';

export interface ProfileTypes {
	id: string;
}

const getProfile = async (id) => {
	const { data, error } = await supabase.from('users').select('*').eq('id', id);

	if (error) {
		console.log(error);
	} else {
		return data;
	}
};

const setSubscribe = async () => {
	let data = {};
	await user.subscribe(async (user) => {
		if (user) {
			data = await getProfile(user.id);
		}
	});
	return data;
};

export async function load() {
	const data = await setSubscribe();
	console.log(data);
}
