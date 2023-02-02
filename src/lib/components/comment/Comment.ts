import { supabase } from '$lib/supabase';

export const handleDelete = async ({ comment_id }: { comment_id: string }) => {
	const { data, error } = await supabase.from('comments').delete().eq('id', comment_id);
	return error ? false : true;
};
