//** password 유효성 검사 */
export const isValidPassword = (password: string) => {
	const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	return !regex.test(password);
};

export const isMatchingPassword = (password: string, passwordcheck: string) => {
	return password === passwordcheck;
};

export const isShortPassword = (pw: string) => {
	return pw.length < 8;
};

//** 전체 유호셩 검사 */
export const isValid = (password: string, passwordcheck: string) => {
	if (isShortPassword(password)) {
		return '8자 이상의 비밀번호를 사용해주세요!';
	}

	if (!isValidPassword(password)) {
		return '비밀번호에 한글이 포함되어 있습니다!';
	}

	if (!isMatchingPassword(password, passwordcheck)) {
		return '비밀번호 확인이 일치하지 않습니다!';
	}

	return null;
};
