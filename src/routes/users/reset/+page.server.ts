import type { Actions } from './$types';
import { MAINPAGE_URL } from '$lib/constants';
import { invalid } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import { admin } from '$lib/admin';

const resetPassword = async (email: string) => {
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${MAINPAGE_URL}/users/reset/password`
	});
	if (error) {
		return error.status === 429
			? invalid(429, { message: '60초 후에 재전송 가능합니다' })
			: invalid(500, { message: '네트워크 오류' });
	} else {
		return { success: true };
	}
};

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
