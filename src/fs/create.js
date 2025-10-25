import { access, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const filePath = path.join(__dirname, 'files', 'fresh.txt');

	try {
		await access(filePath);
		throw new Error('FS operation failed');
	} catch (error) {
		if (error.code !== 'ENOENT') {
			throw error;
		}
		await writeFile(filePath, 'I am fresh and young');
	}
};

await create();
