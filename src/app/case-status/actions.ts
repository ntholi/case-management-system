'use server';
import prisma from '@/lib/prisma';
import { CaseStatus } from '@prisma/client';

export async function create(data: CaseStatus) {
  await prisma.caseStatus.create({
    data,
  });
}

export async function update(id: string, data: CaseStatus) {
  await prisma.caseStatus.update({
    where: { id },
    data: {
      courtCaseStatus: data.courtCaseStatus,
      policeCaseStatus: data.policeCaseStatus,
    },
  });
}

export async function remove(id: string) {
  await prisma.caseStatus.delete({
    where: { id },
  });
}
