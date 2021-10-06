import React, { FC } from 'react';
import { Text } from 'ink';

export const HELP_TEXT = `
Usage
	$ nubo services <command>

Examples
	$ nubo services list
	$ nubo services create <type>
`;

const Help: FC = () => {
	return <Text>{HELP_TEXT}</Text>;
};

export default Help;
