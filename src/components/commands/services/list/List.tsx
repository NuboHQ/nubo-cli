import React, { FC, useCallback, useEffect, useState } from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import { CommandComponent } from '../..';
import { data } from '../../../../lib/data';
import Table from 'ink-table';

const List: FC<CommandComponent> = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [services, setServices] = useState([]);

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
			const services = result.data.services.items.map((service: any) => {
				return {
					name: service.nameId,
				};
			});
			setServices(services);
			setLoading(false);
		} catch (error: any) {
			setError(error.message || 'Unknown error');
		}
	}, []);

	useEffect(() => {
		test();
	}, []);

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

	return <Table data={services} />;
};

export default List;
