import { supabase } from '$lib/supabase';
import { SIGNIN_STATUS } from '$lib/constants';

export const _signin = async ({ email, password }: { email: string; password: string }) => {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) return SIGNIN_STATUS.FAIL;
	else return SIGNIN_STATUS.SUCCESS;
};
