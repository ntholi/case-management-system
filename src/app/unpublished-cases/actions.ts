'use server';
import prisma from '@/lib/prisma';

export async function remove(id: number) {
  await prisma.case.delete({
    where: { id },
  });
}
