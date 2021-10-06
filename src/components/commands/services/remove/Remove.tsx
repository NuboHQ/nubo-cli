import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import { CommandComponent } from '../..';
import { data } from '../../../../lib/data';
import { getServiceNameIdFromCli } from './utils';

const Remove: FC<CommandComponent> = ({ cli }) => {
	const nameId = getServiceNameIdFromCli(cli);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const test = useCallback(async () => {
		try {
			const query = `
				query {
					services {
						items {
							nameId
						}
					}
				}
			`;

			const result = await data({ query });
			result.data.services.items.map((service: any) => {
				return {
					name: service.nameId,
				};
			});
			setLoading(false);
		} catch (error: any) {
			setError(error.message || 'Unknown error');
		}
	}, []);

	useEffect(() => {
		test();
	}, []);

	if (!nameId) {
		return <Text color="red">Missing service name</Text>;
	}

	if (error) {
		return <Text color="red">{error}</Text>;
	}

	if (loading) {
		return (
			<Text>
				<Text color="blue">
					<Spinner type="dots" />
				</Text>
				{' Loading'}
			</Text>
		);
	}

	return <Text>Remove {nameId}</Text>;
};

export { Remove };
