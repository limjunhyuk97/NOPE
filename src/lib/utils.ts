import { v4 as uuidv4 } from 'uuid';
import { supabase } from '$lib/supabase';
import ImageResize from 'image-resize';
import { showmodal, modalComponent, modalData } from './stores';

// bucket에 넣고 key를 반환해줌
export const getImageKey = async (file: File | Blob | null, bucket = 'app') => {
	if (!file) {
		return null;
	}
	const fileName = `${uuidv4()}`;

	// 'file명 - file자체'를 특정 bucket으로 업로드 한다.
	const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
		contentType: 'image/jpg'
	});
	if (error) {
		console.log(error);
		return null;
	} else {
		return fileName;
	}
};

// bucket에 들어있는 img 파일의 주소를 반환해준다. 즉, 어떻게 접근해야하는지 알려준다.
export const getUrl = async (key: string, bucket = 'app') => {
	if (!key) {
		return null;
	}

	const { data } = await supabase.storage.from(bucket).getPublicUrl(key);

	return data;
};

export const getSignedUrl = async (key: string | null, bucket = 'app') => {
	if (!key) {
		return null;
	}

	const { data, error } = await supabase.storage.from(bucket).createSignedUrl(key, 100000);
	if (error) {
		console.log(error);
		return null;
	} else {
		return data?.signedUrl;
	}
};

//* images table에 {id, storage_id} 정보 저장 후 id 반환 */
export const upsertImage = async ({
	id,
	storage_id
}: {
	id: string | undefined | null;
	storage_id: string;
}) => {
	if (id === undefined || id === null) id = `${uuidv4()}`;

	const { error } = await supabase.from('images').upsert({ id, storage_id }, { onConflict: 'id' });

	return error ? null : id;
};

export const resizeImage = async (file: File, width = 400, quality = 0.7) => {
	try {
		const imageResize = new ImageResize({
			format: 'jpg',
			width: width,
			quality: quality,
			outputType: 'blob'
		});
		return await imageResize.play(file);
	} catch (e) {
		console.log(e);
		return null;
	}
};

// 빈문자열인지 아닌지 체크
export const isEmptyString = (target: string | null) => {
	return target?.length === 0;
};

// 모달 생성
export const showModal = ({ component, data }) => {
	modalData.set(data);
	modalComponent.set(component);
	showmodal.set(true);
};

// 모달 끄기
export const deleteModal = () => {
	showmodal.set(false);
	modalData.set({});
	modalComponent.set(null);
};

// 쿼리스트링 가져오기
export const getQueryString = (key: string) => {
	return new URLSearchParams(location.search).get(key);
};

// 네트워크 에러
export const networkErrorResponse = (error: any) => {
	return new Response(JSON.stringify({ msg: error }), { status: 500 });
};

// 유효성 에러 메시지
export const invalidErrorResponse = (error: string) => {
	return new Response(JSON.stringify({ msg: error }), { status: 500 });
};
