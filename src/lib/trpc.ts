import { createTRPCReact } from '@trpc/react-query';

import { AppRouter } from '@/types/trpc-app-router';

export const trpc = createTRPCReact<AppRouter>();
