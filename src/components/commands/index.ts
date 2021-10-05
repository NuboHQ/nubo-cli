import meow from 'meow';
import { FC } from 'react';
import Create from './create/Create';

export { default as Login } from './login/Login';
export { default as Logout } from './logout/Logout';

export interface CommandComponent {
	cli: meow.Result<{}>;
}

export const commandComponents: { [key: string]: FC<CommandComponent> } = {
	create: Create,
};
