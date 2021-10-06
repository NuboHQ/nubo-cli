import { FC } from 'react';
import meow from 'meow';
import Auth from './auth';
import Services from './services';

export type Cli = meow.Result<{}>;

export interface CommandComponent {
	cli: Cli;
}

export type Command = {
	path: string;
	withoutAuth?: boolean;
	component: FC<CommandComponent>;
};

export const commands: Command[] = [
	{
		path: 'login',
		withoutAuth: true,
		component: Auth.Login,
	},
	{
		path: 'logout',
		withoutAuth: true,
		component: Auth.Logout,
	},
	{
		path: 'services.list',
		component: Services.list.List,
	},
	{
		path: 'services.remove.*',
		component: Services.remove.Remove,
	},
	{
		path: 'services.create.*',
		component: Services.create.Create,
	},
	{
		path: 'services.create',
		component: Services.create.Help,
	},
	{
		path: 'services',
		withoutAuth: true,
		component: Services.help.Help,
	},
];

export const getCommand = (commandIds: string[]): Command | null => {
	const path = commandIds.join('.');
	let matchingCommand;

	commands.forEach((command) => {
		if (command.path.includes('*')) {
			const wildcardPath = command.path.split('.*')[0];

			if (path.indexOf(wildcardPath || '_') === 0) {
				matchingCommand = command;
			}
		} else {
			if (command.path === path) {
				matchingCommand = command;
			}
		}
	});

	return matchingCommand || null;
};
