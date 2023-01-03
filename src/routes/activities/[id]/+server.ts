import type { RequestHandler } from './$types';
import { admin } from '$lib/admin';
import { USER_STATUS } from '$lib/constants';

//** POST : checking email, name value */
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }: any) => {
	const { token } = await request.json();

	console.log(token);
};
