export type Activities = {
	title: string;
	recruiting: string;
	start_at: string;
	end_at: string;
	id: string;
	status: string;
	short_details: string;
	details: string;
	activities_type: {
		type: string;
		type_kor: string;
	};
	images: {
		url: string;
	};
};

export interface Likes {
	activities: Activities;
}
