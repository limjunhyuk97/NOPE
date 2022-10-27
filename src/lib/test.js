import { admin } from './admin.js';

const a = async () => {
	const { data, error } = await admin.auth.admin.listUsers();

	console.log(data);
};

await a();
