import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import { CommandComponent } from '../..';
import { data } from '../../../../lib/data';
import { getTypeNameIdFromCli } from './utils';
import Help from './help/Help';

const Create: FC<CommandComponent> = ({ cli }) => {
	const typeNameId = getTypeNameIdFromCli(cli);
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

	if (!typeNameId) {
		return <Text color="red">Missing type (i.e. node, postgres)</Text>;
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

	return <Text>Create {typeNameId}</Text>;
};

export { Create, Help };
