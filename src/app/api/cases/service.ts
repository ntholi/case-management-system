import prisma from '@/lib/prisma';
import { z } from 'zod';
import { CaseSchema } from './CaseScheme';

type GetCaseType = {
  weapon?: string | null;
  classification?: string | null;
  station?: string | null;
  published: boolean;
};

type CaseSchemaType = z.infer<typeof CaseSchema>;

export async function createCase(data: CaseSchemaType) {
  const dateOfOccurrence = data.dateOfOccurrence
    ? new Date(data.dateOfOccurrence)
    : null;
  const dateOfReport = data.dateOfReport ? new Date(data.dateOfReport) : null;

  return await prisma.case.create({
    data: {
      rciNo: data.rciNo,
      obNo: data.obNo,
      occurrencePlace: data.occurrencePlace,
      modusOperandi: data.modusOperandi,
      modusOperandiDetails: data.modusOperandiDetails,
      modusOperandiLinked: data.modusOperandiLinked,
      dateOfOccurrence: dateOfOccurrence,
      dateOfReport: dateOfReport,
      suspectVictimRelationship: data.suspectVictimRelationship,
      disability: data.disability,
      whatHappened: data.whatHappened,
      damagedProperty: data.damagedProperty,
      caseStatus: {
        create: {
          policeCaseStatus: 'PENDING_ALLOCATION',
        },
      },
      weapons: {
        connect: data.weaponIds?.map((id) => ({ id })),
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
      victims: {
        connect: data?.victimIds?.map((id) => ({ id })),
      },
      suspects: {
        connect: data?.suspectIds?.map((id) => ({ id })),
      },
      policeStation: {
        connect: {
          id: data.policeStationId,
        },
      },
    },
  });
}

export async function updateCase(id: string, data: CaseSchemaType) {
  const dateOfOccurrence = data.dateOfOccurrence
    ? new Date(data.dateOfOccurrence)
    : null;
  const dateOfReport = data.dateOfReport ? new Date(data.dateOfReport) : null;

  return await prisma.case.update({
    where: {
      id,
    },
    data: {
      rciNo: data.rciNo,
      obNo: data.obNo,
      occurrencePlace: data.occurrencePlace,
      modusOperandi: data.modusOperandi,
      modusOperandiDetails: data.modusOperandiDetails,
      modusOperandiLinked: data.modusOperandiLinked,
      dateOfOccurrence: dateOfOccurrence,
      dateOfReport: dateOfReport,
      suspectVictimRelationship: data.suspectVictimRelationship,
      disability: data.disability,
      whatHappened: data.whatHappened,
      damagedProperty: data.damagedProperty,
      weapons: {
        connect: data.weaponIds?.map((id) => ({ id })),
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
      victims: {
        connect: data?.victimIds?.map((id) => ({ id })),
      },
      suspects: {
        connect: data?.suspectIds?.map((id) => ({ id })),
      },
      policeStation: {
        connect: {
          id: data.policeStationId,
        },
      },
    },
  });
}

export async function getCase(getCase: GetCaseType) {
  const { weapon, classification, station, published } = getCase;
  const data = await prisma.case.findMany({
    where: {
      published: published,
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
      victims: true,
      suspects: true,
      weapons: true,
      crimeClassifications: true,
      policeStation: true,
    },
  });

  return data;
}
