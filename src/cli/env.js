const parseEnv = () => {
	const env = process.env;
	const rssEntries = Object.entries(env).filter(([key]) => key.startsWith('RSS_'));

	const formatted = rssEntries.map(([key, value]) => `${key}=${value}`).join('; ');

	console.log(formatted);
};

parseEnv();
