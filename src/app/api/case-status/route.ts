import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url || '');
  const rciNo = searchParams.get('rciNo');

  if (rciNo && rciNo !== 'null' && rciNo !== 'undefined') {
    const data = await prisma.caseStatus.findMany({
      where: {
        case: {
          rciNo: rciNo,
        },
      },
      include: {
        case: true,
      },
    });
    return NextResponse.json(data);
  }

  const data = await prisma.caseStatus.findMany({
    include: {
      case: true,
    },
  });
  return NextResponse.json(data);
}
