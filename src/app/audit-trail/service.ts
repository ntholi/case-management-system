import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth';

export async function auditLog(model: string, operation: string, args: any) {
  if (model === 'AuditLog') return;
  const session = await getServerSession(authOptions);
  await prisma.auditLog.create({
    data: {
      action: operation,
      model: model,
      userId: session!.user!.id,
      value: args.data ?? null,
    },
  });
}
