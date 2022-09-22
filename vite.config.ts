import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

const config: UserConfig = {
	plugins: [sveltekit(), esbuildCommonjs(['codemirror-ssr'])]
};

export default config;
