'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export async function create(data: User) {
  await prisma.user.create({
    data,
  });
}

export async function update(id: string, data: User) {
  await prisma.user.update({
    where: { id },
    data,
  });
}

export async function remove(id: string) {
  await prisma.user.delete({
    where: { id },
  });
}
