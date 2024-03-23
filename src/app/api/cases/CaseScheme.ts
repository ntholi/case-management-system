import { z } from 'zod';
import { District, ModusOperandiLined } from '@prisma/client';

export const CaseSchema = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional(),
  modusOperandi: z.string().optional(),
  contributingFactor: z.string().optional(),
  modusOperandiLinked: z.nativeEnum(ModusOperandiLined).optional(),
  reportingPerson: z.object({
    name: z.string().optional(),
    idNo: z.string().optional(),
    phoneNumber: z.string().optional(),
    relationship: z.string().optional(),
  }),
  victimIds: z.array(z.string()).optional(),
  suspectIds: z.array(z.string()).optional(),
  weaponIds: z.array(z.string()).optional(),
  crimeClassificationId: z.string().optional(),
  dateOfOccurrence: z.string().optional(),
  district: z.nativeEnum(District).optional(),
  policeStationId: z.string(),
  dateOfReport: z.string().optional(),
  suspectVictimRelationship: z.string().optional(),
  disability: z.string().optional(),
  whatHappened: z.string().optional(),
  damagedProperty: z.string().optional(),
});
