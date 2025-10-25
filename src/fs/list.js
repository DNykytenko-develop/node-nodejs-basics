import { access, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const folderPath = path.join(__dirname, 'files');

	try {
		await access(folderPath);

		const files = await readdir(folderPath);

		files.forEach(file => {
			console.log(file);
		});
	} catch {
		throw new Error('FS operation failed');
	}
};

await list();
