import { trpc } from '../lib/trpc';

export const useTrpc = () => {
  const checkAuthQuery = trpc.auth.checkAuth.useQuery();

  return { checkAuthQuery };
};
