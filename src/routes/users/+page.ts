/** @type {import('./$types').LayoutLoad} */

import { user } from '$lib/stores';
import { supabase } from '$lib/supabase';
import { get } from 'svelte/store';

export interface ProfileTypes {
	id: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const data = await supabase.from('users').select('*').eq('id', get(user)?.id);
	return data;
}
