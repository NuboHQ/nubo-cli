import meow from 'meow';
import { FC } from 'react';

import Create from './create/Create';
import Login from './login/Login';
import Logout from './logout/Logout';

export interface CommandComponent {
	cli: meow.Result<{}>;
}

export const commandComponents: { [key: string]: FC<CommandComponent> } = {
	create: Create,
	login: Login,
	logout: Logout,
};
