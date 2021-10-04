import React, { FC, useEffect } from 'react';
import { Text, Box } from 'ink';
import { CommandComponent } from '..';
import { setConfig } from '../../../lib/config';

const Login: FC<CommandComponent> = () => {
	useEffect(() => {
		setConfig('auth', 'thisisauth');
	}, []);

	return (
		<Box paddingY={1} paddingX={2} borderStyle="round" borderColor="green">
			<Text color="green">Login successful</Text>
		</Box>
	);
};

export default Login;
