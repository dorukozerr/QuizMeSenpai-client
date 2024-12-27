import { createTRPCReact } from '@trpc/react-query';

// import { AppRouter } from '@/types/trpc-app-router';
import { AppRouter } from '../../../api/src/trpc';

export const trpc = createTRPCReact<AppRouter>();
