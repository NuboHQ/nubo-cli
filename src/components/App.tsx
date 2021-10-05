import React, { FC } from 'react';
import meow from 'meow';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { commandComponents, Login, Logout } from './commands';
import AuthGuard from './guards/auth/AuthGuard';

interface Props {
	cli: meow.Result<{}>;
}

const App: FC<Props> = ({ cli }) => {
	if (cli.input[0] === 'login') {
		return <Login />;
	}

	if (cli.input[0] === 'logout') {
		return <Logout />;
	}

	if (cli.input[0]) {
		const Component = commandComponents[cli.input[0]];

		if (Component) {
			return (
				<AuthGuard>
					<Component cli={cli} />
				</AuthGuard>
			);
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
