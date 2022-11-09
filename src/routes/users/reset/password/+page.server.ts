import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import { admin } from '$lib/admin';
import { MAINPAGE_URL } from '$lib/constants';

//** form actions */
export const actions: Actions = {
	default: async ({ request }): Promise<any> => {
		const formData = await request.formData();
		const email = formData.get('email');

		// email 존재 여부 확인
		const { data, error } = await admin.from('users').select('*').match({ email });

		if (error) {
			return invalid(500, { message: '네트워크 오류' });
		} else {
			if (data?.length > 0) {
				return await resetPassword(email);
			} else {
				return invalid(400, { message: '존재하지 않는 아이디입니다' });
			}
		}
	}
};
