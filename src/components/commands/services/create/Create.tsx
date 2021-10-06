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
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');

  const test = useCallback(async () => {
    try {
      const query = `
				mutation AddService($data: AddServiceDataInput!) {
					addService(data: $data) {
						id
						nameId
					}
				}
			`;
      const variables = {
        data: {
          nameId: 'from-cli',
          type: { type: 'products', nameId: typeNameId },
        },
      };

      await data({ query, variables });
      setComplete(true);
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

  if (complete) {
    return <Text>Created from-cli</Text>;
  }

  return null;
};

export { Create, Help };
