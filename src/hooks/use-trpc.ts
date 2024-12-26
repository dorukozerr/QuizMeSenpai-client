import { trpc } from '@/lib/trpc';

export const useTrpc = () => {
  const loginMutation = trpc.auth.login.useMutation();

  const authenticateMutation = trpc.auth.authenticate.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });

  const checkAuthQuery = trpc.auth.checkAuth.useQuery(undefined, {
    retry: false
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });

  const utils = trpc.useUtils();

  return {
    loginMutation,
    authenticateMutation,
    checkAuthQuery,
    logoutMutation,
    utils
  };
};
