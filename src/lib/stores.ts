import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

// User Data
export const user: Writable<User | null> = writable(null);
export const profile = writable(null);

// UX
export const modal = writable(null);
export const loading = writable(false);

// Toast
type ToastType = {
	message: string;
	top: number;
	width: number;
};
export const toast: Writable<ToastType | null> = writable(null);
