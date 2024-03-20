'use server';
import prisma from '@/lib/prisma';

export async function publish(id: number) {
  await prisma.case.update({
    where: { id },
    data: { published: true },
  });
}

export async function remove(id: number) {
  await prisma.case.delete({
    where: { id },
  });
}
