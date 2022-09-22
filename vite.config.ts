import { sveltekit } from '@sveltejs/kit/vite';
import dynamicImport from 'vite-plugin-dynamic-import';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		dynamicImport({
			onFiles: (files) => files.filter((f) => !f.includes('codemirror.js'))
		})
	]
};

export default config;
