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
				query GetServices($order: JSON) {
					services (order: $order) {
						items {
							nameId
							type {
								nameId
								name
								data
							}
						}
					}
				}
			`;
			const variables = {
				order: {
					nameId: 'asc',
				},
			};

			const result = await data({ query, variables });
			const services = result.data.services.items.map(
				(service: any, serviceIndex: number) => {
					const isWeb = ['app', 'docker-web'].includes(
						service.type.data.serviceCategoryId
					);

					return {
						'': serviceIndex + 1,
						Name: service.nameId,
						Type: service.type.name,
						...(isWeb && { URL: `https://${service.nameId}.nubo.dev` }),
					};
				}
			);
			setServices(services);
			setLoading(false);
		} catch (error: any) {
			setError('Unable to list services');
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

	if (!services.length) return <Text>No services</Text>;

	return <Table data={services} />;
};

export default List;
