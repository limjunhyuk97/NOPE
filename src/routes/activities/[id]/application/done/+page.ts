export async function load({ parent, params }) {
	await parent();

	const activity_id = params.id;

	return { activity_id };
}
