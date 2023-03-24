// 사용자 탈퇴
//** users 칼럼 */
// - name : '탈퇴한 사용자'
// - descriptions : '탈퇴한 사용자입니다.'
// - status : 'leaved'
// - image_id->storage_id : NULL
// - users_stacks에서 관련 스택 모두 지우기

//** activites */
// - owner인 활동들에 대해 status  : 'finished'

import type { RequestHandler } from './$types';
import { admin } from '$lib/admin';

//** POST : checking email, name value */
/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }: any) => {
	const { user_id } = await request.json();

	const { error } = await admin.rpc('user_signout', { target_user_id: user_id });

	if (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	} else {
		const { data, error } = await admin.auth.admin.deleteUser(user_id);
		if (error) return new Response(JSON.stringify(error), { status: 500 });
		else return new Response(null, { status: 200 });
	}
};
