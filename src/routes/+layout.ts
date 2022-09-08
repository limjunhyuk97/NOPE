import { supabase } from '$lib/supabase';

// Activity_Types Type
export interface ActivityTypes {
	id: string;
	type: string;
	type_kor: string;
}

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	const ActivityTypes = await supabase.from('activities_type').select('*');
	const User = await supabase.auth.getUser();
	return { activityTypes: ActivityTypes.data, user: User.data };
}
