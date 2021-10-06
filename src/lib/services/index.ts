import { data } from '../data';

export const addAndUpdateService = async ({
  nameId,
  typeNameId,
}: {
  nameId: string;
  typeNameId: string;
}) => {
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
      nameId,
      type: { type: 'products', nameId: typeNameId },
    },
  };

  await data({ query, variables });
};
