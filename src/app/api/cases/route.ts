import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  const res = await prisma.case.create({
    data,
  });

  return NextResponse.json(res);
}
