import { access, rename as renameAsync } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const folderPath = path.join(__dirname, 'files');
	const oldFilePath = path.join(folderPath, 'wrongFilename.txt');
	const newFilePath = path.join(folderPath, 'properFilename.md');

	try {
		await access(oldFilePath);

		try {
			await access(newFilePath);

			throw new Error('FS operation failed');
		} catch (error) {
			if (error.code !== 'ENOENT') {
				throw error;
			}
		}

		await renameAsync(oldFilePath, newFilePath);
	} catch {
		throw new Error('FS operation failed');
	}
};

await rename();
