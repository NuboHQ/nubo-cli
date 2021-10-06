import React, { FC, useEffect } from 'react';
import { Text, useApp } from 'ink';
import { isLoggedIn } from '../../../lib/auth';

const AuthGuard: FC = ({ children }) => {
	const { exit } = useApp();

	useEffect(() => {
		if (!isLoggedIn()) {
			exit();
		}
	}, []);

	if (!isLoggedIn()) {
		return <Text color="red">User is not logged in.</Text>;
	}

	return <>{children}</>;
};

export default AuthGuard;
