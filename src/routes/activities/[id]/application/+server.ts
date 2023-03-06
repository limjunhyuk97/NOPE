import { admin } from '$lib/admin';
import { networkErrorResponse, invalidErrorResponse } from '$lib/utils';

export const POST = async ({ request }: any) => {
	const { user_id, activity_id, answers } = await request.json();

	// 지원서 작성했는지 유무 확인
	const { data, error } = await admin
		.from('participants')
		.select('id')
		.match({ activity_id, user_id, status: 'pending' });

	if (error) {
		return networkErrorResponse(error);
	}

	if (data.length > 0) {
		return invalidErrorResponse('지원서를 이미 작성하셨습니다!');
	}

	// 지원자 등록
	else {
		const { data, error } = await admin
			.from('participants')
			.upsert({ activity_id, user_id })
			.select()
			.single();

		if (error) {
			return networkErrorResponse(error);
		}

		// 답변 등록
		else {
			const participant_id = data.id;

			const { error } = await admin.from('activity_answers').insert(
				answers.map((answer: { content: string; query_id: string; query: string }) => {
					return { participant_id, answer: answer.content, question_id: answer.query_id };
				})
			);

			if (error) {
				return networkErrorResponse(error);
			} else {
				return new Response(JSON.stringify({ msg: participant_id }), { status: 200 });
			}
		}
	}
};
