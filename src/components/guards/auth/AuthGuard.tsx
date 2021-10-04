import React, { FC, useEffect } from 'react';
import { useApp, Text } from 'ink';
import { getConfig } from '../../../lib/config';

const AuthGuard: FC = ({ children }) => {
	const { exit } = useApp();
	const auth = getConfig('auth');

	useEffect(() => {
		if (!auth) {
			exit();
		}
	}, []);

	if (!auth) {
		return <Text color="red">User is not logged in</Text>;
	}

	return <>{children}</>;
};

export default AuthGuard;
