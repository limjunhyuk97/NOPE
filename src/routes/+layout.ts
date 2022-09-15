import { supabase } from '$lib/supabase';

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	const ActivityTypes = await supabase.from('activities_type').select('*');
	const User = await supabase.auth.getUser();
	return { activityTypes: ActivityTypes.data, user: User.data };
}
