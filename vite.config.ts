import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

const config: UserConfig = {
	plugins: [sveltekit(), viteCommonjs()]
};

export default config;
