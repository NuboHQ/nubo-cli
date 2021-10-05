import React, { FC, useCallback, useEffect, useState } from 'react';
import inquirer from 'inquirer';
import {
	addDevice,
	loadDeviceAuthToken,
	setDeviceAuthToken,
} from '../../../lib/auth';
import { useApp, Text } from 'ink';
import Spinner from 'ink-spinner';

const Login: FC = () => {
	const [tryingDeviceAuthToken, setTryingDeviceAuthToken] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const { exit } = useApp();

	const tryGetDeviceAuthToken = useCallback(async () => {
		const deviceAuthToken = await loadDeviceAuthToken();

		if (deviceAuthToken) {
			setDeviceAuthToken(deviceAuthToken);
			setTryingDeviceAuthToken(false);
			setAuthenticated(true);
		} else {
			setTimeout(tryGetDeviceAuthToken, 3000);
		}
	}, []);

	const getLoginDetails = useCallback(async () => {
		const questions = [
			{
				name: 'email',
				type: 'input',
				message: 'Email:',
				validate: function (value: string) {
					if (value.length) {
						return true;
					} else {
						return 'Please enter your email.';
					}
				},
			},
		];
		const queryResult = await inquirer.prompt(questions);

		try {
			await addDevice({ email: queryResult.email });
			await tryGetDeviceAuthToken();
			setTryingDeviceAuthToken(true);
		} catch (error) {
			console.log('Unable to log in.');
			exit();
		}
	}, []);

	useEffect(() => {
		getLoginDetails();
	}, []);

	if (tryingDeviceAuthToken) {
		return (
			<Text>
				<Text color="blue">
					<Spinner type="dots" />
				</Text>
				{' Please check your email to grant access'}
			</Text>
		);
	}

	if (authenticated) {
		return (
			<Text>
				<Text color="green">Login successful</Text>
			</Text>
		);
	}

	return null;
};

export default Login;
