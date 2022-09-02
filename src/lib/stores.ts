import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export const user: Writable<User | null> = writable(null);
export const profile = writable(null);
export const modal = writable(null);
export const toastMessage: Writable<string | null> = writable('');
export const loading = writable(false);
