import type { RequestHandler } from './$types';
import { admin } from '$lib/admin';
import { UNIFICATION_STATUS } from '$lib/constants';

//** POST : checking email, name value */
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }: any) => {
	const { column, input } = await request.json();

	const { data, error } = await admin
		.from('users')
		.select('*')
		.match({ [column]: input })
		.neq('status', 'leaved');

	if (error) {
		return new Response(null, { status: 500 });
	}

	return new Response(
		data.length > 0 ? UNIFICATION_STATUS.DUPLICATED : UNIFICATION_STATUS.VERIFIED,
		{
			status: 200
		}
	);
};
