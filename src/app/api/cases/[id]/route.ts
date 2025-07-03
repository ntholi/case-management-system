import { NextRequest, NextResponse } from 'next/server';
import { CaseSchema } from '../CaseScheme';
import { updateCase } from '../service';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: NextRequest, props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const data = CaseSchema.parse(await request.json());
  const criminalCase = await updateCase(id, data);
  return NextResponse.json(criminalCase);
}
