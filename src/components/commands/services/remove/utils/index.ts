import { Cli } from '../../..';

export const getServiceNameIdFromCli = (cli: Cli): string | null => {
	return cli.input[2]?.toLowerCase() || null;
};
