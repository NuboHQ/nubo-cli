import React, { FC } from 'react';
import { Text } from 'ink';

export const HELP_TEXT = `
Usage
	$ nubo services create <type>

Examples
	$ nubo services create node
	$ nubo services create postgresql
`;

const Help: FC = () => {
	return <Text>{HELP_TEXT}</Text>;
};

export default Help;
