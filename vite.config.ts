import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

const config: UserConfig = {
	plugins: [sveltekit(), commonjs()]
};

export default config;
