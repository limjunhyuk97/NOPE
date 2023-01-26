/** @type {import('./$types').LayoutLoad} */

import { v4 as uuidv4 } from 'uuid';
import { user } from '$lib/stores';
import { supabase } from '$lib/supabase';
import { get } from 'svelte/store';
import { resize } from '$lib/utils';

const getUser = async () => {
	const { data, error } = await supabase
		.from('users')
		.select('email, name, descriptions, image_id, images("storage_id")')
		.eq('id', get(user)?.id)
		.single();
	if (error) {
		console.log(error);
	} else {
		return data;
	}
};

const getStacks = async () => {
	const { data, error } = await supabase.from('stacks').select('*');
	return error ? [] : data;
};

const updateUsers = async (data) => {
	const { error } = await supabase.from('users').update(data).eq('id', get(user)?.id);

	if (error) {
		console.log(error);
	}
};

const upsertProfileImage = async (imageId: string, url: string) => {
	const { error } = await supabase
		.from('images')
		.upsert({ id: imageId, url: url }, { onConflict: 'id' });

	if (error) {
		console.log(error);
	}
};

const getBucketFilePath = async (imageId: string, path = '') => {
	const { data, error } = await supabase.from('images').select('url').eq('id', imageId).single();

	if (error) {
		console.log(error);
		return null;
	} else {
		return path + data.url.split('/').pop().split('?')[0];
	}
};

const deleteBucket = async (storageName: string, filePath: string) => {
	const { error } = await supabase.storage.from(storageName).remove([filePath]);

	if (error) {
		console.log(error);
	}
};

export const editProfile = async (profileData) => {
	const { error } = await supabase.from('users').update(profileData).eq('id', get(user)?.id);

	if (error) {
		console.log(error);
	} else {
		return await getProfile();
	}
};

export const editProfileImage = async (imageId: string | null, url: string | null) => {
	if (!url) {
		return;
	}
	if (!imageId) {
		const newImageId: string = uuidv4();
		await upsertProfileImage(newImageId, url);
		await updateUsers({ image_id: newImageId });
	} else {
		const bucketFilePath = await getBucketFilePath(imageId);

		if (bucketFilePath) {
			await deleteBucket('app', bucketFilePath);
		}
		await upsertProfileImage(imageId, url);
	}
	return await getProfile();
};

export const addStack = async (stack_id: string, user_id: string) => {
	const { error } = await supabase.from('user_stacks').insert({ user_id, stack_id });
	return error ? false : true;
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const user = await getUser();

	const stacks = await getStacks();

	return { user, stacks };
}
