'use server';
import prisma from '@/lib/prisma';
import { CrimeClassification } from '@prisma/client';

export async function createCrimeClassification(data: CrimeClassification) {
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
