import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

// User Data
export const user: Writable<User | null> = writable(null);
export const profile = writable(null);

// UX
type Mo
export const modal = writable(null);

// Toast
export const toast = writable('');

// Main
export const activitiesToShow = writable('all');
