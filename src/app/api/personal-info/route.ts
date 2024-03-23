import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url || '');
  const nationalId = searchParams.get('nationalId') || '';

  const data = await prisma.personalInformation.findFirst({
    where: {
      nationalId: nationalId,
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const input = await request.json();
  const data = {
    ...input,
    dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
  };

  const existing = await prisma.personalInformation.findFirst({
    where: {
      nationalId: data.nationalId,
      AND: {
        nationalId: {
          not: null,
        },
      },
    },
  });
  const res = existing
    ? await prisma.personalInformation.update({
        where: {
          id: existing.id,
        },
        data,
      })
    : await prisma.personalInformation.create({
        data,
      });

  return NextResponse.json(res);
}
