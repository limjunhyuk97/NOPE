import type { RequestHandler } from './$types';
import { _checkNameDuplication } from './+page';
import { supabaseWithToken } from '$lib/supabase';

//** POST : checking email, name value */
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }: any) => {
	const { name, descriptions, id } = await request.json();
	const bearer = request.headers.get('bearer');

	const duplicated = await _checkNameDuplication(name, id);

	if (duplicated) return new Response('중복된 이름이 있습니다', { status: 400 });

	const result = await supabaseWithToken(bearer)
		.from('users')
		.update({ name, descriptions })
		.eq('id', id);

	return new Response(result.status === 204 ? '' : '네트워크 오류', {
		status: result.status === 204 ? 200 : 400
	});
};
