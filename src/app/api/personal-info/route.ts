import { NextApiRequest } from 'next';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest) {
  const { searchParams } = new URL(request.url || '');
  const nationalId = searchParams.get('nationalId') || '';

  const data = await prisma.personalInformation.findUnique({
    where: {
      nationalId: nationalId,
    },
  });

  return NextResponse.json(data);
}
