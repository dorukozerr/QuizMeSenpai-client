import { trpc } from '@/lib/trpc';

export const useTrpc = () => {
  const checkAuthQuery = trpc.auth.checkAuth.useQuery();

  // const utils = trpc.useUtils();

  return {
    auth: {
      data: checkAuthQuery.data,
      isLoading: checkAuthQuery.isLoading,
      isError: checkAuthQuery.isError,
      isSuccess: checkAuthQuery.isSuccess
    }
  };
};
