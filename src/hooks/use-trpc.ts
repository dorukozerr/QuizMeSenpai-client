import { trpc } from '@/lib/trpc';

export const useTrpc = () => {
  const utils = trpc.useUtils();

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

  const updateUserMutation = trpc.user.update.useMutation({
    onSuccess: () => utils.auth.checkAuth.invalidate()
  });

  return {
    loginMutation,
    authenticateMutation,
    checkAuthQuery,
    logoutMutation,
    updateUserMutation
  };
};
