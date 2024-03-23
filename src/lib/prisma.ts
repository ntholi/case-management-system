import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { Action } from '@prisma/client/runtime/library';
import { auditLog } from '@/app/audit/service';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (isCreateOrUpdate(operation)) {
            await auditLog(model, operation, args);
          }
          return query(args);
        },
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

function isCreateOrUpdate(op: Action) {
  return (
    op === 'create' || op === 'update' || op === 'upsert' || op === 'delete'
  );
}
