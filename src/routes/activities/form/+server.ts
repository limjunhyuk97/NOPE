import { supabase } from '$lib/supabase';
import type { RequestHandler } from './$types';
import { admin } from '$lib/admin';

const checkActivityCreationCount = async (user_id: string) => {
	const { data, error } = await supabase
		.from('users')
		.select('activity_created')
		.eq('id', user_id)
		.single();
	return error ? 2 : data.activity_created;
};

const invalidTitle = (title: any) => {
	if (typeof title !== 'string') return { msg: '활동 제목은 필수 입력 항목입니다.', page: 1 };
	if (title.length === 0) return { msg: '활동 제목은 필수 입력 항목입니다.', page: 1 };
	return false;
};

const invalidTime = (start_at: Date, end_at: Date) => {
	if (end_at.getTime() < start_at.getTime())
		return { msg: '시작일, 종료일을 수정해주세요', page: 1 };
	return false;
};

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ request }: any) => {
	const {
		owner_id,
		thumbnail,
		activity_type,
		title,
		start_at,
		end_at,
		short_details,
		details,
		recruiting,
		status,
		queries
	} = await request.json();

	const start_at_date = new Date(start_at);
	const end_at_date = new Date(end_at);

	const titleCheck = invalidTitle(title);

	if (titleCheck) {
		return new Response(JSON.stringify(titleCheck), { status: 400 });
	}

	const timeCheck = invalidTime(start_at_date, end_at_date);

	if (timeCheck) {
		return new Response(JSON.stringify(timeCheck), { status: 400 });
	}

	const activityCreationCountCheck = await checkActivityCreationCount(owner_id);

	if (activityCreationCountCheck > 1) {
		return new Response(JSON.stringify({ msg: '하루동안 개설 가능한 활동 갯수를 초과했습니다!' }), {
			status: 400
		});
	}

	// 활동 등록
	const { data, error } = await admin
		.from('activities')
		.insert({
			owner_id,
			type_id: activity_type,
			recruiting,
			start_at: start_at_date,
			end_at: end_at_date,
			status,
			title,
			short_details,
			details,
			image_id: thumbnail
		})
		.select()
		.single();

	if (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: '네트워크 오류' }), {
			status: 500
		});
	} else {
		// participant 등록
		const { error } = await admin
			.from('participants')
			.insert({ user_id: owner_id, activity_id: data.id, status: 'super' });
		console.log(error);

		if (error) {
			console.log(error);
			return new Response(JSON.stringify({ msg: '네트워크 오류' }), {
				status: 500
			});
		}

		// 유저의 활동 개설 갯수 증가
		const response = await admin
			.from('users')
			.update({ activity_created: activityCreationCountCheck + 1 })
			.eq('id', owner_id);

		if (response.error) {
			console.log(response.error);
			return new Response(JSON.stringify({ msg: '네트워크 오류' }), {
				status: 500
			});
		}

		// 설문 있는 경우 등록
		if (queries.length > 0) {
			const { error } = await admin.from('activity_forms').insert(
				queries.map((query: string) => {
					return { question: query, activity_id: data.id };
				})
			);
			if (error) {
				console.log(error);
				return new Response(JSON.stringify({ msg: '네트워크 오류' }), {
					status: 500
				});
			}
			return new Response(JSON.stringify({ msg: '활동 등록 성공', id: data.id }), {
				status: 200
			});
		}

		// 모두 잘 끝나면 응답
		return new Response(JSON.stringify({ msg: '활동 등록 성공', id: data.id }), {
			status: 200
		});
	}
};
