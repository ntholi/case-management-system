import prisma from '@/lib/prisma';
import { ModusOperandiLined } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional(),
  modusOperandi: z.string().optional(),
  modusOperandiDetails: z.string().optional(),
  modusOperandiLinked: z.nativeEnum(ModusOperandiLined).optional(),
  reportingPerson: z.object({
    name: z.string().optional(),
    idNo: z.string().optional(),
    phoneNumber: z.string().optional(),
    relationship: z.string().optional(),
  }),
  victimId: z.number().optional(),
  suspectId: z.number().optional(),
  weaponId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const data = schema.parse(await request.json());

  const res = await prisma.case.create({
    data: {
      rciNo: data.rciNo,
      obNo: data.obNo,
      occurrencePlace: data.occurrencePlace,
      modusOperandi: data.modusOperandi,
      modusOperandiDetails: data.modusOperandiDetails,
      modusOperandiLinked: data.modusOperandiLinked,
      reportingPerson: {
        create: data.reportingPerson,
      },
      victim: {
        connect: {
          id: data.victimId,
        },
      },
      suspect: {
        connect: {
          id: data.suspectId,
        },
      },
    },
  });

  return NextResponse.json(res);
}
