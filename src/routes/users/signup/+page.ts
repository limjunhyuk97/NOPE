import axios from 'axios';
import { toast } from '$lib/stores';

//** input validation check */
export const _checkDuplication = async (input: string, column: string) => {
	try {
		const response = await axios({
			method: 'post',
			url: `/users/signup`,
			data: { column, input }
		});
		return response.data;
	} catch (err) {
		toast.set('네트워크 오류. 다음에 시도해주세요');
		console.log(err);
	}
};
