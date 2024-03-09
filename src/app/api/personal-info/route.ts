import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url || '');
  const nationalId = searchParams.get('nationalId') || '';

  const data = await prisma.personalInformation.findUnique({
    where: {
      nationalId: nationalId,
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const res = await prisma.personalInformation.create({
    data: { ...data },
  });

  return NextResponse.json(res);
}
