import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenTransfersOperation as operation, 
  GetTokenTransfersRequest, 
  GetTokenTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmTokenTransfers = (request: GetTokenTransfersRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetTokenTransfersResponse>(
    ['evmApi/getTokenTransfers', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
    fetcher, 
    {revalidateOnFocus: false, ...fetchParams}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
