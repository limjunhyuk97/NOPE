import type { RequestHandler } from './$types';
import { admin } from '$lib/admin';

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
		thumbnail,
		id,
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

	// 활동 수정
	const { error } = await admin
		.from('activities')
		.update({
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
		.eq('id', id);

	if (error) {
		console.log(error);
		return new Response(JSON.stringify({ msg: '네트워크 오류' }), {
			status: 500
		});
	} else {
		// 이미 등록된 설문 삭제
		const { error } = await admin.from('activity_forms').delete().eq('activity_id', id);

		if (error) {
			console.log(error);
			return new Response(JSON.stringify({ msg: '네트워크 오류' }), {
				status: 500
			});
		}

		// 설문 있는 경우 등록
		if (queries.length > 0) {
			const { error } = await admin.from('activity_forms').insert(
				queries.map((query: string) => {
					return { question: query, activity_id: id };
				})
			);
			if (error) {
				console.log(error);
				return new Response(JSON.stringify({ msg: '네트워크 오류' }), {
					status: 500
				});
			}
			return new Response(JSON.stringify({ msg: '활동 등록 성공', id }), {
				status: 200
			});
		}

		// 모두 잘 끝나면 응답
		return new Response(JSON.stringify({ msg: '활동 등록 성공', id }), {
			status: 200
		});
	}
};
