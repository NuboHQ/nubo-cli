import axios from 'axios';
import { get } from 'lodash';
import {
	getDeviceAuthToken,
	loadDeviceAuthToken,
	setDeviceAuthToken,
} from '../auth';
import config from '../../config';

export type QueryOptions = {
	retryCount?: number;
	authToken?: string;
};

export const data = async ({
	query,
	variables,
	retryCount = 0,
	authToken,
}: {
	query: string;
	variables?: unknown;
	retryCount?: number;
	authToken?: string;
}): Promise<any> => {
	const token = authToken || getDeviceAuthToken() || '';
	const result: any = await axios.post(
		config.urls.services,
		{
			query,
			variables,
		},
		{
			headers: {
				'x-auth-token': token,
			},
		}
	);

	if (get(result, 'data.errors[0]')) {
		if (
			get(result, 'data.errors[0].extensions.code') === 'FORBIDDEN' &&
			retryCount < 1
		) {
			const newAuthToken = await loadDeviceAuthToken();

			if (newAuthToken) {
				setDeviceAuthToken(newAuthToken);

				return data({
					query,
					variables,
					authToken: newAuthToken,
					retryCount: retryCount + 1,
				});
			}
		}

		throw result.data.errors[0];
	}

	return result.data;
};
