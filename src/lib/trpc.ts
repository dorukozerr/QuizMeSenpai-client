import { createTRPCReact } from '@trpc/react-query';

import { AppRouter } from '../../../server/src/trpc';

export const trpc = createTRPCReact<AppRouter>();
