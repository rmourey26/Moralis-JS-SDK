import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  web3ApiVersionOperation as operation, 
  Web3ApiVersionRequest, 
  Web3ApiVersionResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWeb3ApiVersion = (
  request?: Web3ApiVersionRequest, 
  fetchParams?: FetchParams,
) => {
  const endpoint = 'evmApi/web3ApiVersion';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<Web3ApiVersionResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, ...fetchParams }
  );

  const fetch = useCallback((params?: Web3ApiVersionRequest) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new NoHookParamsError('useEvmNativeBalance');
    }
    return mutate(
      fetcher(endpoint, {
        deserializeResponse,
        request: serializeRequest(fetchRequest, Moralis.Core),
      }),
    );
  }, []);

  return {
    data,
    error,
    fetch,
    /**
     * @deprecated use `fetch()` instead
     */
    refetch: () => fetch(),
    isFetching: isValidating,
    /**
     * @deprecated use `isFetching` instead
     */
    isValidating,
  };
};
