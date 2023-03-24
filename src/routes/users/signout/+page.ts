import axios from 'axios';
import { toast } from '$lib/stores';

export const _deleteUser = async (user_id: string) => {
	try {
		await axios({
			method: 'post',
			url: '/users/signout',
			data: { user_id }
		});
		toast.set('회원탈퇴 성공. 또 만나요!');

		return true;
	} catch (err) {
		toast.set('회원탈퇴 실패');
		console.log(err);
		return null;
	}
};
