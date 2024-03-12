'use server';
import prisma from '@/lib/prisma';
import { PoliceStation } from '@prisma/client';

export async function create(data: PoliceStation) {
  await prisma.policeStation.create({
    data,
  });
}

export async function update(id: number, data: PoliceStation) {
  await prisma.policeStation.update({
    where: { id },
    data,
  });
}

export async function remove(id: number) {
  await prisma.policeStation.delete({
    where: { id },
  });
}
