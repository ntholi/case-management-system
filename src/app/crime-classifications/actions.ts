'use server';
import prisma from '@/lib/prisma';
import { CrimeClassification } from '@prisma/client';

export async function create(data: CrimeClassification) {
  await prisma.crimeClassification.create({
    data,
  });
}

export async function update(id: string, data: CrimeClassification) {
  await prisma.crimeClassification.update({
    where: { id },
    data: {
      name: data.name,
    },
  });
}

export async function remove(id: string) {
  await prisma.crimeClassification.delete({
    where: { id },
  });
}
