import React, { FC } from 'react';
import meow from 'meow';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { getCommand } from './commands';
import ConditionalWrapper from './conditional-wrapper/ConditionalWrapper';
import AuthGuard from './guards/auth/AuthGuard';

interface Props {
	cli: meow.Result<{}>;
}

const App: FC<Props> = ({ cli }) => {
	if (cli.input[0]) {
		const command = getCommand(cli.input);

		if (command) {
			const Component = command.component;

			return (
				<ConditionalWrapper
					condition={!command.withoutAuth}
					wrapper={(children: any) => <AuthGuard>{children}</AuthGuard>}
				>
					<Component cli={cli} />
				</ConditionalWrapper>
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
