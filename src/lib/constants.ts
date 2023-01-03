// page url
export const MAINPAGE_URL = 'http://localhost:5173';

//** color Theme */
export const THEME_COLOR = '#9FC9F3';

//** form actions */
export const RESPONSE_TYPE = {
	SUCCESS: 'success',
	INVALID: 'invalid'
};

//** signup */
export const UNIFICATION_STATUS = {
	EMPTY: 'EMPTY',
	VERIFIED: 'VERIFIED',
	DUPLICATED: 'DUPLICATED',
	NOT_AVAILABLE_FORM: 'NOT_AVAILABLE_FORM'
};

//** password verification */
export const PASSWORD_VERIFICATION_STATUS = {
	EMPTY: 'EMPTY',
	VERIFIED: 'VERIFIED',
	MISMATCHED: 'MISMATCHED',
	NON_VALID: 'NON_VALID'
};

//** signin */
export const SIGNIN_STATUS = {
	SUCCESS: 'SUCCESS',
	FAIL: 'FAIL'
};

//** password recovery */
export const PASSWORD_RECOVERY = 'PASSWORD_RECOVERY';

//** activity types */
export const ACTIVITY_TYPE = {
	ALL: 'all',
	STUDY: 'study',
	PROJECT: 'project'
};

//** activity status */
export const ACTIVITY_STATUS = {
	PENDING: 'pending',
	STARTED: 'started',
	FINISHED: 'finished'
};

//** activity filter */
export const ACTIVITY_FILTER = {
	ALL: { type: 'all', name: '전체' },
	RECRUITING: { type: 'recruit_ongoing', name: '모집중' },
	NONRECRUITING: { type: 'recruit_finished', name: '모집종료' }
};

//** user state */
// 로그인 안 한 경우 -> null
// 로그인 + 지원 안한 경우 -> none
// 로그인 + 지원 완료 후 대기 -> pending
// 로그인 + 지원 완료 -> participant
// 로그인 + 관리자 -> admin
// 로그인 + 임명된 관리자 -> superadmin
export const USER_STATUS = {
	LOGOUT: Symbol('logout'),
	NOTAPPLIED: Symbol('nonapply'),
	APPLIED: Symbol('applied'),
	PARTICIPANT: Symbol('applied'),
	ADMIN: Symbol('applied'),
	SUPER: Symbol('applied')
};
