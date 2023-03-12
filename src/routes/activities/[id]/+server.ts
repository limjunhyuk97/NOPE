import { USER_STATUS } from '$lib/constants';
import { admin } from '$lib/admin';

// 로그인 안 한 경우 -> null
// 로그인 + 지원 안한 경우 -> none
// 로그인 + 지원 완료 후 대기 -> pending
// 로그인 + 지원 완료 -> participant
// 로그인 + 관리자 -> admin
const compareUserStatus = (
	response: { user_id: string; status: string; activities: { owner_id: string } }[],
	userID: string
) => {
	if (response.length === 0) return USER_STATUS.LOGOUT;
	else if (response[0].activities.owner_id === userID) return USER_STATUS.SUPER;
	else {
		const filteredResponse = response.filter((res) => res.user_id === userID);
		if (filteredResponse.length === 0) return USER_STATUS.NOTAPPLIED;
		const status = filteredResponse[0].status;
		if (status === 'quit') return USER_STATUS.NOTAPPLIED;
		if (status === 'denied') return USER_STATUS.NOTAPPLIED;
		if (status === 'pending') return USER_STATUS.APPLIED;
		if (status === 'granted') return USER_STATUS.PARTICIPANT;
		if (status === 'admin') return USER_STATUS.ADMIN;
		if (status === 'super') return USER_STATUS.SUPER;
		if (status === 'ejected') return USER_STATUS.EJECTED;
		return USER_STATUS.LOGOUT;
	}
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: { request: Request }) {
	const { userID, activityID } = await request.json();
	if (userID) {
		const { data, error } = await admin
			.from('participants')
			.select('user_id, status, activities("owner_id")')
			.match({ activity_id: activityID });

		return error
			? new Response(null, { status: 400 })
			: new Response(compareUserStatus(data, userID).description, { status: 200 });
	}
	return new Response(String(USER_STATUS.LOGOUT), { status: 200 });
}
