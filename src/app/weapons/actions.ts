'use server';
import prisma from '@/lib/prisma';
import { Weapon } from '@prisma/client';

export async function create(data: Weapon) {
  await prisma.weapon.create({
    data,
  });
}

export async function update(id: number, data: Weapon) {
  await prisma.weapon.update({
    where: { id },
    data,
  });
}

export async function remove(id: number) {
  await prisma.weapon.delete({
    where: { id },
  });
}
