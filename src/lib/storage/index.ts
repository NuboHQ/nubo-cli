import Conf from 'conf';

const config = new Conf();

export const setStorage = (key: string, value?: unknown) => {
	config.set(key, value);
};

export const getStorage = (key: string) => {
	return config.get(key);
};

export const removeStorage = (key: string) => {
	return config.delete(key);
};
