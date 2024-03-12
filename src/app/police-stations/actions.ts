'use server';
import prisma from '@/lib/prisma';
import { PoliceStation } from '@prisma/client';

export async function create(data: PoliceStation) {
  await prisma.policeStation.create({
    data,
  });
}

export async function update(id: string, data: PoliceStation) {
  await prisma.policeStation.update({
    where: { id },
    data: {
      name: data.name,
      district: data.district,
    },
  });
}

export async function remove(id: string) {
  await prisma.policeStation.delete({
    where: { id },
  });
}
