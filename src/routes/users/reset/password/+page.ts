//** password 유효성 검사 */
export const _isValidPassword = (password: string) => {
	const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	return !regex.test(password);
};

export const _isMatchingPassword = (password: string, passwordcheck: string) => {
	return password === passwordcheck;
};

export const _isShortPassword = (pw: string) => {
	return pw.length < 8;
};

//** 전체 유호셩 검사 */
export const _isValid = (password: string, passwordcheck: string) => {
	if (_isShortPassword(password)) {
		return '8자 이상의 비밀번호를 사용해주세요!';
	}

	if (!_isValidPassword(password)) {
		return '비밀번호에 한글이 포함되어 있습니다!';
	}

	if (!_isMatchingPassword(password, passwordcheck)) {
		return '비밀번호 확인이 일치하지 않습니다!';
	}

	return null;
};
