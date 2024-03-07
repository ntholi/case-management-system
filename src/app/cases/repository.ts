import { Case } from '@prisma/client';
import prisma from '@/lib/prisma';
import { Repository, ResourceCreate } from '../admin-core/repository';

class CaseRepository implements Repository<Case, number> {
  async getAll(
    limit = 10,
    filter?: { field: string; value: any }
  ): Promise<Case[]> {
    if (!filter) {
      return (await prisma.case.findMany({ take: limit })) ?? [];
    }
    const { field, value } = filter;
    const data = await prisma.case.findMany({
      take: limit,
      where: { [field]: value },
    });
    return data ?? [];
  }

  async get(id: number): Promise<Case | null> {
    return await prisma.case.findUnique({ where: { id } });
  }

  async create(data: ResourceCreate<Case>): Promise<Case> {
    return await prisma.case.create({ data });
  }

  async update(id: number, data: Case): Promise<Case> {
    return await prisma.case.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.case.delete({ where: { id } });
  }

  async getAllBy(field: string, value: any): Promise<Case[]> {
    const data = await prisma.case.findMany({ where: { [field]: value } });
    return data ?? [];
  }
}

export const caseRepository = new CaseRepository();
