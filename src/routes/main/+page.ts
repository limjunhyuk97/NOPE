import { supabase } from '$lib/supabase';

// Activities
export interface activities {
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

/** @type {import('./$types').PageLoad} */
export async function load() {
	const { data } = await supabase
		.from('activities')
		.select(
			'title, recruiting, start_at, end_at, id, status, contents, activities_type("type"), activities_info_images(images("url"))'
		)
		.order('created_at', { ascending: false });

	return { activities: data };
}
