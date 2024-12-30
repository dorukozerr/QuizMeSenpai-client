import { createTRPCReact } from '@trpc/react-query';

import { AppRouter } from '../../../api/src/trpc';

export const trpc = createTRPCReact<AppRouter>();
