import axios from 'axios';
import config from '../../config';
import { removeStorage, setStorage, getStorage } from '../storage';
import { data } from '../data';

export type Device = {
	id: string;
	accountId: string;
	name: string;
	active: boolean;
};

export const DEVICE_TOKEN_STORAGE_NAME = 'device-token';
export const DEVICE_AUTH_TOKEN_STORAGE_NAME = 'device-auth-token';

export const addDevice = async ({ email }: { email: string }) => {
	const result = await data({
		query: `
			mutation AddDevice ($email: String!, $name: String!) {
				addDevice (email: $email, name: $name) {
					deviceToken
				}
			}
		`,
		variables: {
			email,
			name: 'Nubo CLI',
		},
	});

	setDeviceToken(result.data.addDevice.deviceToken);
};

export const isLoggedIn = (): boolean => {
	return !!getDeviceAuthToken();
};

export const logout = () => {
	removeDeviceToken();
	removeDeviceAuthToken();
};

export const getDeviceToken = () => {
	return getStorage(DEVICE_TOKEN_STORAGE_NAME);
};

export const setDeviceToken = (deviceToken: string) => {
	setStorage(DEVICE_TOKEN_STORAGE_NAME, deviceToken);
};

export const removeDeviceToken = () => {
	removeStorage(DEVICE_TOKEN_STORAGE_NAME);
};

export const loadDeviceAuthToken = async (): Promise<string | null> => {
	try {
		const deviceToken = getDeviceToken();
		const result: any = await axios.post(config.urls.services, {
			query: DEVICE_AUTH_TOKEN_QUERY,
			variables: {
				deviceToken,
			},
		});

		return result.data.data.deviceAuthToken.authToken;
	} catch (error) {
		return null;
	}
};

export const getDeviceAuthToken = () => {
	return (getStorage(DEVICE_AUTH_TOKEN_STORAGE_NAME) as string) || null;
};

export const setDeviceAuthToken = (deviceToken: string) => {
	setStorage(DEVICE_AUTH_TOKEN_STORAGE_NAME, deviceToken);
};

export const removeDeviceAuthToken = () => {
	removeStorage(DEVICE_AUTH_TOKEN_STORAGE_NAME);
};

export const DEVICE_AUTH_TOKEN_QUERY = `
  query GetDeviceAuthToken ($deviceToken: String!) {
    deviceAuthToken (deviceToken: $deviceToken) {
      authToken
    }
  }
`;
