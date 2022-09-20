/** @type {import('./$types').LayoutLoad} */

import { v4 as uuidv4 } from 'uuid';
import { user } from '$lib/stores';
import { supabase } from '$lib/supabase';
import { get } from 'svelte/store';

export interface ProfileTypes {
	id: string;
}

const getProfile = async () => {
	const { data, error } = await supabase
		.from('users')
		.select('*, users_images("*")')
		.eq('id', get(user)?.id);
	if (error) {
		console.log(error);
	} else {
		return data[0];
	}
};

const getProfileImage = async (id: string) => {
	const { data, error } = await supabase.from('images').select('*').eq('id', id);
	if (error) {
		console.log(error);
	} else {
		return data;
	}
};

const setImage = async (id: string, url: string) => {
	const { error } = await supabase.from('images').insert([{ id: id, url: url }]);

	if (error) {
		console.log(error);
	}
};

const setUserImage = async (id: string) => {
	const { error } = await supabase
		.from('users_images')
		.insert([{ id: uuidv4(), user_id: get(user)?.id, image_id: id }]);

	if (error) {
		console.log(error);
	}
};

const deleteImage = async (id: string) => {
	const { error } = await supabase.from('images').delete().match({ id: id });
};

const deleteUserImage = async (id: string) => {
	const { error } = await supabase.from('users_images').delete().match({ image_id: id });

	if (error) {
		console.log(error);
	}
};

const deleteBeforeImage = async () => {
	const { data, error } = await supabase
		.from('users_images')
		.select('id, user_id, image_id')
		.eq('user_id', get(user)?.id);

	if (error) {
		console.log(error);
	} else if (data[0]) {
		deleteUserImage(data[0].image_id);
		deleteImage(data[0].image_id);
	}
};

export const editProfileImage = async (url: string | null) => {
	if (!url) {
		return;
	}
	const id = uuidv4();

	await deleteBeforeImage();
	await setImage(id, url);
	await setUserImage(id);
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
	const profile = await getProfile();
	let profileImage: any = {};
	if (profile?.users_images.length > 0) {
		profileImage = await getProfileImage(profile?.users_images[0]?.image_id);
	}

	return { profile, profileImage };
}
