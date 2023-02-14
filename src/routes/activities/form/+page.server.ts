import type { Actions } from './$types';
import { admin } from '$lib/admin';
import { fail } from '@sveltejs/kit';
import { resizeImage } from '$lib/utils';

const WRITE_DETAILS = 'upload_details';

// 제목 유효성 검사
const hasTitleData = (title: string) => {
	return title !== '';
};

//** form actions */
export const actions: Actions = {
	default: async ({ request }): Promise<any> => {
		const data = await request.formData();
		const thumbnail = data.get('thumbnail') as File;
		const activity_type = data.get('type_id');
		const title = data.get('title');
		const start_at = data.get('start_at');
		const end_at = data.get('end_at');
		const recruiting = data.get('recruiting');
		const status = data.get('status');
		const details = data.get('details');
		const questions = data.get('queries');

		const resized = await resizeImage(thumbnail);
		console.log(data);

		// 제목 유효성 검사
		if (!hasTitleData(title))
			return fail(400, { message: '제목을 입력해주세요!', pageState: WRITE_DETAILS });

		return fail(500, { message: 'shits' });
	}
};
