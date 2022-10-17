import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request: any }) => {
		console.log(request);
		return { success: true };
	}
};
