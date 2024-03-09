'use server';
import prisma from '@/lib/prisma';
import { CrimeClassification } from '@prisma/client';

export async function create(data: CrimeClassification) {
  await prisma.crimeClassification.create({
    data,
  });
}

export async function update(id: number, data: CrimeClassification) {
  return await prisma.crimeClassification.update({
    where: { id },
    data,
  });
}

export async function remove(id: number) {
  return await prisma.crimeClassification.delete({
    where: { id },
  });
}
