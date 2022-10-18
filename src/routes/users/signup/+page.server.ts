import type { Actions } from './$types';
import { admin } from '$lib/admin';
import { invalid } from '@sveltejs/kit';

const verifyInput = (email: string, password: string, passwordcheck: string, name: string) => {
	return true;
};

export const actions: Actions = {
	default: async ({ request }): Promise<any> => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const passwordcheck = data.get('passwordcheck');
		const name = data.get('name');

		if (verifyInput(email, password, passwordcheck, name)) {
			return { success: true };
		} else {
			return invalid(400, { message: 'fuck you' });
		}
	}
};
