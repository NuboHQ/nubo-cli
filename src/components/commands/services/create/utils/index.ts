import { Cli } from '../../..';

export const getTypeNameIdFromCli = (cli: Cli): string | null => {
	return cli.input[2]?.toLowerCase() || null;
};
