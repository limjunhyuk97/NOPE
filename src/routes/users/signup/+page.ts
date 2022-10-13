import { supabase } from '$lib/supabase';
import { UNIFICATION_STATUS } from '$lib/constants';

export const checkDuplication = async (input: string, column: string) => {
	const { data, error } = await supabase.from('users').select('status').eq(column, input);

	if (error) {
		console.log(error);
		return null;
	}

	return data.length > 0 ? UNIFICATION_STATUS.DUPLICATED : UNIFICATION_STATUS.VERIFIED;
};
