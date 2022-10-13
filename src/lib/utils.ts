import * as EmailValidator from 'email-validator';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '$lib/supabase';

// bucket에 넣고 key를 반환해줌
export const getImageKey = async (file: Blob, bucket = 'app') => {
	if (!file) {
		return null;
	}
	const fileName = `${uuidv4()}`;

	// 'file명 - file자체'를 특정 bucket으로 업로드 한다.
	const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
		contentType: 'image/jpg'
	});
	if (error) {
		console.log(error);
		return null;
	} else {
		return fileName;
	}
};

// bucket에 들어있는 img 파일의 주소를 반환해준다. 즉, 어떻게 접근해야하는지 알려준다.
export const getUrl = async (key: string, bucket = 'app') => {
	if (!key) {
		return '/empty.png';
	}

	const { data } = await supabase.storage.from(bucket).getPublicUrl(key);
	return data;
};

export const getSignedUrl = async (key: string | null, bucket = 'app') => {
	if (!key) {
		return '/empty.png';
	}

	const { data, error } = await supabase.storage.from(bucket).createSignedUrl(key, 100000);
	if (error) {
		console.log(error);
		return null;
	} else {
		return data?.signedUrl;
	}
};

// signup에서 email 체크
export const checkEmail = (email: string) => {
	return EmailValidator.validate(email);
};

// 빈문자열인지 아닌지 체크
export const isEmptyString = (target: string | null) => {
	return target?.length === 0;
};
