import { isValid } from './+page';
import { admin } from '$lib/admin';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
	const requested = await request.json();
	const password = requested.password;
	const passwordcheck = requested.passwordcheck;
	const user_id = requested.user_id;

	if (isValid(password, passwordcheck)) {
		return new Response(isValid(password, passwordcheck), { status: 400 });
	}

	if (!user_id) {
		return new Response('이메일 인증을 해주세요!', { status: 400 });
	}

	const { data, error } = await admin.auth.admin.updateUserById(user_id, {
		password
	});

	if (error) {
		return new Response('네트워크 오류', { status: 400 });
	} else {
		return new Response('비밀번호 변경 성공', { status: 200 });
	}
}
