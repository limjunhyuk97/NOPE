import { supabase } from '$lib/supabase';

export const checkDuplication = async ({ input, column }: { input: string; column: string }) => {
	const { data, error } = await supabase.from('users').select('status').eq(column, input);

	if (error) {
		console.log(error);
		return null;
	}

	return data.length > 0 ? false : true;
};
