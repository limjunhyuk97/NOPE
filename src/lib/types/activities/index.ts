// Activity
export type ActivityCard = {
	id: string;
	type_id: string;
	owner_id: string;
	image_id: string;
	recruiting: boolean;
	start_at: string;
	end_at: string;
	created_at: string;
	status: string;
	title: string;
	details: string;
	short_details: string;
	activity_types: {
		type: string;
		type_kor: string;
	};
	comments: Comment[];
	images: {
		storage_id: string;
	};
};

// Likes
export interface Likes {
	activity_id: string;
}

export interface ActivityDetail {
	details: string;
	title: string;
}

export type Users = {
	name: string;
	id: string;
	images: {
		url: string;
	};
};

// Comment
export interface Comment {
	id: string;
	contents: string;
	created_at: string;
	users: { name: string; images: string | null; id: string };
}
