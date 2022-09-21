/** @type {import('./$types').LayoutLoad} */

import { v4 as uuidv4 } from 'uuid';
import { user } from '$lib/stores';
import { supabase } from '$lib/supabase';
import { get } from 'svelte/store';

const getProfile = async () => {
	const { data, error } = await supabase
		.from('users')
		.select('email, name, descriptions, image_id, images("url")')
		.eq('id', get(user)?.id)
		.single();
	if (error) {
		console.log(error);
	} else {
		return data;
	}
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

export const editProfileImage = async (imageId: string | null, url: string | null) => {
	if (!url) {
		return;
	}
	if (!imageId) {
		const newImageId: string = uuidv4();
		await upsertProfileImage(newImageId, url);
		await updateUsers({ image_id: newImageId });
	} else {
		await upsertProfileImage(imageId, url);
	}
	return await getProfile();
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const profile = await getProfile();

	return { profile };
}
