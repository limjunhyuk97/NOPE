import { user } from '$lib/stores';
import { supabase, supabaseWithToken } from '$lib/supabase';
import { get } from 'svelte/store';
import { getSignedUrl, upsertImage } from '$lib/utils';

export const _getUser = async () => {
	const { data, error } = await supabase
		.from('users')
		.select('email, name, descriptions, image_id, images("storage_id")')
		.eq('id', get(user)?.id)
		.single();
	return error ? null : data;
};

export const _upsertUserProfileImage = async (
	image_id: string,
	storage_id: string,
	access_token: string | null
) => {
	const profileImageID = await upsertImage({ id: image_id, storage_id });
	if (!profileImageID || !access_token) return false;
	const updateResult = await supabaseWithToken(access_token)
		.from('users')
		.update({ image_id: profileImageID })
		.eq('id', get(user)?.id);
	return updateResult.status === 204;
};

// images 테이블의 row - storage 연결을 끊어버린다.
export const _removeUserProfileImage = async (image_id: string) => {
	if (image_id === null) return true;
	const result = await supabase.from('images').update({ storage_id: '' }).eq('id', image_id);
	console.log(result, image_id);
	return result.status === 204 ? true : false;
};

export const _getUserStacks = async () => {
	const { data, error } = await supabase
		.from('user_stacks')
		.select('id, stacks(*)')
		.eq('user_id', get(user)?.id);
	return error ? [] : data;
};

const getStacks = async () => {
	const { data, error } = await supabase.from('stacks').select('*');
	return error ? [] : data;
};

export const _addUserStack = async (stack_id: string, user_id: string) => {
	const { error } = await supabase.from('user_stacks').insert({ user_id, stack_id });
	return error ? false : true;
};

export const _deleteUserStack = async (id: string) => {
	const { error } = await supabase.from('user_stacks').delete().eq('id', id);
	return error ? false : true;
};

export const _checkNameDuplication = async (name: string, id: string) => {
	if (name.length === 0) return true;
	const { data, error } = await supabase
		.from('users')
		.select('name')
		.eq('name', name)
		.neq('id', id);
	return error ? true : data.length > 0 ? true : false;
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const user = await _getUser();
	const userImage = await getSignedUrl(user?.images?.storage_id);
	const userStacks = await _getUserStacks();
	const stacks = await getStacks();

	return { user, stacks, userStacks, userImage };
}
