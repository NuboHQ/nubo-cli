import React, { FC, useEffect } from 'react';
import { Text, useApp } from 'ink';
import { logout } from '../../../../lib/auth';

const Logout: FC = () => {
	const { exit } = useApp();

	useEffect(() => {
		logout();
		exit();
	}, []);

	return <Text>Logout successful.</Text>;
};

export default Logout;
