// Activities
export interface Activities {
	activities_info_images: {
		images: {
			url: string;
		};
	}[];
	activities_type: {
		type: string;
		type_kor: string;
	};
	contents: string;
	id: string;
	status: string;
	recruiting: boolean;
	start_at: Date;
	end_at: Date;
	title: string;
}
