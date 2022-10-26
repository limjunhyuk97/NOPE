import type { Actions } from './$types';
import { admin } from '$lib/admin';
import { supabase } from '$lib/supabase';
import * as EmailValidator from 'email-validator';
import { invalid, json } from '@sveltejs/kit';

//** email 유효성 검사 */
const isValidEmailType = (email: string) => {
	return EmailValidator.validate(email);
};

const isUniqueEmail = async (email: string) => {
	const { data, error } = await admin.from('users').select('status').eq('email', email);
	return data?.length > 0 ? false : true;
};

//** password 유효성 검사 */
const isValidPassword = (password: string) => {
	const regex = /^[ㄱ-ㅎ|가-힣]+$/;
	return !regex.test(password);
};

const isMatchingPassword = (password: string, passwordcheck: string) => {
	return password === passwordcheck;
};

//** name 유효성 검사 */
const isValidName = (name: string) => {
	return name.length > 0;
};

const isUniqueName = async (name: string) => {
	const { data, error } = await admin.from('users').select('status').eq('name', name);
	return data?.length > 0 ? false : true;
};

//** 전체 유호셩 검사 */
const validations = async (
	email: string,
	password: string,
	passwordcheck: string,
	name: string
) => {
	if (!isValidEmailType(email)) {
		return '이메일 형식을 확인해주세요!';
	}

	if (!isUniqueEmail(email)) {
		return '이미 존재하는 이메일입니다!';
	}

	if (!isValidPassword(password)) {
		return '비밀번호에 한글이 포함되어 있습니다!';
	}

	if (!isMatchingPassword(password, passwordcheck)) {
		return '비밀번호 확인이 일치하지 않습니다!';
	}

	if (!isValidName(name)) {
		return '사용할 이름을 입력해주세요!';
	}

	if (!isUniqueEmail(name)) {
		return '중복된 이름입니다!';
	}

	return null;
};

//** form actions */
export const actions: Actions = {
	default: async ({ request }): Promise<any> => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const passwordcheck = data.get('passwordcheck');
		const name = data.get('name');

		const validationResult = await validations(email, password, passwordcheck, name);

		if (validationResult) return invalid(400, { message: validationResult });
		else {
			// 회원가입 등록
			const { data, error } = await admin.auth.admin.createUser({
				email,
				password,
				user_metadata: {
					name
				}
			});
			if (error) return invalid(400, { message: '회원가입이 불가능합니다!' });
			else {
				// confirm 메일 전송
				const { data, error } = await admin.auth.admin.generateLink({
					type: 'signup',
					email
				});
				console.log(data, error);
				if (error) return invalid(400, { message: '회원가입이 불가능합니다!' });
				else return { success: true };
			}
		}
	}
};
