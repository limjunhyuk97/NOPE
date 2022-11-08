import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { admin } from '$lib/admin';

//** form actions */
export const actions: Actions = {
	default: async ({ request }): Promise<any> => {
		const formData = await request.formData();
		const previouspassword = formData.get('previouspassword');
		const newpassword = formData.get('newpassword');

		// email 존재 여부 확인
	}
};
