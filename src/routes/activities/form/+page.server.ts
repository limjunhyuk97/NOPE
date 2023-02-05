import type { Actions } from './$types';
import { admin } from '$lib/admin';
import { fail } from '@sveltejs/kit';

//** form actions */
export const actions: Actions = {
	default: async ({ request }): Promise<any> => {
		const data = await request.formData();
		const activity_thumbnail = data.get('activity_thumbnail');
		const activity_type = data.get('activity_type');
		const activity_name = data.get('activity_name');
		const start_at = data.get('start_at');
		const end_at = data.get('end_at');
		console.log(data);
		console.log(activity_thumbnail, activity_type, activity_name, start_at, end_at);
	}
};
