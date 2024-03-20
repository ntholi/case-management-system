'use server';
import prisma from '@/lib/prisma';
import { Case } from '@prisma/client';

export async function remove(id: number) {
  await prisma.case.delete({
    where: { id },
  });
}
