import { auditLog } from '@/app/audit-trail/service';
import { PrismaClient } from '@prisma/client';
import { Action } from '@prisma/client/runtime/library';

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
