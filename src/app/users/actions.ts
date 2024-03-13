'use server';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export async function create(data: any) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== 'ADMIN') {
    throw new Error("You don't have permission to create a user.");
  }

  const { email, firstName, lastName, password } = schema.parse(data);

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
      firstName,
      lastName,
    },
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
