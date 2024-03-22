import { NextRequest, NextResponse } from 'next/server';
import { CaseSchema } from '../CaseScheme';
import { updateCase } from '../service';

type Props = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const data = CaseSchema.parse(await request.json());
  const criminalCase = await updateCase(id, data);
  return NextResponse.json(criminalCase);
}
