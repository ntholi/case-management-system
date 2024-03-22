'use server';
import prisma from '@/lib/prisma';
import { Case } from '@prisma/client';

export async function create(data: Case) {
  await prisma.case.create({
    data,
  });
}

export async function update(id: string, data: Case) {
  await prisma.case.update({
    where: { id },
    data,
  });
}

export async function remove(id: string) {
  await prisma.case.delete({
    where: { id },
  });
}
