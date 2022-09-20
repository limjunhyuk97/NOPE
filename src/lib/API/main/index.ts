import { supabase } from '$lib/supabase';
import { toast } from '$lib/stores';
import { get } from 'svelte/store';

export const postLike = async (user_id: string, activity_id: string) => {
	const { error } = await supabase.from('likes').insert({ user_id, activity_id });
	if (!error) return true;
	else false;
};

export const postDisLike = async (user_id: string, activity_id: string) => {
	const { error } = await supabase.from('likes').delete().match({ user_id, activity_id });
	if (!error) return true;
	else return false;
};
