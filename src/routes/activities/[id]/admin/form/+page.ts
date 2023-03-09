import { supabase } from '$lib/supabase';
import axios from 'axios';
import { toast } from '$lib/stores';

export const _isSuper = async (user_id: string, activity_id: string) => {
	const { data, error } = await supabase
		.from('participants')
		.select('status')
		.match({ user_id, activity_id });

	if (error) return false;
	if (data.length === 0) return false;
	if (data[0].status !== 'super') return false;
	return true;
};

const _getActivityData = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activities')
		.select('*,images(storage_id)')
		.eq('id', activity_id)
		.single();

	return error ? null : data;
};

const _getQueryData = async (activity_id: string) => {
	const { data, error } = await supabase
		.from('activity_forms')
		.select('*')
		.match({ activity_id, is_valid: true });

	return error ? [] : data;
};

export const _updateActivity = async ({
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
}: {
	thumbnail: string;
	id: string;
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
			url: `/activities/${id}/admin/form`,
			data: {
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
			}
		});
		return response.data;
	} catch (err) {
		toast.set(err.response.data.msg);
		console.log(err);
	}
};

export async function load({ parent, params }) {
	await parent();

	const activity_id = params.id;
	const activity = await _getActivityData(activity_id);
	const queries = await _getQueryData(activity_id);

	return { activity, queries };
}
