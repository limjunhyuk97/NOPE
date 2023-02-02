import { ACTIVITY_TYPE } from './constants';
import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

// User Data
export const user: Writable<User | null> = writable(null);
export const profile = writable(null);

// modal
export const showmodal = writable(false);
export const modalComponent = writable(null);
export const modalData = writable({});

// Toast
export const toast = writable('');

// Main
export const activitiesToShow = writable(ACTIVITY_TYPE.ALL);

// MyPage
export const mypageSidebar = writable('default');
export const myProfile: Writable<{
	email: string;
	name: string;
	descriptions: string;
	image_id: string;
	images: { storage_id: string };
} | null> = writable(null);
export const myStacks: Writable<
	{ id: string; stacks: { id: string; url: string; name: string } }[]
> = writable([]);
