import { supabase } from '$lib/supabase';

// 좋아요
export const handleLike = async (user_id: string, activity_id: string) => {
	const { error } = await supabase.from('activity_likes').insert({ user_id, activity_id });
	if (!error) return true;
	else false;
};

// 찜하기 취소
export const handleUnLike = async (user_id: string, activity_id: string) => {
	const { data, error } = await supabase
		.from('activity_likes')
		.delete()
		.match({ user_id, activity_id });
	if (!error) return true;
	else return false;
};
