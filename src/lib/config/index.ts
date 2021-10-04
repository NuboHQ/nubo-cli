import Conf from 'conf';

const config = new Conf();

export const setConfig = (key: string, value?: unknown) => {
	config.set(key, value);
};

export const getConfig = (key: string) => {
	return config.get(key);
};

export const removeConfig = (key: string) => {
	return config.delete(key);
};
