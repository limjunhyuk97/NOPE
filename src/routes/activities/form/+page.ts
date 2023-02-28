import axios from 'axios';
import { toast } from '$lib/stores';

export const _createActivity = async ({
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
}: {
	owner_id: string;
	thumbnail: Blob;
	activity_type: string;
	title: string;
	start_at: Date;
	end_at: Date;
	short_details: string;
	details: string;
	recruiting: boolean;
	status: string;
	queries: string[];
}) => {
	try {
		const response = await axios({
			method: 'post',
			url: '/activities/form',
			data: {
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
			}
		});
		return response.data;
	} catch (err) {
		toast.set(err.response.data.msg);
		console.log(err);
	}
};
