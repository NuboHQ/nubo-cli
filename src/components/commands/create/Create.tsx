import React, { FC } from 'react';
import { Text } from 'ink';
import { CommandComponent } from '..';
import AuthGuard from '../../guards/auth/AuthGuard';

const Create: FC<CommandComponent> = ({ cli }) => {
	return (
		<AuthGuard>
			<Text>Create {cli.input[1]}</Text>
		</AuthGuard>
	);
};

export default Create;
