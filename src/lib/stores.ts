import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

// User Data
export const user: Writable<User | null> = writable(null);
export const profile = writable(null);

// UX
export const modal = writable(null);
export const loading = writable(false);

// Toast
export const toast = writable('');

// Main
export const activitiesToShow = writable('all');
