import { NextRequest, NextResponse } from 'next/server';
import { CaseSchema } from './CaseScheme';
import { createCase, getCase } from './service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url || '');
  const weapon = searchParams.get('weapon');
  const classification = searchParams.get('classification');
  const station = searchParams.get('station');
  const published = !(searchParams.get('published') === 'false');
  const dateRange = searchParams.get('date');

  const data = await getCase({
    weapon,
    classification,
    station,
    published,
    dateRange,
  });

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const data = CaseSchema.parse(await request.json());
  const criminalCase = await createCase(data);
  return NextResponse.json(criminalCase);
}
