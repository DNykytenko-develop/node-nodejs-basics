import { access, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

	try {
		await access(filePath);

		await unlink(filePath);
	} catch {
		throw new Error('FS operation failed');
	}
};

await remove();
