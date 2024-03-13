import prisma from '@/lib/prisma';
import { District, ModusOperandiLined } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url || '');
  const weapon = searchParams.get('weapon');
  const classification = searchParams.get('classification');
  const station = searchParams.get('station');

  const data = await prisma.case.findMany({
    where: {
      weapons: weapon
        ? {
            some: {
              name: weapon,
            },
          }
        : undefined,
      crimeClassifications: classification
        ? {
            some: {
              name: classification,
            },
          }
        : undefined,
      policeStationId: station ? station : undefined,
    },
    include: {
      reportingPerson: true,
      victim: true,
      suspect: true,
      weapons: true,
      crimeClassifications: true,
      policeStation: true,
    },
  });

  return NextResponse.json(data);
}

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
  crimeClassificationId: z.string().optional(),
  dateOfOccurrence: z.string().optional(),
  district: z.nativeEnum(District).optional(),
  policeStationId: z.string(),
  dateOfReport: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const data = schema.parse(await request.json());

  const dateOfOccurrence = data.dateOfOccurrence
    ? new Date(data.dateOfOccurrence)
    : null;
  const dateOfReport = data.dateOfReport ? new Date(data.dateOfReport) : null;

  const res = await prisma.case.create({
    data: {
      rciNo: data.rciNo,
      obNo: data.obNo,
      occurrencePlace: data.occurrencePlace,
      modusOperandi: data.modusOperandi,
      modusOperandiDetails: data.modusOperandiDetails,
      modusOperandiLinked: data.modusOperandiLinked,
      dateOfOccurrence: dateOfOccurrence,
      dateOfReport: dateOfReport,
      weapons: {
        connect: data.weaponId
          ? {
              id: data.weaponId,
            }
          : undefined,
      },
      crimeClassifications: {
        connect: data.crimeClassificationId
          ? {
              id: data.crimeClassificationId,
            }
          : undefined,
      },
      reportingPerson: {
        create: data.reportingPerson,
      },
      victim: data.victimId
        ? {
            connect: {
              id: data.victimId,
            },
          }
        : undefined,
      suspect: data.suspectId
        ? {
            connect: {
              id: data.suspectId,
            },
          }
        : undefined,
      policeStation: {
        connect: {
          id: data.policeStationId,
        },
      },
    },
  });

  revalidatePath('/cases');

  return NextResponse.json(res);
}
