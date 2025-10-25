import { access, cp } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const sourceDir = path.join(__dirname, 'files');
	const destDir = path.join(__dirname, 'files_copy');

	try {
		await access(sourceDir);

		try {
			await access(destDir);

			throw new Error('FS operation failed');
		} catch (error) {
			if (error.code !== 'ENOENT') {
				throw error;
			}
		}

		await cp(sourceDir, destDir, { recursive: true });
	} catch {
		throw new Error('FS operation failed');
	}
};

await copy();
