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

export interface Comments {
	id: string;
	contents: string;
	created_at: string;
	users: Users;
}
[];
