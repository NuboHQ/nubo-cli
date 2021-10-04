import React, { FC, useEffect } from 'react';
import { Text, useApp } from 'ink';
import { CommandComponent } from '..';
import { removeConfig } from '../../../lib/config';
// import { setConfig } from '../../../lib/config';

const Logout: FC<CommandComponent> = () => {
	const { exit } = useApp();

	useEffect(() => {
		removeConfig('auth');
		exit();
	}, []);

	return <Text>Successfully logged out.</Text>;
};

export default Logout;
