import { supabase } from '$lib/supabase';

// Activities
export interface Activities {
	activities_info_images: {
		images: {
			url: string;
		};
	}[];
	activities_type: {
		type: string;
	};
	contents: string;
	id: string;
	status: string;
	recruiting: boolean;
	start_at: Date;
	end_at: Date;
	title: string;
}

// Activity Type
export interface Activity_Types {
	type: string;
	type_kor: string;
}

/** @type {import('./$types').PageLoad} */
export async function load() {
	const Activities = await supabase
		.from('activities')
		.select(
			'title, recruiting, start_at, end_at, id, status, contents, activities_type("type"), activities_info_images(images("url"))'
		)
		.order('created_at', { ascending: false });

	const ActivityTypes = await supabase.from('activities_type').select('type, type_kor');

	return { activities: Activities.data, activityTypes: ActivityTypes.data };
}
