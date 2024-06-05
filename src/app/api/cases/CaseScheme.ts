import { z } from 'zod';
import { District, ModusOperandiLined } from '@prisma/client';

export const CaseSchema = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  contributingFactor: z.string().optional().nullable(),
  modusOperandiLinked: z.nativeEnum(ModusOperandiLined).optional().nullable(),
  reportingPerson: z.object({
    name: z.string().optional().nullable(),
    nationalId: z.string().optional().nullable(),
    phoneNumber: z.string().optional().nullable(),
    relationship: z.string().optional().nullable(),
  }),
  victimIds: z.array(z.string()).optional().nullable(),
  suspectIds: z.array(z.string()).optional().nullable(),
  weaponIds: z.array(z.string()).optional().nullable(),
  crimeClassificationIds: z.array(z.string()).optional().nullable(),
  dateOfOccurrence: z.string().optional().nullable(),
  district: z.nativeEnum(District).optional().nullable(),
  policeStationId: z.string(),
  dateOfReport: z.string().optional().nullable(),
  suspectVictimRelationship: z.string().optional().nullable(),
  disability: z.string().optional().nullable(),
  whatHappened: z.string().optional().nullable(),
  damagedProperty: z.string().optional().nullable(),
});
