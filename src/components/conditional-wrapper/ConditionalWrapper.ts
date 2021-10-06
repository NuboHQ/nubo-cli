import { FC } from 'react';

interface Props {
	condition: boolean;
	wrapper: any;
}

const ConditionalWrapper: FC<Props> = ({ condition, wrapper, children }) =>
	condition ? wrapper(children) : children;

export default ConditionalWrapper;
