import React, { FC } from 'react';
import meow from 'meow';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { commandComponents } from './commands';

interface Props {
	cli: meow.Result<{}>;
}

const App: FC<Props> = ({ cli }) => {
	if (cli.input[0]) {
		const Component = commandComponents[cli.input[0]];

		if (Component) {
			return <Component cli={cli} />;
		}
	}

	clear();
	console.log(
		chalk.blue(figlet.textSync('Nubo', { horizontalLayout: 'full' }))
	);
	console.log(cli.help);

	return null;
};

module.exports = App;
export default App;
