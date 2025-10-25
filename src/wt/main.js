import os from 'node:os';
import { Worker } from 'node:worker_threads';

const performCalculations = async () => {
	const cpuCount = os.cpus().length;
	const workerPath = new URL('./worker.js', import.meta.url);

	const promises = [];

	for (let i = 0; i < cpuCount; i++) {
		const workerData = 10 + i;

		promises.push(
			new Promise(resolve => {
				const worker = new Worker(workerPath, { workerData });

				worker.on('message', result => {
					resolve({ status: 'resolved', data: result });
				});

				worker.on('error', () => {
					resolve({ status: 'error', data: null });
				});

				worker.on('exit', code => {
					if (code !== 0) {
						resolve({ status: 'error', data: null });
					}
				});
			})
		);
	}

	const results = await Promise.all(promises);
	console.log(results);
};

await performCalculations();
