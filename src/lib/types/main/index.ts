// Activities
export interface Activities {
	images: {
		url: string;
	};
	activities_type: {
		type: string;
		type_kor: string;
	};
	details: string;
	short_details: string;
	id: string;
	status: string;
	recruiting: boolean;
	start_at: Date;
	end_at: Date;
	title: string;
	likes: {
		id: string;
	}[];
}
