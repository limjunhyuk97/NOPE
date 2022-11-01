import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import { admin } from '$lib/admin';

//** form actions */
export const actions: Actions = {
	default: async ({ request }): Promise<any> => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		console.log(data);

		if (error) {
			const { data, error } = await admin.from('users').select('*').match({ email });
			if (error) {
				return invalid(500, { message: '네트워크 오류' });
			} else {
				if (data?.length == 0) return invalid(400, { message: '존재하지 않는 아이디입니다' });
				else return invalid(400, { message: '비밀번호 오류' });
			}
		} else {
			return { success: true, email, password };
		}
	}
};
