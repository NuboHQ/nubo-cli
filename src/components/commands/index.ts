import { FC } from 'react';
import meow from 'meow';
import Auth from './auth';
import Services from './services';

export interface CommandComponent {
	cli: meow.Result<{}>;
}

export type Command = {
	withoutAuth?: boolean;
	component: FC<CommandComponent>;
};

export type Commands = {
	[key: string]: Command;
};

export const commands: Commands = {
	login: {
		withoutAuth: true,
		component: Auth.Login,
	},
	logout: {
		withoutAuth: true,
		component: Auth.Logout,
	},
	services: {
		withoutAuth: true,
		component: Services.Help,
	},
	'services.list': {
		component: Services.List,
	},
	'services.create': {
		component: Services.Create,
	},
};

export const getCommand = (commandIds: string[]) => {
	const key = commandIds.join('.');

	return commands[key] || null;
};
