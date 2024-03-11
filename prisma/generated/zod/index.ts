import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const WeaponScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const CrimeClassificationScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ReportingPersonScalarFieldEnumSchema = z.enum(['id','name','idNo','phoneNumber','relationship','createdAt','updatedAt']);

export const CaseScalarFieldEnumSchema = z.enum(['id','rciNo','obNo','occurrencePlace','modusOperandi','modusOperandiDetails','modusOperandiLinked','dateOfOccurrence','dateOfReport','createdAt','updatedAt','reportingPersonId','victimId','suspectId']);

export const PersonalInformationScalarFieldEnumSchema = z.enum(['id','nationalId','nationalIdType','surname','middleName','firstName','gender','phoneNumber','email','dateOfBirth','nationality','meritalStatus','occupation','education','placeOfBirth','areaChief','placeOfResidence','headMan','principalChief','district','nextOfKin','nextOfKinPhone','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const EducationSchema = z.enum(['NONE','PRIMARY','SECONDARY','TERTIARY','OTHER']);

export type EducationType = `${z.infer<typeof EducationSchema>}`

export const MeritalStatusSchema = z.enum(['SINGLE','MARRIED','DIVORCED','WIDOWED','OTHER']);

export type MeritalStatusType = `${z.infer<typeof MeritalStatusSchema>}`

export const NationalIdTypeSchema = z.enum(['ID_CARD','DRIVING_LICENSE','PASSPORT','VOTERS_CARD','OTHER','NONE']);

export type NationalIdTypeType = `${z.infer<typeof NationalIdTypeSchema>}`

export const GenderSchema = z.enum(['MALE','FEAMLE','OTHER']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const ModusOperandiLinedSchema = z.enum(['YES','NO','UNKNOWN']);

export type ModusOperandiLinedType = `${z.infer<typeof ModusOperandiLinedSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// WEAPON SCHEMA
/////////////////////////////////////////

export const WeaponSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Weapon = z.infer<typeof WeaponSchema>

/////////////////////////////////////////
// CRIME CLASSIFICATION SCHEMA
/////////////////////////////////////////

export const CrimeClassificationSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CrimeClassification = z.infer<typeof CrimeClassificationSchema>

/////////////////////////////////////////
// REPORTING PERSON SCHEMA
/////////////////////////////////////////

export const ReportingPersonSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  idNo: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  relationship: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ReportingPerson = z.infer<typeof ReportingPersonSchema>

/////////////////////////////////////////
// CASE SCHEMA
/////////////////////////////////////////

export const CaseSchema = z.object({
  modusOperandiLinked: ModusOperandiLinedSchema.nullable(),
  id: z.number().int(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().nullable(),
  modusOperandi: z.string().nullable(),
  modusOperandiDetails: z.string().nullable(),
  dateOfOccurrence: z.coerce.date().nullable(),
  dateOfReport: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  reportingPersonId: z.number().int(),
  victimId: z.number().int(),
  suspectId: z.number().int(),
})

export type Case = z.infer<typeof CaseSchema>

/////////////////////////////////////////
// PERSONAL INFORMATION SCHEMA
/////////////////////////////////////////

export const PersonalInformationSchema = z.object({
  nationalIdType: NationalIdTypeSchema.nullable(),
  gender: GenderSchema.nullable(),
  meritalStatus: MeritalStatusSchema.nullable(),
  education: EducationSchema.nullable(),
  id: z.number().int(),
  nationalId: z.string(),
  surname: z.string().nullable(),
  middleName: z.string().nullable(),
  firstName: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(),
  dateOfBirth: z.coerce.date().nullable(),
  nationality: z.string().nullable(),
  occupation: z.string().nullable(),
  placeOfBirth: z.string().nullable(),
  areaChief: z.string().nullable(),
  placeOfResidence: z.string().nullable(),
  headMan: z.string().nullable(),
  principalChief: z.string().nullable(),
  district: z.string().nullable(),
  nextOfKin: z.string().nullable(),
  nextOfKinPhone: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PersonalInformation = z.infer<typeof PersonalInformationSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// WEAPON
//------------------------------------------------------

export const WeaponIncludeSchema: z.ZodType<Prisma.WeaponInclude> = z.object({
  cases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WeaponCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WeaponArgsSchema: z.ZodType<Prisma.WeaponDefaultArgs> = z.object({
  select: z.lazy(() => WeaponSelectSchema).optional(),
  include: z.lazy(() => WeaponIncludeSchema).optional(),
}).strict();

export const WeaponCountOutputTypeArgsSchema: z.ZodType<Prisma.WeaponCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WeaponCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WeaponCountOutputTypeSelectSchema: z.ZodType<Prisma.WeaponCountOutputTypeSelect> = z.object({
  cases: z.boolean().optional(),
}).strict();

export const WeaponSelectSchema: z.ZodType<Prisma.WeaponSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  cases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WeaponCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CRIME CLASSIFICATION
//------------------------------------------------------

export const CrimeClassificationIncludeSchema: z.ZodType<Prisma.CrimeClassificationInclude> = z.object({
  cases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CrimeClassificationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CrimeClassificationArgsSchema: z.ZodType<Prisma.CrimeClassificationDefaultArgs> = z.object({
  select: z.lazy(() => CrimeClassificationSelectSchema).optional(),
  include: z.lazy(() => CrimeClassificationIncludeSchema).optional(),
}).strict();

export const CrimeClassificationCountOutputTypeArgsSchema: z.ZodType<Prisma.CrimeClassificationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CrimeClassificationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CrimeClassificationCountOutputTypeSelectSchema: z.ZodType<Prisma.CrimeClassificationCountOutputTypeSelect> = z.object({
  cases: z.boolean().optional(),
}).strict();

export const CrimeClassificationSelectSchema: z.ZodType<Prisma.CrimeClassificationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  cases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CrimeClassificationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORTING PERSON
//------------------------------------------------------

export const ReportingPersonIncludeSchema: z.ZodType<Prisma.ReportingPersonInclude> = z.object({
  Case: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReportingPersonCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ReportingPersonArgsSchema: z.ZodType<Prisma.ReportingPersonDefaultArgs> = z.object({
  select: z.lazy(() => ReportingPersonSelectSchema).optional(),
  include: z.lazy(() => ReportingPersonIncludeSchema).optional(),
}).strict();

export const ReportingPersonCountOutputTypeArgsSchema: z.ZodType<Prisma.ReportingPersonCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ReportingPersonCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ReportingPersonCountOutputTypeSelectSchema: z.ZodType<Prisma.ReportingPersonCountOutputTypeSelect> = z.object({
  Case: z.boolean().optional(),
}).strict();

export const ReportingPersonSelectSchema: z.ZodType<Prisma.ReportingPersonSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  idNo: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  relationship: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Case: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReportingPersonCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CASE
//------------------------------------------------------

export const CaseIncludeSchema: z.ZodType<Prisma.CaseInclude> = z.object({
  weapons: z.union([z.boolean(),z.lazy(() => WeaponFindManyArgsSchema)]).optional(),
  crimeClassifications: z.union([z.boolean(),z.lazy(() => CrimeClassificationFindManyArgsSchema)]).optional(),
  reportingPerson: z.union([z.boolean(),z.lazy(() => ReportingPersonArgsSchema)]).optional(),
  victim: z.union([z.boolean(),z.lazy(() => PersonalInformationArgsSchema)]).optional(),
  suspect: z.union([z.boolean(),z.lazy(() => PersonalInformationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CaseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CaseArgsSchema: z.ZodType<Prisma.CaseDefaultArgs> = z.object({
  select: z.lazy(() => CaseSelectSchema).optional(),
  include: z.lazy(() => CaseIncludeSchema).optional(),
}).strict();

export const CaseCountOutputTypeArgsSchema: z.ZodType<Prisma.CaseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CaseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CaseCountOutputTypeSelectSchema: z.ZodType<Prisma.CaseCountOutputTypeSelect> = z.object({
  weapons: z.boolean().optional(),
  crimeClassifications: z.boolean().optional(),
}).strict();

export const CaseSelectSchema: z.ZodType<Prisma.CaseSelect> = z.object({
  id: z.boolean().optional(),
  rciNo: z.boolean().optional(),
  obNo: z.boolean().optional(),
  occurrencePlace: z.boolean().optional(),
  modusOperandi: z.boolean().optional(),
  modusOperandiDetails: z.boolean().optional(),
  modusOperandiLinked: z.boolean().optional(),
  dateOfOccurrence: z.boolean().optional(),
  dateOfReport: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  reportingPersonId: z.boolean().optional(),
  victimId: z.boolean().optional(),
  suspectId: z.boolean().optional(),
  weapons: z.union([z.boolean(),z.lazy(() => WeaponFindManyArgsSchema)]).optional(),
  crimeClassifications: z.union([z.boolean(),z.lazy(() => CrimeClassificationFindManyArgsSchema)]).optional(),
  reportingPerson: z.union([z.boolean(),z.lazy(() => ReportingPersonArgsSchema)]).optional(),
  victim: z.union([z.boolean(),z.lazy(() => PersonalInformationArgsSchema)]).optional(),
  suspect: z.union([z.boolean(),z.lazy(() => PersonalInformationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CaseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERSONAL INFORMATION
//------------------------------------------------------

export const PersonalInformationIncludeSchema: z.ZodType<Prisma.PersonalInformationInclude> = z.object({
  victimCases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  suspectCases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PersonalInformationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PersonalInformationArgsSchema: z.ZodType<Prisma.PersonalInformationDefaultArgs> = z.object({
  select: z.lazy(() => PersonalInformationSelectSchema).optional(),
  include: z.lazy(() => PersonalInformationIncludeSchema).optional(),
}).strict();

export const PersonalInformationCountOutputTypeArgsSchema: z.ZodType<Prisma.PersonalInformationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PersonalInformationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PersonalInformationCountOutputTypeSelectSchema: z.ZodType<Prisma.PersonalInformationCountOutputTypeSelect> = z.object({
  victimCases: z.boolean().optional(),
  suspectCases: z.boolean().optional(),
}).strict();

export const PersonalInformationSelectSchema: z.ZodType<Prisma.PersonalInformationSelect> = z.object({
  id: z.boolean().optional(),
  nationalId: z.boolean().optional(),
  nationalIdType: z.boolean().optional(),
  surname: z.boolean().optional(),
  middleName: z.boolean().optional(),
  firstName: z.boolean().optional(),
  gender: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  email: z.boolean().optional(),
  dateOfBirth: z.boolean().optional(),
  nationality: z.boolean().optional(),
  meritalStatus: z.boolean().optional(),
  occupation: z.boolean().optional(),
  education: z.boolean().optional(),
  placeOfBirth: z.boolean().optional(),
  areaChief: z.boolean().optional(),
  placeOfResidence: z.boolean().optional(),
  headMan: z.boolean().optional(),
  principalChief: z.boolean().optional(),
  district: z.boolean().optional(),
  nextOfKin: z.boolean().optional(),
  nextOfKinPhone: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  victimCases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  suspectCases: z.union([z.boolean(),z.lazy(() => CaseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PersonalInformationCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const WeaponWhereInputSchema: z.ZodType<Prisma.WeaponWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WeaponWhereInputSchema),z.lazy(() => WeaponWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeaponWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeaponWhereInputSchema),z.lazy(() => WeaponWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict();

export const WeaponOrderByWithRelationInputSchema: z.ZodType<Prisma.WeaponOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const WeaponWhereUniqueInputSchema: z.ZodType<Prisma.WeaponWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WeaponWhereInputSchema),z.lazy(() => WeaponWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeaponWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeaponWhereInputSchema),z.lazy(() => WeaponWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict());

export const WeaponOrderByWithAggregationInputSchema: z.ZodType<Prisma.WeaponOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WeaponCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WeaponMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WeaponMinOrderByAggregateInputSchema).optional()
}).strict();

export const WeaponScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WeaponScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WeaponScalarWhereWithAggregatesInputSchema),z.lazy(() => WeaponScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeaponScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeaponScalarWhereWithAggregatesInputSchema),z.lazy(() => WeaponScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CrimeClassificationWhereInputSchema: z.ZodType<Prisma.CrimeClassificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CrimeClassificationWhereInputSchema),z.lazy(() => CrimeClassificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrimeClassificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrimeClassificationWhereInputSchema),z.lazy(() => CrimeClassificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict();

export const CrimeClassificationOrderByWithRelationInputSchema: z.ZodType<Prisma.CrimeClassificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CrimeClassificationWhereUniqueInputSchema: z.ZodType<Prisma.CrimeClassificationWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CrimeClassificationWhereInputSchema),z.lazy(() => CrimeClassificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrimeClassificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrimeClassificationWhereInputSchema),z.lazy(() => CrimeClassificationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  cases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict());

export const CrimeClassificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.CrimeClassificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CrimeClassificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CrimeClassificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CrimeClassificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const CrimeClassificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CrimeClassificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CrimeClassificationScalarWhereWithAggregatesInputSchema),z.lazy(() => CrimeClassificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrimeClassificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrimeClassificationScalarWhereWithAggregatesInputSchema),z.lazy(() => CrimeClassificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportingPersonWhereInputSchema: z.ZodType<Prisma.ReportingPersonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportingPersonWhereInputSchema),z.lazy(() => ReportingPersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportingPersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportingPersonWhereInputSchema),z.lazy(() => ReportingPersonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idNo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Case: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict();

export const ReportingPersonOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportingPersonOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idNo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Case: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ReportingPersonWhereUniqueInputSchema: z.ZodType<Prisma.ReportingPersonWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ReportingPersonWhereInputSchema),z.lazy(() => ReportingPersonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportingPersonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportingPersonWhereInputSchema),z.lazy(() => ReportingPersonWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idNo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Case: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict());

export const ReportingPersonOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportingPersonOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idNo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  relationship: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportingPersonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReportingPersonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportingPersonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportingPersonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReportingPersonSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReportingPersonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportingPersonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportingPersonScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportingPersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportingPersonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportingPersonScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportingPersonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  idNo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  relationship: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CaseWhereInputSchema: z.ZodType<Prisma.CaseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rciNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  obNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  occurrencePlace: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandi: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => EnumModusOperandiLinedNullableFilterSchema),z.lazy(() => ModusOperandiLinedSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dateOfReport: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reportingPersonId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  victimId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  suspectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  weapons: z.lazy(() => WeaponListRelationFilterSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationListRelationFilterSchema).optional(),
  reportingPerson: z.union([ z.lazy(() => ReportingPersonRelationFilterSchema),z.lazy(() => ReportingPersonWhereInputSchema) ]).optional(),
  victim: z.union([ z.lazy(() => PersonalInformationNullableRelationFilterSchema),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional().nullable(),
  suspect: z.union([ z.lazy(() => PersonalInformationNullableRelationFilterSchema),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional().nullable(),
}).strict();

export const CaseOrderByWithRelationInputSchema: z.ZodType<Prisma.CaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rciNo: z.lazy(() => SortOrderSchema).optional(),
  obNo: z.lazy(() => SortOrderSchema).optional(),
  occurrencePlace: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  modusOperandi: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  modusOperandiDetails: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  modusOperandiLinked: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateOfOccurrence: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateOfReport: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  reportingPersonId: z.lazy(() => SortOrderSchema).optional(),
  victimId: z.lazy(() => SortOrderSchema).optional(),
  suspectId: z.lazy(() => SortOrderSchema).optional(),
  weapons: z.lazy(() => WeaponOrderByRelationAggregateInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationOrderByRelationAggregateInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonOrderByWithRelationInputSchema).optional(),
  victim: z.lazy(() => PersonalInformationOrderByWithRelationInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationOrderByWithRelationInputSchema).optional()
}).strict();

export const CaseWhereUniqueInputSchema: z.ZodType<Prisma.CaseWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseWhereInputSchema),z.lazy(() => CaseWhereInputSchema).array() ]).optional(),
  rciNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  obNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  occurrencePlace: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandi: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => EnumModusOperandiLinedNullableFilterSchema),z.lazy(() => ModusOperandiLinedSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dateOfReport: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reportingPersonId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  victimId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  suspectId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  weapons: z.lazy(() => WeaponListRelationFilterSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationListRelationFilterSchema).optional(),
  reportingPerson: z.union([ z.lazy(() => ReportingPersonRelationFilterSchema),z.lazy(() => ReportingPersonWhereInputSchema) ]).optional(),
  victim: z.union([ z.lazy(() => PersonalInformationNullableRelationFilterSchema),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional().nullable(),
  suspect: z.union([ z.lazy(() => PersonalInformationNullableRelationFilterSchema),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional().nullable(),
}).strict());

export const CaseOrderByWithAggregationInputSchema: z.ZodType<Prisma.CaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rciNo: z.lazy(() => SortOrderSchema).optional(),
  obNo: z.lazy(() => SortOrderSchema).optional(),
  occurrencePlace: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  modusOperandi: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  modusOperandiDetails: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  modusOperandiLinked: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateOfOccurrence: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateOfReport: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  reportingPersonId: z.lazy(() => SortOrderSchema).optional(),
  victimId: z.lazy(() => SortOrderSchema).optional(),
  suspectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CaseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CaseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CaseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CaseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CaseSumOrderByAggregateInputSchema).optional()
}).strict();

export const CaseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CaseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CaseScalarWhereWithAggregatesInputSchema),z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseScalarWhereWithAggregatesInputSchema),z.lazy(() => CaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  rciNo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  obNo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  occurrencePlace: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  modusOperandi: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => EnumModusOperandiLinedNullableWithAggregatesFilterSchema),z.lazy(() => ModusOperandiLinedSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  dateOfReport: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  reportingPersonId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  victimId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  suspectId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PersonalInformationWhereInputSchema: z.ZodType<Prisma.PersonalInformationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PersonalInformationWhereInputSchema),z.lazy(() => PersonalInformationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PersonalInformationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PersonalInformationWhereInputSchema),z.lazy(() => PersonalInformationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  nationalId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nationalIdType: z.union([ z.lazy(() => EnumNationalIdTypeNullableFilterSchema),z.lazy(() => NationalIdTypeSchema) ]).optional().nullable(),
  surname: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  middleName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderNullableFilterSchema),z.lazy(() => GenderSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateOfBirth: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  nationality: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => EnumMeritalStatusNullableFilterSchema),z.lazy(() => MeritalStatusSchema) ]).optional().nullable(),
  occupation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  education: z.union([ z.lazy(() => EnumEducationNullableFilterSchema),z.lazy(() => EducationSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  areaChief: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  placeOfResidence: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  headMan: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  principalChief: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  district: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nextOfKin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  victimCases: z.lazy(() => CaseListRelationFilterSchema).optional(),
  suspectCases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict();

export const PersonalInformationOrderByWithRelationInputSchema: z.ZodType<Prisma.PersonalInformationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nationalId: z.lazy(() => SortOrderSchema).optional(),
  nationalIdType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  surname: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  middleName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateOfBirth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meritalStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  occupation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  education: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeOfBirth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  areaChief: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeOfResidence: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  headMan: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  principalChief: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  district: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextOfKin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextOfKinPhone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  victimCases: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional(),
  suspectCases: z.lazy(() => CaseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PersonalInformationWhereUniqueInputSchema: z.ZodType<Prisma.PersonalInformationWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    nationalId: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    nationalId: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  nationalId: z.string().optional(),
  AND: z.union([ z.lazy(() => PersonalInformationWhereInputSchema),z.lazy(() => PersonalInformationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PersonalInformationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PersonalInformationWhereInputSchema),z.lazy(() => PersonalInformationWhereInputSchema).array() ]).optional(),
  nationalIdType: z.union([ z.lazy(() => EnumNationalIdTypeNullableFilterSchema),z.lazy(() => NationalIdTypeSchema) ]).optional().nullable(),
  surname: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  middleName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderNullableFilterSchema),z.lazy(() => GenderSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  dateOfBirth: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  nationality: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => EnumMeritalStatusNullableFilterSchema),z.lazy(() => MeritalStatusSchema) ]).optional().nullable(),
  occupation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  education: z.union([ z.lazy(() => EnumEducationNullableFilterSchema),z.lazy(() => EducationSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  areaChief: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  placeOfResidence: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  headMan: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  principalChief: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  district: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nextOfKin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  victimCases: z.lazy(() => CaseListRelationFilterSchema).optional(),
  suspectCases: z.lazy(() => CaseListRelationFilterSchema).optional()
}).strict());

export const PersonalInformationOrderByWithAggregationInputSchema: z.ZodType<Prisma.PersonalInformationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nationalId: z.lazy(() => SortOrderSchema).optional(),
  nationalIdType: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  surname: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  middleName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  dateOfBirth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nationality: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meritalStatus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  occupation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  education: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeOfBirth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  areaChief: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeOfResidence: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  headMan: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  principalChief: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  district: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextOfKin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextOfKinPhone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PersonalInformationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PersonalInformationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PersonalInformationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PersonalInformationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PersonalInformationSumOrderByAggregateInputSchema).optional()
}).strict();

export const PersonalInformationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PersonalInformationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PersonalInformationScalarWhereWithAggregatesInputSchema),z.lazy(() => PersonalInformationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PersonalInformationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PersonalInformationScalarWhereWithAggregatesInputSchema),z.lazy(() => PersonalInformationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  nationalId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nationalIdType: z.union([ z.lazy(() => EnumNationalIdTypeNullableWithAggregatesFilterSchema),z.lazy(() => NationalIdTypeSchema) ]).optional().nullable(),
  surname: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  middleName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  firstName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => EnumGenderNullableWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  dateOfBirth: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  nationality: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => EnumMeritalStatusNullableWithAggregatesFilterSchema),z.lazy(() => MeritalStatusSchema) ]).optional().nullable(),
  occupation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  education: z.union([ z.lazy(() => EnumEducationNullableWithAggregatesFilterSchema),z.lazy(() => EducationSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  areaChief: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  placeOfResidence: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  headMan: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  principalChief: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  district: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nextOfKin: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WeaponCreateInputSchema: z.ZodType<Prisma.WeaponCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutWeaponsInputSchema).optional()
}).strict();

export const WeaponUncheckedCreateInputSchema: z.ZodType<Prisma.WeaponUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutWeaponsInputSchema).optional()
}).strict();

export const WeaponUpdateInputSchema: z.ZodType<Prisma.WeaponUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutWeaponsNestedInputSchema).optional()
}).strict();

export const WeaponUncheckedUpdateInputSchema: z.ZodType<Prisma.WeaponUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutWeaponsNestedInputSchema).optional()
}).strict();

export const WeaponCreateManyInputSchema: z.ZodType<Prisma.WeaponCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WeaponUpdateManyMutationInputSchema: z.ZodType<Prisma.WeaponUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeaponUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WeaponUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CrimeClassificationCreateInputSchema: z.ZodType<Prisma.CrimeClassificationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutCrimeClassificationsInputSchema).optional()
}).strict();

export const CrimeClassificationUncheckedCreateInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCrimeClassificationsInputSchema).optional()
}).strict();

export const CrimeClassificationUpdateInputSchema: z.ZodType<Prisma.CrimeClassificationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cases: z.lazy(() => CaseUpdateManyWithoutCrimeClassificationsNestedInputSchema).optional()
}).strict();

export const CrimeClassificationUncheckedUpdateInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutCrimeClassificationsNestedInputSchema).optional()
}).strict();

export const CrimeClassificationCreateManyInputSchema: z.ZodType<Prisma.CrimeClassificationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CrimeClassificationUpdateManyMutationInputSchema: z.ZodType<Prisma.CrimeClassificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CrimeClassificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportingPersonCreateInputSchema: z.ZodType<Prisma.ReportingPersonCreateInput> = z.object({
  name: z.string().optional().nullable(),
  idNo: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  relationship: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Case: z.lazy(() => CaseCreateNestedManyWithoutReportingPersonInputSchema).optional()
}).strict();

export const ReportingPersonUncheckedCreateInputSchema: z.ZodType<Prisma.ReportingPersonUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  idNo: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  relationship: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Case: z.lazy(() => CaseUncheckedCreateNestedManyWithoutReportingPersonInputSchema).optional()
}).strict();

export const ReportingPersonUpdateInputSchema: z.ZodType<Prisma.ReportingPersonUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Case: z.lazy(() => CaseUpdateManyWithoutReportingPersonNestedInputSchema).optional()
}).strict();

export const ReportingPersonUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportingPersonUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Case: z.lazy(() => CaseUncheckedUpdateManyWithoutReportingPersonNestedInputSchema).optional()
}).strict();

export const ReportingPersonCreateManyInputSchema: z.ZodType<Prisma.ReportingPersonCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  idNo: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  relationship: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportingPersonUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportingPersonUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportingPersonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportingPersonUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseCreateInputSchema: z.ZodType<Prisma.CaseCreateInput> = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  weapons: z.lazy(() => WeaponCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationCreateNestedManyWithoutCasesInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonCreateNestedOneWithoutCaseInputSchema),
  victim: z.lazy(() => PersonalInformationCreateNestedOneWithoutVictimCasesInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationCreateNestedOneWithoutSuspectCasesInputSchema).optional()
}).strict();

export const CaseUncheckedCreateInputSchema: z.ZodType<Prisma.CaseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  victimId: z.number().int(),
  suspectId: z.number().int(),
  weapons: z.lazy(() => WeaponUncheckedCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedCreateNestedManyWithoutCasesInputSchema).optional()
}).strict();

export const CaseUpdateInputSchema: z.ZodType<Prisma.CaseUpdateInput> = z.object({
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUpdateManyWithoutCasesNestedInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonUpdateOneRequiredWithoutCaseNestedInputSchema).optional(),
  victim: z.lazy(() => PersonalInformationUpdateOneWithoutVictimCasesNestedInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationUpdateOneWithoutSuspectCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUncheckedUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedUpdateManyWithoutCasesNestedInputSchema).optional()
}).strict();

export const CaseCreateManyInputSchema: z.ZodType<Prisma.CaseCreateManyInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  victimId: z.number().int(),
  suspectId: z.number().int()
}).strict();

export const CaseUpdateManyMutationInputSchema: z.ZodType<Prisma.CaseUpdateManyMutationInput> = z.object({
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PersonalInformationCreateInputSchema: z.ZodType<Prisma.PersonalInformationCreateInput> = z.object({
  nationalId: z.string(),
  nationalIdType: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  surname: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  nationality: z.string().optional().nullable(),
  meritalStatus: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  occupation: z.string().optional().nullable(),
  education: z.lazy(() => EducationSchema).optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  areaChief: z.string().optional().nullable(),
  placeOfResidence: z.string().optional().nullable(),
  headMan: z.string().optional().nullable(),
  principalChief: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  nextOfKinPhone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  victimCases: z.lazy(() => CaseCreateNestedManyWithoutVictimInputSchema).optional(),
  suspectCases: z.lazy(() => CaseCreateNestedManyWithoutSuspectInputSchema).optional()
}).strict();

export const PersonalInformationUncheckedCreateInputSchema: z.ZodType<Prisma.PersonalInformationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  nationalId: z.string(),
  nationalIdType: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  surname: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  nationality: z.string().optional().nullable(),
  meritalStatus: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  occupation: z.string().optional().nullable(),
  education: z.lazy(() => EducationSchema).optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  areaChief: z.string().optional().nullable(),
  placeOfResidence: z.string().optional().nullable(),
  headMan: z.string().optional().nullable(),
  principalChief: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  nextOfKinPhone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  victimCases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutVictimInputSchema).optional(),
  suspectCases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutSuspectInputSchema).optional()
}).strict();

export const PersonalInformationUpdateInputSchema: z.ZodType<Prisma.PersonalInformationUpdateInput> = z.object({
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  victimCases: z.lazy(() => CaseUpdateManyWithoutVictimNestedInputSchema).optional(),
  suspectCases: z.lazy(() => CaseUpdateManyWithoutSuspectNestedInputSchema).optional()
}).strict();

export const PersonalInformationUncheckedUpdateInputSchema: z.ZodType<Prisma.PersonalInformationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  victimCases: z.lazy(() => CaseUncheckedUpdateManyWithoutVictimNestedInputSchema).optional(),
  suspectCases: z.lazy(() => CaseUncheckedUpdateManyWithoutSuspectNestedInputSchema).optional()
}).strict();

export const PersonalInformationCreateManyInputSchema: z.ZodType<Prisma.PersonalInformationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  nationalId: z.string(),
  nationalIdType: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  surname: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  nationality: z.string().optional().nullable(),
  meritalStatus: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  occupation: z.string().optional().nullable(),
  education: z.lazy(() => EducationSchema).optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  areaChief: z.string().optional().nullable(),
  placeOfResidence: z.string().optional().nullable(),
  headMan: z.string().optional().nullable(),
  principalChief: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  nextOfKinPhone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PersonalInformationUpdateManyMutationInputSchema: z.ZodType<Prisma.PersonalInformationUpdateManyMutationInput> = z.object({
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PersonalInformationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PersonalInformationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const CaseListRelationFilterSchema: z.ZodType<Prisma.CaseListRelationFilter> = z.object({
  every: z.lazy(() => CaseWhereInputSchema).optional(),
  some: z.lazy(() => CaseWhereInputSchema).optional(),
  none: z.lazy(() => CaseWhereInputSchema).optional()
}).strict();

export const CaseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CaseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeaponCountOrderByAggregateInputSchema: z.ZodType<Prisma.WeaponCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeaponMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WeaponMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WeaponMinOrderByAggregateInputSchema: z.ZodType<Prisma.WeaponMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const CrimeClassificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.CrimeClassificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CrimeClassificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CrimeClassificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CrimeClassificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.CrimeClassificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ReportingPersonCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportingPersonCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  idNo: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportingPersonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReportingPersonAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportingPersonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportingPersonMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  idNo: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportingPersonMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportingPersonMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  idNo: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  relationship: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportingPersonSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReportingPersonSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumModusOperandiLinedNullableFilterSchema: z.ZodType<Prisma.EnumModusOperandiLinedNullableFilter> = z.object({
  equals: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  in: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  notIn: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NestedEnumModusOperandiLinedNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const WeaponListRelationFilterSchema: z.ZodType<Prisma.WeaponListRelationFilter> = z.object({
  every: z.lazy(() => WeaponWhereInputSchema).optional(),
  some: z.lazy(() => WeaponWhereInputSchema).optional(),
  none: z.lazy(() => WeaponWhereInputSchema).optional()
}).strict();

export const CrimeClassificationListRelationFilterSchema: z.ZodType<Prisma.CrimeClassificationListRelationFilter> = z.object({
  every: z.lazy(() => CrimeClassificationWhereInputSchema).optional(),
  some: z.lazy(() => CrimeClassificationWhereInputSchema).optional(),
  none: z.lazy(() => CrimeClassificationWhereInputSchema).optional()
}).strict();

export const ReportingPersonRelationFilterSchema: z.ZodType<Prisma.ReportingPersonRelationFilter> = z.object({
  is: z.lazy(() => ReportingPersonWhereInputSchema).optional(),
  isNot: z.lazy(() => ReportingPersonWhereInputSchema).optional()
}).strict();

export const PersonalInformationNullableRelationFilterSchema: z.ZodType<Prisma.PersonalInformationNullableRelationFilter> = z.object({
  is: z.lazy(() => PersonalInformationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PersonalInformationWhereInputSchema).optional().nullable()
}).strict();

export const WeaponOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WeaponOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CrimeClassificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CrimeClassificationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseCountOrderByAggregateInputSchema: z.ZodType<Prisma.CaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rciNo: z.lazy(() => SortOrderSchema).optional(),
  obNo: z.lazy(() => SortOrderSchema).optional(),
  occurrencePlace: z.lazy(() => SortOrderSchema).optional(),
  modusOperandi: z.lazy(() => SortOrderSchema).optional(),
  modusOperandiDetails: z.lazy(() => SortOrderSchema).optional(),
  modusOperandiLinked: z.lazy(() => SortOrderSchema).optional(),
  dateOfOccurrence: z.lazy(() => SortOrderSchema).optional(),
  dateOfReport: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  reportingPersonId: z.lazy(() => SortOrderSchema).optional(),
  victimId: z.lazy(() => SortOrderSchema).optional(),
  suspectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CaseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportingPersonId: z.lazy(() => SortOrderSchema).optional(),
  victimId: z.lazy(() => SortOrderSchema).optional(),
  suspectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rciNo: z.lazy(() => SortOrderSchema).optional(),
  obNo: z.lazy(() => SortOrderSchema).optional(),
  occurrencePlace: z.lazy(() => SortOrderSchema).optional(),
  modusOperandi: z.lazy(() => SortOrderSchema).optional(),
  modusOperandiDetails: z.lazy(() => SortOrderSchema).optional(),
  modusOperandiLinked: z.lazy(() => SortOrderSchema).optional(),
  dateOfOccurrence: z.lazy(() => SortOrderSchema).optional(),
  dateOfReport: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  reportingPersonId: z.lazy(() => SortOrderSchema).optional(),
  victimId: z.lazy(() => SortOrderSchema).optional(),
  suspectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseMinOrderByAggregateInputSchema: z.ZodType<Prisma.CaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rciNo: z.lazy(() => SortOrderSchema).optional(),
  obNo: z.lazy(() => SortOrderSchema).optional(),
  occurrencePlace: z.lazy(() => SortOrderSchema).optional(),
  modusOperandi: z.lazy(() => SortOrderSchema).optional(),
  modusOperandiDetails: z.lazy(() => SortOrderSchema).optional(),
  modusOperandiLinked: z.lazy(() => SortOrderSchema).optional(),
  dateOfOccurrence: z.lazy(() => SortOrderSchema).optional(),
  dateOfReport: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  reportingPersonId: z.lazy(() => SortOrderSchema).optional(),
  victimId: z.lazy(() => SortOrderSchema).optional(),
  suspectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CaseSumOrderByAggregateInputSchema: z.ZodType<Prisma.CaseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportingPersonId: z.lazy(() => SortOrderSchema).optional(),
  victimId: z.lazy(() => SortOrderSchema).optional(),
  suspectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumModusOperandiLinedNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumModusOperandiLinedNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  in: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  notIn: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NestedEnumModusOperandiLinedNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumModusOperandiLinedNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumModusOperandiLinedNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumNationalIdTypeNullableFilterSchema: z.ZodType<Prisma.EnumNationalIdTypeNullableFilter> = z.object({
  equals: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  in: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NestedEnumNationalIdTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumGenderNullableFilterSchema: z.ZodType<Prisma.EnumGenderNullableFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumMeritalStatusNullableFilterSchema: z.ZodType<Prisma.EnumMeritalStatusNullableFilter> = z.object({
  equals: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  in: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NestedEnumMeritalStatusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumEducationNullableFilterSchema: z.ZodType<Prisma.EnumEducationNullableFilter> = z.object({
  equals: z.lazy(() => EducationSchema).optional().nullable(),
  in: z.lazy(() => EducationSchema).array().optional().nullable(),
  notIn: z.lazy(() => EducationSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NestedEnumEducationNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PersonalInformationCountOrderByAggregateInputSchema: z.ZodType<Prisma.PersonalInformationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nationalId: z.lazy(() => SortOrderSchema).optional(),
  nationalIdType: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  middleName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  dateOfBirth: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  meritalStatus: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.lazy(() => SortOrderSchema).optional(),
  education: z.lazy(() => SortOrderSchema).optional(),
  placeOfBirth: z.lazy(() => SortOrderSchema).optional(),
  areaChief: z.lazy(() => SortOrderSchema).optional(),
  placeOfResidence: z.lazy(() => SortOrderSchema).optional(),
  headMan: z.lazy(() => SortOrderSchema).optional(),
  principalChief: z.lazy(() => SortOrderSchema).optional(),
  district: z.lazy(() => SortOrderSchema).optional(),
  nextOfKin: z.lazy(() => SortOrderSchema).optional(),
  nextOfKinPhone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonalInformationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PersonalInformationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonalInformationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PersonalInformationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nationalId: z.lazy(() => SortOrderSchema).optional(),
  nationalIdType: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  middleName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  dateOfBirth: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  meritalStatus: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.lazy(() => SortOrderSchema).optional(),
  education: z.lazy(() => SortOrderSchema).optional(),
  placeOfBirth: z.lazy(() => SortOrderSchema).optional(),
  areaChief: z.lazy(() => SortOrderSchema).optional(),
  placeOfResidence: z.lazy(() => SortOrderSchema).optional(),
  headMan: z.lazy(() => SortOrderSchema).optional(),
  principalChief: z.lazy(() => SortOrderSchema).optional(),
  district: z.lazy(() => SortOrderSchema).optional(),
  nextOfKin: z.lazy(() => SortOrderSchema).optional(),
  nextOfKinPhone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonalInformationMinOrderByAggregateInputSchema: z.ZodType<Prisma.PersonalInformationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nationalId: z.lazy(() => SortOrderSchema).optional(),
  nationalIdType: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  middleName: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  dateOfBirth: z.lazy(() => SortOrderSchema).optional(),
  nationality: z.lazy(() => SortOrderSchema).optional(),
  meritalStatus: z.lazy(() => SortOrderSchema).optional(),
  occupation: z.lazy(() => SortOrderSchema).optional(),
  education: z.lazy(() => SortOrderSchema).optional(),
  placeOfBirth: z.lazy(() => SortOrderSchema).optional(),
  areaChief: z.lazy(() => SortOrderSchema).optional(),
  placeOfResidence: z.lazy(() => SortOrderSchema).optional(),
  headMan: z.lazy(() => SortOrderSchema).optional(),
  principalChief: z.lazy(() => SortOrderSchema).optional(),
  district: z.lazy(() => SortOrderSchema).optional(),
  nextOfKin: z.lazy(() => SortOrderSchema).optional(),
  nextOfKinPhone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PersonalInformationSumOrderByAggregateInputSchema: z.ZodType<Prisma.PersonalInformationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumNationalIdTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNationalIdTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  in: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NestedEnumNationalIdTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNationalIdTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNationalIdTypeNullableFilterSchema).optional()
}).strict();

export const EnumGenderNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional()
}).strict();

export const EnumMeritalStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMeritalStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  in: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NestedEnumMeritalStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMeritalStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMeritalStatusNullableFilterSchema).optional()
}).strict();

export const EnumEducationNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEducationNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EducationSchema).optional().nullable(),
  in: z.lazy(() => EducationSchema).array().optional().nullable(),
  notIn: z.lazy(() => EducationSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NestedEnumEducationNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEducationNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEducationNullableFilterSchema).optional()
}).strict();

export const CaseCreateNestedManyWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutWeaponsInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutWeaponsInputSchema),z.lazy(() => CaseCreateWithoutWeaponsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedCreateNestedManyWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutWeaponsInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutWeaponsInputSchema),z.lazy(() => CaseCreateWithoutWeaponsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const CaseUpdateManyWithoutWeaponsNestedInputSchema: z.ZodType<Prisma.CaseUpdateManyWithoutWeaponsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutWeaponsInputSchema),z.lazy(() => CaseCreateWithoutWeaponsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutWeaponsInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutWeaponsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutWeaponsInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutWeaponsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutWeaponsInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutWeaponsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutWeaponsNestedInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutWeaponsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutWeaponsInputSchema),z.lazy(() => CaseCreateWithoutWeaponsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutWeaponsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutWeaponsInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutWeaponsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutWeaponsInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutWeaponsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutWeaponsInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutWeaponsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseCreateNestedManyWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutCrimeClassificationsInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedCreateNestedManyWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutCrimeClassificationsInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CaseUpdateManyWithoutCrimeClassificationsNestedInputSchema: z.ZodType<Prisma.CaseUpdateManyWithoutCrimeClassificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutCrimeClassificationsNestedInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutCrimeClassificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseCreateOrConnectWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutCrimeClassificationsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseCreateNestedManyWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutReportingPersonInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateWithoutReportingPersonInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyReportingPersonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedCreateNestedManyWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutReportingPersonInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateWithoutReportingPersonInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyReportingPersonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const CaseUpdateManyWithoutReportingPersonNestedInputSchema: z.ZodType<Prisma.CaseUpdateManyWithoutReportingPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateWithoutReportingPersonInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutReportingPersonInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutReportingPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyReportingPersonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutReportingPersonInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutReportingPersonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutReportingPersonInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutReportingPersonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const CaseUncheckedUpdateManyWithoutReportingPersonNestedInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutReportingPersonNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateWithoutReportingPersonInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema),z.lazy(() => CaseCreateOrConnectWithoutReportingPersonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutReportingPersonInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutReportingPersonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyReportingPersonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutReportingPersonInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutReportingPersonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutReportingPersonInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutReportingPersonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WeaponCreateNestedManyWithoutCasesInputSchema: z.ZodType<Prisma.WeaponCreateNestedManyWithoutCasesInput> = z.object({
  create: z.union([ z.lazy(() => WeaponCreateWithoutCasesInputSchema),z.lazy(() => WeaponCreateWithoutCasesInputSchema).array(),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema),z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CrimeClassificationCreateNestedManyWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationCreateNestedManyWithoutCasesInput> = z.object({
  create: z.union([ z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema).array(),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportingPersonCreateNestedOneWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonCreateNestedOneWithoutCaseInput> = z.object({
  create: z.union([ z.lazy(() => ReportingPersonCreateWithoutCaseInputSchema),z.lazy(() => ReportingPersonUncheckedCreateWithoutCaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportingPersonCreateOrConnectWithoutCaseInputSchema).optional(),
  connect: z.lazy(() => ReportingPersonWhereUniqueInputSchema).optional()
}).strict();

export const PersonalInformationCreateNestedOneWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationCreateNestedOneWithoutVictimCasesInput> = z.object({
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutVictimCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonalInformationCreateOrConnectWithoutVictimCasesInputSchema).optional(),
  connect: z.lazy(() => PersonalInformationWhereUniqueInputSchema).optional()
}).strict();

export const PersonalInformationCreateNestedOneWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationCreateNestedOneWithoutSuspectCasesInput> = z.object({
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutSuspectCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonalInformationCreateOrConnectWithoutSuspectCasesInputSchema).optional(),
  connect: z.lazy(() => PersonalInformationWhereUniqueInputSchema).optional()
}).strict();

export const WeaponUncheckedCreateNestedManyWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUncheckedCreateNestedManyWithoutCasesInput> = z.object({
  create: z.union([ z.lazy(() => WeaponCreateWithoutCasesInputSchema),z.lazy(() => WeaponCreateWithoutCasesInputSchema).array(),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema),z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CrimeClassificationUncheckedCreateNestedManyWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedCreateNestedManyWithoutCasesInput> = z.object({
  create: z.union([ z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema).array(),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumModusOperandiLinedFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ModusOperandiLinedSchema).optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const WeaponUpdateManyWithoutCasesNestedInputSchema: z.ZodType<Prisma.WeaponUpdateManyWithoutCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WeaponCreateWithoutCasesInputSchema),z.lazy(() => WeaponCreateWithoutCasesInputSchema).array(),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema),z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WeaponUpsertWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => WeaponUpsertWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WeaponUpdateWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => WeaponUpdateWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WeaponUpdateManyWithWhereWithoutCasesInputSchema),z.lazy(() => WeaponUpdateManyWithWhereWithoutCasesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WeaponScalarWhereInputSchema),z.lazy(() => WeaponScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CrimeClassificationUpdateManyWithoutCasesNestedInputSchema: z.ZodType<Prisma.CrimeClassificationUpdateManyWithoutCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema).array(),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrimeClassificationUpsertWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUpsertWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrimeClassificationUpdateWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUpdateWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrimeClassificationUpdateManyWithWhereWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUpdateManyWithWhereWithoutCasesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrimeClassificationScalarWhereInputSchema),z.lazy(() => CrimeClassificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportingPersonUpdateOneRequiredWithoutCaseNestedInputSchema: z.ZodType<Prisma.ReportingPersonUpdateOneRequiredWithoutCaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportingPersonCreateWithoutCaseInputSchema),z.lazy(() => ReportingPersonUncheckedCreateWithoutCaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportingPersonCreateOrConnectWithoutCaseInputSchema).optional(),
  upsert: z.lazy(() => ReportingPersonUpsertWithoutCaseInputSchema).optional(),
  connect: z.lazy(() => ReportingPersonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReportingPersonUpdateToOneWithWhereWithoutCaseInputSchema),z.lazy(() => ReportingPersonUpdateWithoutCaseInputSchema),z.lazy(() => ReportingPersonUncheckedUpdateWithoutCaseInputSchema) ]).optional(),
}).strict();

export const PersonalInformationUpdateOneWithoutVictimCasesNestedInputSchema: z.ZodType<Prisma.PersonalInformationUpdateOneWithoutVictimCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutVictimCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonalInformationCreateOrConnectWithoutVictimCasesInputSchema).optional(),
  upsert: z.lazy(() => PersonalInformationUpsertWithoutVictimCasesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PersonalInformationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PersonalInformationUpdateToOneWithWhereWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUpdateWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUncheckedUpdateWithoutVictimCasesInputSchema) ]).optional(),
}).strict();

export const PersonalInformationUpdateOneWithoutSuspectCasesNestedInputSchema: z.ZodType<Prisma.PersonalInformationUpdateOneWithoutSuspectCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutSuspectCasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PersonalInformationCreateOrConnectWithoutSuspectCasesInputSchema).optional(),
  upsert: z.lazy(() => PersonalInformationUpsertWithoutSuspectCasesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PersonalInformationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PersonalInformationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PersonalInformationUpdateToOneWithWhereWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUpdateWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUncheckedUpdateWithoutSuspectCasesInputSchema) ]).optional(),
}).strict();

export const WeaponUncheckedUpdateManyWithoutCasesNestedInputSchema: z.ZodType<Prisma.WeaponUncheckedUpdateManyWithoutCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WeaponCreateWithoutCasesInputSchema),z.lazy(() => WeaponCreateWithoutCasesInputSchema).array(),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema),z.lazy(() => WeaponCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WeaponUpsertWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => WeaponUpsertWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WeaponWhereUniqueInputSchema),z.lazy(() => WeaponWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WeaponUpdateWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => WeaponUpdateWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WeaponUpdateManyWithWhereWithoutCasesInputSchema),z.lazy(() => WeaponUpdateManyWithWhereWithoutCasesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WeaponScalarWhereInputSchema),z.lazy(() => WeaponScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CrimeClassificationUncheckedUpdateManyWithoutCasesNestedInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedUpdateManyWithoutCasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema).array(),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema),z.lazy(() => CrimeClassificationCreateOrConnectWithoutCasesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CrimeClassificationUpsertWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUpsertWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CrimeClassificationWhereUniqueInputSchema),z.lazy(() => CrimeClassificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CrimeClassificationUpdateWithWhereUniqueWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUpdateWithWhereUniqueWithoutCasesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CrimeClassificationUpdateManyWithWhereWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUpdateManyWithWhereWithoutCasesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CrimeClassificationScalarWhereInputSchema),z.lazy(() => CrimeClassificationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseCreateNestedManyWithoutVictimInputSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutVictimInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutVictimInputSchema),z.lazy(() => CaseCreateWithoutVictimInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema),z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyVictimInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CaseCreateNestedManyWithoutSuspectInputSchema: z.ZodType<Prisma.CaseCreateNestedManyWithoutSuspectInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutSuspectInputSchema),z.lazy(() => CaseCreateWithoutSuspectInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema),z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManySuspectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedCreateNestedManyWithoutVictimInputSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutVictimInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutVictimInputSchema),z.lazy(() => CaseCreateWithoutVictimInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema),z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyVictimInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedCreateNestedManyWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutSuspectInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutSuspectInputSchema),z.lazy(() => CaseCreateWithoutSuspectInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema),z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManySuspectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumNationalIdTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => NationalIdTypeSchema).optional().nullable()
}).strict();

export const NullableEnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenderSchema).optional().nullable()
}).strict();

export const NullableEnumMeritalStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumMeritalStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MeritalStatusSchema).optional().nullable()
}).strict();

export const NullableEnumEducationFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumEducationFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EducationSchema).optional().nullable()
}).strict();

export const CaseUpdateManyWithoutVictimNestedInputSchema: z.ZodType<Prisma.CaseUpdateManyWithoutVictimNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutVictimInputSchema),z.lazy(() => CaseCreateWithoutVictimInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema),z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutVictimInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutVictimInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyVictimInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutVictimInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutVictimInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutVictimInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutVictimInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseUpdateManyWithoutSuspectNestedInputSchema: z.ZodType<Prisma.CaseUpdateManyWithoutSuspectNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutSuspectInputSchema),z.lazy(() => CaseCreateWithoutSuspectInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema),z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutSuspectInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutSuspectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManySuspectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutSuspectInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutSuspectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutSuspectInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutSuspectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutVictimNestedInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutVictimNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutVictimInputSchema),z.lazy(() => CaseCreateWithoutVictimInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema),z.lazy(() => CaseCreateOrConnectWithoutVictimInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutVictimInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutVictimInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManyVictimInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutVictimInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutVictimInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutVictimInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutVictimInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CaseUncheckedUpdateManyWithoutSuspectNestedInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutSuspectNestedInput> = z.object({
  create: z.union([ z.lazy(() => CaseCreateWithoutSuspectInputSchema),z.lazy(() => CaseCreateWithoutSuspectInputSchema).array(),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema),z.lazy(() => CaseCreateOrConnectWithoutSuspectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CaseUpsertWithWhereUniqueWithoutSuspectInputSchema),z.lazy(() => CaseUpsertWithWhereUniqueWithoutSuspectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CaseCreateManySuspectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CaseWhereUniqueInputSchema),z.lazy(() => CaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CaseUpdateWithWhereUniqueWithoutSuspectInputSchema),z.lazy(() => CaseUpdateWithWhereUniqueWithoutSuspectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CaseUpdateManyWithWhereWithoutSuspectInputSchema),z.lazy(() => CaseUpdateManyWithWhereWithoutSuspectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumModusOperandiLinedNullableFilterSchema: z.ZodType<Prisma.NestedEnumModusOperandiLinedNullableFilter> = z.object({
  equals: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  in: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  notIn: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NestedEnumModusOperandiLinedNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumModusOperandiLinedNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumModusOperandiLinedNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  in: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  notIn: z.lazy(() => ModusOperandiLinedSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NestedEnumModusOperandiLinedNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumModusOperandiLinedNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumModusOperandiLinedNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumNationalIdTypeNullableFilterSchema: z.ZodType<Prisma.NestedEnumNationalIdTypeNullableFilter> = z.object({
  equals: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  in: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NestedEnumNationalIdTypeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumGenderNullableFilterSchema: z.ZodType<Prisma.NestedEnumGenderNullableFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumMeritalStatusNullableFilterSchema: z.ZodType<Prisma.NestedEnumMeritalStatusNullableFilter> = z.object({
  equals: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  in: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NestedEnumMeritalStatusNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumEducationNullableFilterSchema: z.ZodType<Prisma.NestedEnumEducationNullableFilter> = z.object({
  equals: z.lazy(() => EducationSchema).optional().nullable(),
  in: z.lazy(() => EducationSchema).array().optional().nullable(),
  notIn: z.lazy(() => EducationSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NestedEnumEducationNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumNationalIdTypeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNationalIdTypeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  in: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  notIn: z.lazy(() => NationalIdTypeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NestedEnumNationalIdTypeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNationalIdTypeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNationalIdTypeNullableFilterSchema).optional()
}).strict();

export const NestedEnumGenderNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional().nullable(),
  in: z.lazy(() => GenderSchema).array().optional().nullable(),
  notIn: z.lazy(() => GenderSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderNullableFilterSchema).optional()
}).strict();

export const NestedEnumMeritalStatusNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMeritalStatusNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  in: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  notIn: z.lazy(() => MeritalStatusSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NestedEnumMeritalStatusNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMeritalStatusNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMeritalStatusNullableFilterSchema).optional()
}).strict();

export const NestedEnumEducationNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEducationNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EducationSchema).optional().nullable(),
  in: z.lazy(() => EducationSchema).array().optional().nullable(),
  notIn: z.lazy(() => EducationSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NestedEnumEducationNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEducationNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEducationNullableFilterSchema).optional()
}).strict();

export const CaseCreateWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseCreateWithoutWeaponsInput> = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationCreateNestedManyWithoutCasesInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonCreateNestedOneWithoutCaseInputSchema),
  victim: z.lazy(() => PersonalInformationCreateNestedOneWithoutVictimCasesInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationCreateNestedOneWithoutSuspectCasesInputSchema).optional()
}).strict();

export const CaseUncheckedCreateWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutWeaponsInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  victimId: z.number().int(),
  suspectId: z.number().int(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedCreateNestedManyWithoutCasesInputSchema).optional()
}).strict();

export const CaseCreateOrConnectWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutWeaponsInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CaseCreateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema) ]),
}).strict();

export const CaseUpsertWithWhereUniqueWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutWeaponsInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CaseUpdateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutWeaponsInputSchema) ]),
  create: z.union([ z.lazy(() => CaseCreateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutWeaponsInputSchema) ]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutWeaponsInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateWithoutWeaponsInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutWeaponsInputSchema) ]),
}).strict();

export const CaseUpdateManyWithWhereWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutWeaponsInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateManyMutationInputSchema),z.lazy(() => CaseUncheckedUpdateManyWithoutWeaponsInputSchema) ]),
}).strict();

export const CaseScalarWhereInputSchema: z.ZodType<Prisma.CaseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CaseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CaseScalarWhereInputSchema),z.lazy(() => CaseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  rciNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  obNo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  occurrencePlace: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandi: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => EnumModusOperandiLinedNullableFilterSchema),z.lazy(() => ModusOperandiLinedSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  dateOfReport: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reportingPersonId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  victimId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  suspectId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const CaseCreateWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseCreateWithoutCrimeClassificationsInput> = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  weapons: z.lazy(() => WeaponCreateNestedManyWithoutCasesInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonCreateNestedOneWithoutCaseInputSchema),
  victim: z.lazy(() => PersonalInformationCreateNestedOneWithoutVictimCasesInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationCreateNestedOneWithoutSuspectCasesInputSchema).optional()
}).strict();

export const CaseUncheckedCreateWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutCrimeClassificationsInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  victimId: z.number().int(),
  suspectId: z.number().int(),
  weapons: z.lazy(() => WeaponUncheckedCreateNestedManyWithoutCasesInputSchema).optional()
}).strict();

export const CaseCreateOrConnectWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutCrimeClassificationsInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema) ]),
}).strict();

export const CaseUpsertWithWhereUniqueWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutCrimeClassificationsInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CaseUpdateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutCrimeClassificationsInputSchema) ]),
  create: z.union([ z.lazy(() => CaseCreateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedCreateWithoutCrimeClassificationsInputSchema) ]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutCrimeClassificationsInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateWithoutCrimeClassificationsInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutCrimeClassificationsInputSchema) ]),
}).strict();

export const CaseUpdateManyWithWhereWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutCrimeClassificationsInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateManyMutationInputSchema),z.lazy(() => CaseUncheckedUpdateManyWithoutCrimeClassificationsInputSchema) ]),
}).strict();

export const CaseCreateWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseCreateWithoutReportingPersonInput> = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  weapons: z.lazy(() => WeaponCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationCreateNestedManyWithoutCasesInputSchema).optional(),
  victim: z.lazy(() => PersonalInformationCreateNestedOneWithoutVictimCasesInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationCreateNestedOneWithoutSuspectCasesInputSchema).optional()
}).strict();

export const CaseUncheckedCreateWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutReportingPersonInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  victimId: z.number().int(),
  suspectId: z.number().int(),
  weapons: z.lazy(() => WeaponUncheckedCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedCreateNestedManyWithoutCasesInputSchema).optional()
}).strict();

export const CaseCreateOrConnectWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutReportingPersonInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CaseCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema) ]),
}).strict();

export const CaseCreateManyReportingPersonInputEnvelopeSchema: z.ZodType<Prisma.CaseCreateManyReportingPersonInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CaseCreateManyReportingPersonInputSchema),z.lazy(() => CaseCreateManyReportingPersonInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CaseUpsertWithWhereUniqueWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutReportingPersonInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CaseUpdateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutReportingPersonInputSchema) ]),
  create: z.union([ z.lazy(() => CaseCreateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedCreateWithoutReportingPersonInputSchema) ]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutReportingPersonInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateWithoutReportingPersonInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutReportingPersonInputSchema) ]),
}).strict();

export const CaseUpdateManyWithWhereWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutReportingPersonInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateManyMutationInputSchema),z.lazy(() => CaseUncheckedUpdateManyWithoutReportingPersonInputSchema) ]),
}).strict();

export const WeaponCreateWithoutCasesInputSchema: z.ZodType<Prisma.WeaponCreateWithoutCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WeaponUncheckedCreateWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUncheckedCreateWithoutCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const WeaponCreateOrConnectWithoutCasesInputSchema: z.ZodType<Prisma.WeaponCreateOrConnectWithoutCasesInput> = z.object({
  where: z.lazy(() => WeaponWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WeaponCreateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema) ]),
}).strict();

export const CrimeClassificationCreateWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationCreateWithoutCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CrimeClassificationUncheckedCreateWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedCreateWithoutCasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CrimeClassificationCreateOrConnectWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationCreateOrConnectWithoutCasesInput> = z.object({
  where: z.lazy(() => CrimeClassificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema) ]),
}).strict();

export const ReportingPersonCreateWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonCreateWithoutCaseInput> = z.object({
  name: z.string().optional().nullable(),
  idNo: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  relationship: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportingPersonUncheckedCreateWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonUncheckedCreateWithoutCaseInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  idNo: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  relationship: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportingPersonCreateOrConnectWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonCreateOrConnectWithoutCaseInput> = z.object({
  where: z.lazy(() => ReportingPersonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportingPersonCreateWithoutCaseInputSchema),z.lazy(() => ReportingPersonUncheckedCreateWithoutCaseInputSchema) ]),
}).strict();

export const PersonalInformationCreateWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationCreateWithoutVictimCasesInput> = z.object({
  nationalId: z.string(),
  nationalIdType: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  surname: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  nationality: z.string().optional().nullable(),
  meritalStatus: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  occupation: z.string().optional().nullable(),
  education: z.lazy(() => EducationSchema).optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  areaChief: z.string().optional().nullable(),
  placeOfResidence: z.string().optional().nullable(),
  headMan: z.string().optional().nullable(),
  principalChief: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  nextOfKinPhone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  suspectCases: z.lazy(() => CaseCreateNestedManyWithoutSuspectInputSchema).optional()
}).strict();

export const PersonalInformationUncheckedCreateWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationUncheckedCreateWithoutVictimCasesInput> = z.object({
  id: z.number().int().optional(),
  nationalId: z.string(),
  nationalIdType: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  surname: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  nationality: z.string().optional().nullable(),
  meritalStatus: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  occupation: z.string().optional().nullable(),
  education: z.lazy(() => EducationSchema).optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  areaChief: z.string().optional().nullable(),
  placeOfResidence: z.string().optional().nullable(),
  headMan: z.string().optional().nullable(),
  principalChief: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  nextOfKinPhone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  suspectCases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutSuspectInputSchema).optional()
}).strict();

export const PersonalInformationCreateOrConnectWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationCreateOrConnectWithoutVictimCasesInput> = z.object({
  where: z.lazy(() => PersonalInformationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutVictimCasesInputSchema) ]),
}).strict();

export const PersonalInformationCreateWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationCreateWithoutSuspectCasesInput> = z.object({
  nationalId: z.string(),
  nationalIdType: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  surname: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  nationality: z.string().optional().nullable(),
  meritalStatus: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  occupation: z.string().optional().nullable(),
  education: z.lazy(() => EducationSchema).optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  areaChief: z.string().optional().nullable(),
  placeOfResidence: z.string().optional().nullable(),
  headMan: z.string().optional().nullable(),
  principalChief: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  nextOfKinPhone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  victimCases: z.lazy(() => CaseCreateNestedManyWithoutVictimInputSchema).optional()
}).strict();

export const PersonalInformationUncheckedCreateWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationUncheckedCreateWithoutSuspectCasesInput> = z.object({
  id: z.number().int().optional(),
  nationalId: z.string(),
  nationalIdType: z.lazy(() => NationalIdTypeSchema).optional().nullable(),
  surname: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  gender: z.lazy(() => GenderSchema).optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date().optional().nullable(),
  nationality: z.string().optional().nullable(),
  meritalStatus: z.lazy(() => MeritalStatusSchema).optional().nullable(),
  occupation: z.string().optional().nullable(),
  education: z.lazy(() => EducationSchema).optional().nullable(),
  placeOfBirth: z.string().optional().nullable(),
  areaChief: z.string().optional().nullable(),
  placeOfResidence: z.string().optional().nullable(),
  headMan: z.string().optional().nullable(),
  principalChief: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  nextOfKin: z.string().optional().nullable(),
  nextOfKinPhone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  victimCases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutVictimInputSchema).optional()
}).strict();

export const PersonalInformationCreateOrConnectWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationCreateOrConnectWithoutSuspectCasesInput> = z.object({
  where: z.lazy(() => PersonalInformationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutSuspectCasesInputSchema) ]),
}).strict();

export const WeaponUpsertWithWhereUniqueWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUpsertWithWhereUniqueWithoutCasesInput> = z.object({
  where: z.lazy(() => WeaponWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WeaponUpdateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedUpdateWithoutCasesInputSchema) ]),
  create: z.union([ z.lazy(() => WeaponCreateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedCreateWithoutCasesInputSchema) ]),
}).strict();

export const WeaponUpdateWithWhereUniqueWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUpdateWithWhereUniqueWithoutCasesInput> = z.object({
  where: z.lazy(() => WeaponWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WeaponUpdateWithoutCasesInputSchema),z.lazy(() => WeaponUncheckedUpdateWithoutCasesInputSchema) ]),
}).strict();

export const WeaponUpdateManyWithWhereWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUpdateManyWithWhereWithoutCasesInput> = z.object({
  where: z.lazy(() => WeaponScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WeaponUpdateManyMutationInputSchema),z.lazy(() => WeaponUncheckedUpdateManyWithoutCasesInputSchema) ]),
}).strict();

export const WeaponScalarWhereInputSchema: z.ZodType<Prisma.WeaponScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WeaponScalarWhereInputSchema),z.lazy(() => WeaponScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WeaponScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WeaponScalarWhereInputSchema),z.lazy(() => WeaponScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CrimeClassificationUpsertWithWhereUniqueWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUpsertWithWhereUniqueWithoutCasesInput> = z.object({
  where: z.lazy(() => CrimeClassificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CrimeClassificationUpdateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedUpdateWithoutCasesInputSchema) ]),
  create: z.union([ z.lazy(() => CrimeClassificationCreateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedCreateWithoutCasesInputSchema) ]),
}).strict();

export const CrimeClassificationUpdateWithWhereUniqueWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUpdateWithWhereUniqueWithoutCasesInput> = z.object({
  where: z.lazy(() => CrimeClassificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CrimeClassificationUpdateWithoutCasesInputSchema),z.lazy(() => CrimeClassificationUncheckedUpdateWithoutCasesInputSchema) ]),
}).strict();

export const CrimeClassificationUpdateManyWithWhereWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUpdateManyWithWhereWithoutCasesInput> = z.object({
  where: z.lazy(() => CrimeClassificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CrimeClassificationUpdateManyMutationInputSchema),z.lazy(() => CrimeClassificationUncheckedUpdateManyWithoutCasesInputSchema) ]),
}).strict();

export const CrimeClassificationScalarWhereInputSchema: z.ZodType<Prisma.CrimeClassificationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CrimeClassificationScalarWhereInputSchema),z.lazy(() => CrimeClassificationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CrimeClassificationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CrimeClassificationScalarWhereInputSchema),z.lazy(() => CrimeClassificationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportingPersonUpsertWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonUpsertWithoutCaseInput> = z.object({
  update: z.union([ z.lazy(() => ReportingPersonUpdateWithoutCaseInputSchema),z.lazy(() => ReportingPersonUncheckedUpdateWithoutCaseInputSchema) ]),
  create: z.union([ z.lazy(() => ReportingPersonCreateWithoutCaseInputSchema),z.lazy(() => ReportingPersonUncheckedCreateWithoutCaseInputSchema) ]),
  where: z.lazy(() => ReportingPersonWhereInputSchema).optional()
}).strict();

export const ReportingPersonUpdateToOneWithWhereWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonUpdateToOneWithWhereWithoutCaseInput> = z.object({
  where: z.lazy(() => ReportingPersonWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ReportingPersonUpdateWithoutCaseInputSchema),z.lazy(() => ReportingPersonUncheckedUpdateWithoutCaseInputSchema) ]),
}).strict();

export const ReportingPersonUpdateWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonUpdateWithoutCaseInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportingPersonUncheckedUpdateWithoutCaseInputSchema: z.ZodType<Prisma.ReportingPersonUncheckedUpdateWithoutCaseInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idNo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  relationship: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PersonalInformationUpsertWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationUpsertWithoutVictimCasesInput> = z.object({
  update: z.union([ z.lazy(() => PersonalInformationUpdateWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUncheckedUpdateWithoutVictimCasesInputSchema) ]),
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutVictimCasesInputSchema) ]),
  where: z.lazy(() => PersonalInformationWhereInputSchema).optional()
}).strict();

export const PersonalInformationUpdateToOneWithWhereWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationUpdateToOneWithWhereWithoutVictimCasesInput> = z.object({
  where: z.lazy(() => PersonalInformationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PersonalInformationUpdateWithoutVictimCasesInputSchema),z.lazy(() => PersonalInformationUncheckedUpdateWithoutVictimCasesInputSchema) ]),
}).strict();

export const PersonalInformationUpdateWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationUpdateWithoutVictimCasesInput> = z.object({
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  suspectCases: z.lazy(() => CaseUpdateManyWithoutSuspectNestedInputSchema).optional()
}).strict();

export const PersonalInformationUncheckedUpdateWithoutVictimCasesInputSchema: z.ZodType<Prisma.PersonalInformationUncheckedUpdateWithoutVictimCasesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  suspectCases: z.lazy(() => CaseUncheckedUpdateManyWithoutSuspectNestedInputSchema).optional()
}).strict();

export const PersonalInformationUpsertWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationUpsertWithoutSuspectCasesInput> = z.object({
  update: z.union([ z.lazy(() => PersonalInformationUpdateWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUncheckedUpdateWithoutSuspectCasesInputSchema) ]),
  create: z.union([ z.lazy(() => PersonalInformationCreateWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUncheckedCreateWithoutSuspectCasesInputSchema) ]),
  where: z.lazy(() => PersonalInformationWhereInputSchema).optional()
}).strict();

export const PersonalInformationUpdateToOneWithWhereWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationUpdateToOneWithWhereWithoutSuspectCasesInput> = z.object({
  where: z.lazy(() => PersonalInformationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PersonalInformationUpdateWithoutSuspectCasesInputSchema),z.lazy(() => PersonalInformationUncheckedUpdateWithoutSuspectCasesInputSchema) ]),
}).strict();

export const PersonalInformationUpdateWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationUpdateWithoutSuspectCasesInput> = z.object({
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  victimCases: z.lazy(() => CaseUpdateManyWithoutVictimNestedInputSchema).optional()
}).strict();

export const PersonalInformationUncheckedUpdateWithoutSuspectCasesInputSchema: z.ZodType<Prisma.PersonalInformationUncheckedUpdateWithoutSuspectCasesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  nationalId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nationalIdType: z.union([ z.lazy(() => NationalIdTypeSchema),z.lazy(() => NullableEnumNationalIdTypeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  surname: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  middleName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NullableEnumGenderFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phoneNumber: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfBirth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nationality: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meritalStatus: z.union([ z.lazy(() => MeritalStatusSchema),z.lazy(() => NullableEnumMeritalStatusFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  occupation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  education: z.union([ z.lazy(() => EducationSchema),z.lazy(() => NullableEnumEducationFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfBirth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  areaChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeOfResidence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  headMan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  principalChief: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  district: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKin: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextOfKinPhone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  victimCases: z.lazy(() => CaseUncheckedUpdateManyWithoutVictimNestedInputSchema).optional()
}).strict();

export const CaseCreateWithoutVictimInputSchema: z.ZodType<Prisma.CaseCreateWithoutVictimInput> = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  weapons: z.lazy(() => WeaponCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationCreateNestedManyWithoutCasesInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonCreateNestedOneWithoutCaseInputSchema),
  suspect: z.lazy(() => PersonalInformationCreateNestedOneWithoutSuspectCasesInputSchema).optional()
}).strict();

export const CaseUncheckedCreateWithoutVictimInputSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutVictimInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  suspectId: z.number().int(),
  weapons: z.lazy(() => WeaponUncheckedCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedCreateNestedManyWithoutCasesInputSchema).optional()
}).strict();

export const CaseCreateOrConnectWithoutVictimInputSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutVictimInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CaseCreateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema) ]),
}).strict();

export const CaseCreateManyVictimInputEnvelopeSchema: z.ZodType<Prisma.CaseCreateManyVictimInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CaseCreateManyVictimInputSchema),z.lazy(() => CaseCreateManyVictimInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CaseCreateWithoutSuspectInputSchema: z.ZodType<Prisma.CaseCreateWithoutSuspectInput> = z.object({
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  weapons: z.lazy(() => WeaponCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationCreateNestedManyWithoutCasesInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonCreateNestedOneWithoutCaseInputSchema),
  victim: z.lazy(() => PersonalInformationCreateNestedOneWithoutVictimCasesInputSchema).optional()
}).strict();

export const CaseUncheckedCreateWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutSuspectInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  victimId: z.number().int(),
  weapons: z.lazy(() => WeaponUncheckedCreateNestedManyWithoutCasesInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedCreateNestedManyWithoutCasesInputSchema).optional()
}).strict();

export const CaseCreateOrConnectWithoutSuspectInputSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutSuspectInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CaseCreateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema) ]),
}).strict();

export const CaseCreateManySuspectInputEnvelopeSchema: z.ZodType<Prisma.CaseCreateManySuspectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CaseCreateManySuspectInputSchema),z.lazy(() => CaseCreateManySuspectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CaseUpsertWithWhereUniqueWithoutVictimInputSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutVictimInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CaseUpdateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutVictimInputSchema) ]),
  create: z.union([ z.lazy(() => CaseCreateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedCreateWithoutVictimInputSchema) ]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutVictimInputSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutVictimInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateWithoutVictimInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutVictimInputSchema) ]),
}).strict();

export const CaseUpdateManyWithWhereWithoutVictimInputSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutVictimInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateManyMutationInputSchema),z.lazy(() => CaseUncheckedUpdateManyWithoutVictimInputSchema) ]),
}).strict();

export const CaseUpsertWithWhereUniqueWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutSuspectInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CaseUpdateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutSuspectInputSchema) ]),
  create: z.union([ z.lazy(() => CaseCreateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedCreateWithoutSuspectInputSchema) ]),
}).strict();

export const CaseUpdateWithWhereUniqueWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutSuspectInput> = z.object({
  where: z.lazy(() => CaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateWithoutSuspectInputSchema),z.lazy(() => CaseUncheckedUpdateWithoutSuspectInputSchema) ]),
}).strict();

export const CaseUpdateManyWithWhereWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUpdateManyWithWhereWithoutSuspectInput> = z.object({
  where: z.lazy(() => CaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CaseUpdateManyMutationInputSchema),z.lazy(() => CaseUncheckedUpdateManyWithoutSuspectInputSchema) ]),
}).strict();

export const CaseUpdateWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUpdateWithoutWeaponsInput> = z.object({
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUpdateManyWithoutCasesNestedInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonUpdateOneRequiredWithoutCaseNestedInputSchema).optional(),
  victim: z.lazy(() => PersonalInformationUpdateOneWithoutVictimCasesNestedInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationUpdateOneWithoutSuspectCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutWeaponsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedUpdateManyWithoutCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateManyWithoutWeaponsInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutWeaponsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseUpdateWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUpdateWithoutCrimeClassificationsInput> = z.object({
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUpdateManyWithoutCasesNestedInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonUpdateOneRequiredWithoutCaseNestedInputSchema).optional(),
  victim: z.lazy(() => PersonalInformationUpdateOneWithoutVictimCasesNestedInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationUpdateOneWithoutSuspectCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutCrimeClassificationsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUncheckedUpdateManyWithoutCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateManyWithoutCrimeClassificationsInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutCrimeClassificationsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseCreateManyReportingPersonInputSchema: z.ZodType<Prisma.CaseCreateManyReportingPersonInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  victimId: z.number().int(),
  suspectId: z.number().int()
}).strict();

export const CaseUpdateWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUpdateWithoutReportingPersonInput> = z.object({
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUpdateManyWithoutCasesNestedInputSchema).optional(),
  victim: z.lazy(() => PersonalInformationUpdateOneWithoutVictimCasesNestedInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationUpdateOneWithoutSuspectCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutReportingPersonInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUncheckedUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedUpdateManyWithoutCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateManyWithoutReportingPersonInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutReportingPersonInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeaponUpdateWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUpdateWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeaponUncheckedUpdateWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUncheckedUpdateWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WeaponUncheckedUpdateManyWithoutCasesInputSchema: z.ZodType<Prisma.WeaponUncheckedUpdateManyWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CrimeClassificationUpdateWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUpdateWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CrimeClassificationUncheckedUpdateWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedUpdateWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CrimeClassificationUncheckedUpdateManyWithoutCasesInputSchema: z.ZodType<Prisma.CrimeClassificationUncheckedUpdateManyWithoutCasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseCreateManyVictimInputSchema: z.ZodType<Prisma.CaseCreateManyVictimInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  suspectId: z.number().int()
}).strict();

export const CaseCreateManySuspectInputSchema: z.ZodType<Prisma.CaseCreateManySuspectInput> = z.object({
  id: z.number().int().optional(),
  rciNo: z.string(),
  obNo: z.string(),
  occurrencePlace: z.string().optional().nullable(),
  modusOperandi: z.string().optional().nullable(),
  modusOperandiDetails: z.string().optional().nullable(),
  modusOperandiLinked: z.lazy(() => ModusOperandiLinedSchema).optional().nullable(),
  dateOfOccurrence: z.coerce.date().optional().nullable(),
  dateOfReport: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reportingPersonId: z.number().int(),
  victimId: z.number().int()
}).strict();

export const CaseUpdateWithoutVictimInputSchema: z.ZodType<Prisma.CaseUpdateWithoutVictimInput> = z.object({
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUpdateManyWithoutCasesNestedInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonUpdateOneRequiredWithoutCaseNestedInputSchema).optional(),
  suspect: z.lazy(() => PersonalInformationUpdateOneWithoutSuspectCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateWithoutVictimInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutVictimInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUncheckedUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedUpdateManyWithoutCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateManyWithoutVictimInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutVictimInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  suspectId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CaseUpdateWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUpdateWithoutSuspectInput> = z.object({
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUpdateManyWithoutCasesNestedInputSchema).optional(),
  reportingPerson: z.lazy(() => ReportingPersonUpdateOneRequiredWithoutCaseNestedInputSchema).optional(),
  victim: z.lazy(() => PersonalInformationUpdateOneWithoutVictimCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateWithoutSuspectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  weapons: z.lazy(() => WeaponUncheckedUpdateManyWithoutCasesNestedInputSchema).optional(),
  crimeClassifications: z.lazy(() => CrimeClassificationUncheckedUpdateManyWithoutCasesNestedInputSchema).optional()
}).strict();

export const CaseUncheckedUpdateManyWithoutSuspectInputSchema: z.ZodType<Prisma.CaseUncheckedUpdateManyWithoutSuspectInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  rciNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  obNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  occurrencePlace: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandi: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiDetails: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  modusOperandiLinked: z.union([ z.lazy(() => ModusOperandiLinedSchema),z.lazy(() => NullableEnumModusOperandiLinedFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfOccurrence: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  dateOfReport: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reportingPersonId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  victimId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const WeaponFindFirstArgsSchema: z.ZodType<Prisma.WeaponFindFirstArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  where: WeaponWhereInputSchema.optional(),
  orderBy: z.union([ WeaponOrderByWithRelationInputSchema.array(),WeaponOrderByWithRelationInputSchema ]).optional(),
  cursor: WeaponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WeaponScalarFieldEnumSchema,WeaponScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WeaponFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WeaponFindFirstOrThrowArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  where: WeaponWhereInputSchema.optional(),
  orderBy: z.union([ WeaponOrderByWithRelationInputSchema.array(),WeaponOrderByWithRelationInputSchema ]).optional(),
  cursor: WeaponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WeaponScalarFieldEnumSchema,WeaponScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WeaponFindManyArgsSchema: z.ZodType<Prisma.WeaponFindManyArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  where: WeaponWhereInputSchema.optional(),
  orderBy: z.union([ WeaponOrderByWithRelationInputSchema.array(),WeaponOrderByWithRelationInputSchema ]).optional(),
  cursor: WeaponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WeaponScalarFieldEnumSchema,WeaponScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WeaponAggregateArgsSchema: z.ZodType<Prisma.WeaponAggregateArgs> = z.object({
  where: WeaponWhereInputSchema.optional(),
  orderBy: z.union([ WeaponOrderByWithRelationInputSchema.array(),WeaponOrderByWithRelationInputSchema ]).optional(),
  cursor: WeaponWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WeaponGroupByArgsSchema: z.ZodType<Prisma.WeaponGroupByArgs> = z.object({
  where: WeaponWhereInputSchema.optional(),
  orderBy: z.union([ WeaponOrderByWithAggregationInputSchema.array(),WeaponOrderByWithAggregationInputSchema ]).optional(),
  by: WeaponScalarFieldEnumSchema.array(),
  having: WeaponScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WeaponFindUniqueArgsSchema: z.ZodType<Prisma.WeaponFindUniqueArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  where: WeaponWhereUniqueInputSchema,
}).strict() ;

export const WeaponFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WeaponFindUniqueOrThrowArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  where: WeaponWhereUniqueInputSchema,
}).strict() ;

export const CrimeClassificationFindFirstArgsSchema: z.ZodType<Prisma.CrimeClassificationFindFirstArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  where: CrimeClassificationWhereInputSchema.optional(),
  orderBy: z.union([ CrimeClassificationOrderByWithRelationInputSchema.array(),CrimeClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: CrimeClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CrimeClassificationScalarFieldEnumSchema,CrimeClassificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CrimeClassificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CrimeClassificationFindFirstOrThrowArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  where: CrimeClassificationWhereInputSchema.optional(),
  orderBy: z.union([ CrimeClassificationOrderByWithRelationInputSchema.array(),CrimeClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: CrimeClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CrimeClassificationScalarFieldEnumSchema,CrimeClassificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CrimeClassificationFindManyArgsSchema: z.ZodType<Prisma.CrimeClassificationFindManyArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  where: CrimeClassificationWhereInputSchema.optional(),
  orderBy: z.union([ CrimeClassificationOrderByWithRelationInputSchema.array(),CrimeClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: CrimeClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CrimeClassificationScalarFieldEnumSchema,CrimeClassificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CrimeClassificationAggregateArgsSchema: z.ZodType<Prisma.CrimeClassificationAggregateArgs> = z.object({
  where: CrimeClassificationWhereInputSchema.optional(),
  orderBy: z.union([ CrimeClassificationOrderByWithRelationInputSchema.array(),CrimeClassificationOrderByWithRelationInputSchema ]).optional(),
  cursor: CrimeClassificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CrimeClassificationGroupByArgsSchema: z.ZodType<Prisma.CrimeClassificationGroupByArgs> = z.object({
  where: CrimeClassificationWhereInputSchema.optional(),
  orderBy: z.union([ CrimeClassificationOrderByWithAggregationInputSchema.array(),CrimeClassificationOrderByWithAggregationInputSchema ]).optional(),
  by: CrimeClassificationScalarFieldEnumSchema.array(),
  having: CrimeClassificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CrimeClassificationFindUniqueArgsSchema: z.ZodType<Prisma.CrimeClassificationFindUniqueArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  where: CrimeClassificationWhereUniqueInputSchema,
}).strict() ;

export const CrimeClassificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CrimeClassificationFindUniqueOrThrowArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  where: CrimeClassificationWhereUniqueInputSchema,
}).strict() ;

export const ReportingPersonFindFirstArgsSchema: z.ZodType<Prisma.ReportingPersonFindFirstArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  where: ReportingPersonWhereInputSchema.optional(),
  orderBy: z.union([ ReportingPersonOrderByWithRelationInputSchema.array(),ReportingPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportingPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportingPersonScalarFieldEnumSchema,ReportingPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportingPersonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportingPersonFindFirstOrThrowArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  where: ReportingPersonWhereInputSchema.optional(),
  orderBy: z.union([ ReportingPersonOrderByWithRelationInputSchema.array(),ReportingPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportingPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportingPersonScalarFieldEnumSchema,ReportingPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportingPersonFindManyArgsSchema: z.ZodType<Prisma.ReportingPersonFindManyArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  where: ReportingPersonWhereInputSchema.optional(),
  orderBy: z.union([ ReportingPersonOrderByWithRelationInputSchema.array(),ReportingPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportingPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportingPersonScalarFieldEnumSchema,ReportingPersonScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportingPersonAggregateArgsSchema: z.ZodType<Prisma.ReportingPersonAggregateArgs> = z.object({
  where: ReportingPersonWhereInputSchema.optional(),
  orderBy: z.union([ ReportingPersonOrderByWithRelationInputSchema.array(),ReportingPersonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportingPersonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportingPersonGroupByArgsSchema: z.ZodType<Prisma.ReportingPersonGroupByArgs> = z.object({
  where: ReportingPersonWhereInputSchema.optional(),
  orderBy: z.union([ ReportingPersonOrderByWithAggregationInputSchema.array(),ReportingPersonOrderByWithAggregationInputSchema ]).optional(),
  by: ReportingPersonScalarFieldEnumSchema.array(),
  having: ReportingPersonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportingPersonFindUniqueArgsSchema: z.ZodType<Prisma.ReportingPersonFindUniqueArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  where: ReportingPersonWhereUniqueInputSchema,
}).strict() ;

export const ReportingPersonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportingPersonFindUniqueOrThrowArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  where: ReportingPersonWhereUniqueInputSchema,
}).strict() ;

export const CaseFindFirstArgsSchema: z.ZodType<Prisma.CaseFindFirstArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CaseScalarFieldEnumSchema,CaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CaseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CaseFindFirstOrThrowArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CaseScalarFieldEnumSchema,CaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CaseFindManyArgsSchema: z.ZodType<Prisma.CaseFindManyArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CaseScalarFieldEnumSchema,CaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CaseAggregateArgsSchema: z.ZodType<Prisma.CaseAggregateArgs> = z.object({
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithRelationInputSchema.array(),CaseOrderByWithRelationInputSchema ]).optional(),
  cursor: CaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CaseGroupByArgsSchema: z.ZodType<Prisma.CaseGroupByArgs> = z.object({
  where: CaseWhereInputSchema.optional(),
  orderBy: z.union([ CaseOrderByWithAggregationInputSchema.array(),CaseOrderByWithAggregationInputSchema ]).optional(),
  by: CaseScalarFieldEnumSchema.array(),
  having: CaseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CaseFindUniqueArgsSchema: z.ZodType<Prisma.CaseFindUniqueArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict() ;

export const CaseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CaseFindUniqueOrThrowArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict() ;

export const PersonalInformationFindFirstArgsSchema: z.ZodType<Prisma.PersonalInformationFindFirstArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  where: PersonalInformationWhereInputSchema.optional(),
  orderBy: z.union([ PersonalInformationOrderByWithRelationInputSchema.array(),PersonalInformationOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonalInformationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PersonalInformationScalarFieldEnumSchema,PersonalInformationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PersonalInformationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PersonalInformationFindFirstOrThrowArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  where: PersonalInformationWhereInputSchema.optional(),
  orderBy: z.union([ PersonalInformationOrderByWithRelationInputSchema.array(),PersonalInformationOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonalInformationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PersonalInformationScalarFieldEnumSchema,PersonalInformationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PersonalInformationFindManyArgsSchema: z.ZodType<Prisma.PersonalInformationFindManyArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  where: PersonalInformationWhereInputSchema.optional(),
  orderBy: z.union([ PersonalInformationOrderByWithRelationInputSchema.array(),PersonalInformationOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonalInformationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PersonalInformationScalarFieldEnumSchema,PersonalInformationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PersonalInformationAggregateArgsSchema: z.ZodType<Prisma.PersonalInformationAggregateArgs> = z.object({
  where: PersonalInformationWhereInputSchema.optional(),
  orderBy: z.union([ PersonalInformationOrderByWithRelationInputSchema.array(),PersonalInformationOrderByWithRelationInputSchema ]).optional(),
  cursor: PersonalInformationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PersonalInformationGroupByArgsSchema: z.ZodType<Prisma.PersonalInformationGroupByArgs> = z.object({
  where: PersonalInformationWhereInputSchema.optional(),
  orderBy: z.union([ PersonalInformationOrderByWithAggregationInputSchema.array(),PersonalInformationOrderByWithAggregationInputSchema ]).optional(),
  by: PersonalInformationScalarFieldEnumSchema.array(),
  having: PersonalInformationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PersonalInformationFindUniqueArgsSchema: z.ZodType<Prisma.PersonalInformationFindUniqueArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  where: PersonalInformationWhereUniqueInputSchema,
}).strict() ;

export const PersonalInformationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PersonalInformationFindUniqueOrThrowArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  where: PersonalInformationWhereUniqueInputSchema,
}).strict() ;

export const WeaponCreateArgsSchema: z.ZodType<Prisma.WeaponCreateArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  data: z.union([ WeaponCreateInputSchema,WeaponUncheckedCreateInputSchema ]),
}).strict() ;

export const WeaponUpsertArgsSchema: z.ZodType<Prisma.WeaponUpsertArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  where: WeaponWhereUniqueInputSchema,
  create: z.union([ WeaponCreateInputSchema,WeaponUncheckedCreateInputSchema ]),
  update: z.union([ WeaponUpdateInputSchema,WeaponUncheckedUpdateInputSchema ]),
}).strict() ;

export const WeaponCreateManyArgsSchema: z.ZodType<Prisma.WeaponCreateManyArgs> = z.object({
  data: z.union([ WeaponCreateManyInputSchema,WeaponCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WeaponDeleteArgsSchema: z.ZodType<Prisma.WeaponDeleteArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  where: WeaponWhereUniqueInputSchema,
}).strict() ;

export const WeaponUpdateArgsSchema: z.ZodType<Prisma.WeaponUpdateArgs> = z.object({
  select: WeaponSelectSchema.optional(),
  include: WeaponIncludeSchema.optional(),
  data: z.union([ WeaponUpdateInputSchema,WeaponUncheckedUpdateInputSchema ]),
  where: WeaponWhereUniqueInputSchema,
}).strict() ;

export const WeaponUpdateManyArgsSchema: z.ZodType<Prisma.WeaponUpdateManyArgs> = z.object({
  data: z.union([ WeaponUpdateManyMutationInputSchema,WeaponUncheckedUpdateManyInputSchema ]),
  where: WeaponWhereInputSchema.optional(),
}).strict() ;

export const WeaponDeleteManyArgsSchema: z.ZodType<Prisma.WeaponDeleteManyArgs> = z.object({
  where: WeaponWhereInputSchema.optional(),
}).strict() ;

export const CrimeClassificationCreateArgsSchema: z.ZodType<Prisma.CrimeClassificationCreateArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  data: z.union([ CrimeClassificationCreateInputSchema,CrimeClassificationUncheckedCreateInputSchema ]),
}).strict() ;

export const CrimeClassificationUpsertArgsSchema: z.ZodType<Prisma.CrimeClassificationUpsertArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  where: CrimeClassificationWhereUniqueInputSchema,
  create: z.union([ CrimeClassificationCreateInputSchema,CrimeClassificationUncheckedCreateInputSchema ]),
  update: z.union([ CrimeClassificationUpdateInputSchema,CrimeClassificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const CrimeClassificationCreateManyArgsSchema: z.ZodType<Prisma.CrimeClassificationCreateManyArgs> = z.object({
  data: z.union([ CrimeClassificationCreateManyInputSchema,CrimeClassificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CrimeClassificationDeleteArgsSchema: z.ZodType<Prisma.CrimeClassificationDeleteArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  where: CrimeClassificationWhereUniqueInputSchema,
}).strict() ;

export const CrimeClassificationUpdateArgsSchema: z.ZodType<Prisma.CrimeClassificationUpdateArgs> = z.object({
  select: CrimeClassificationSelectSchema.optional(),
  include: CrimeClassificationIncludeSchema.optional(),
  data: z.union([ CrimeClassificationUpdateInputSchema,CrimeClassificationUncheckedUpdateInputSchema ]),
  where: CrimeClassificationWhereUniqueInputSchema,
}).strict() ;

export const CrimeClassificationUpdateManyArgsSchema: z.ZodType<Prisma.CrimeClassificationUpdateManyArgs> = z.object({
  data: z.union([ CrimeClassificationUpdateManyMutationInputSchema,CrimeClassificationUncheckedUpdateManyInputSchema ]),
  where: CrimeClassificationWhereInputSchema.optional(),
}).strict() ;

export const CrimeClassificationDeleteManyArgsSchema: z.ZodType<Prisma.CrimeClassificationDeleteManyArgs> = z.object({
  where: CrimeClassificationWhereInputSchema.optional(),
}).strict() ;

export const ReportingPersonCreateArgsSchema: z.ZodType<Prisma.ReportingPersonCreateArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  data: z.union([ ReportingPersonCreateInputSchema,ReportingPersonUncheckedCreateInputSchema ]),
}).strict() ;

export const ReportingPersonUpsertArgsSchema: z.ZodType<Prisma.ReportingPersonUpsertArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  where: ReportingPersonWhereUniqueInputSchema,
  create: z.union([ ReportingPersonCreateInputSchema,ReportingPersonUncheckedCreateInputSchema ]),
  update: z.union([ ReportingPersonUpdateInputSchema,ReportingPersonUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReportingPersonCreateManyArgsSchema: z.ZodType<Prisma.ReportingPersonCreateManyArgs> = z.object({
  data: z.union([ ReportingPersonCreateManyInputSchema,ReportingPersonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReportingPersonDeleteArgsSchema: z.ZodType<Prisma.ReportingPersonDeleteArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  where: ReportingPersonWhereUniqueInputSchema,
}).strict() ;

export const ReportingPersonUpdateArgsSchema: z.ZodType<Prisma.ReportingPersonUpdateArgs> = z.object({
  select: ReportingPersonSelectSchema.optional(),
  include: ReportingPersonIncludeSchema.optional(),
  data: z.union([ ReportingPersonUpdateInputSchema,ReportingPersonUncheckedUpdateInputSchema ]),
  where: ReportingPersonWhereUniqueInputSchema,
}).strict() ;

export const ReportingPersonUpdateManyArgsSchema: z.ZodType<Prisma.ReportingPersonUpdateManyArgs> = z.object({
  data: z.union([ ReportingPersonUpdateManyMutationInputSchema,ReportingPersonUncheckedUpdateManyInputSchema ]),
  where: ReportingPersonWhereInputSchema.optional(),
}).strict() ;

export const ReportingPersonDeleteManyArgsSchema: z.ZodType<Prisma.ReportingPersonDeleteManyArgs> = z.object({
  where: ReportingPersonWhereInputSchema.optional(),
}).strict() ;

export const CaseCreateArgsSchema: z.ZodType<Prisma.CaseCreateArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  data: z.union([ CaseCreateInputSchema,CaseUncheckedCreateInputSchema ]),
}).strict() ;

export const CaseUpsertArgsSchema: z.ZodType<Prisma.CaseUpsertArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
  create: z.union([ CaseCreateInputSchema,CaseUncheckedCreateInputSchema ]),
  update: z.union([ CaseUpdateInputSchema,CaseUncheckedUpdateInputSchema ]),
}).strict() ;

export const CaseCreateManyArgsSchema: z.ZodType<Prisma.CaseCreateManyArgs> = z.object({
  data: z.union([ CaseCreateManyInputSchema,CaseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CaseDeleteArgsSchema: z.ZodType<Prisma.CaseDeleteArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  where: CaseWhereUniqueInputSchema,
}).strict() ;

export const CaseUpdateArgsSchema: z.ZodType<Prisma.CaseUpdateArgs> = z.object({
  select: CaseSelectSchema.optional(),
  include: CaseIncludeSchema.optional(),
  data: z.union([ CaseUpdateInputSchema,CaseUncheckedUpdateInputSchema ]),
  where: CaseWhereUniqueInputSchema,
}).strict() ;

export const CaseUpdateManyArgsSchema: z.ZodType<Prisma.CaseUpdateManyArgs> = z.object({
  data: z.union([ CaseUpdateManyMutationInputSchema,CaseUncheckedUpdateManyInputSchema ]),
  where: CaseWhereInputSchema.optional(),
}).strict() ;

export const CaseDeleteManyArgsSchema: z.ZodType<Prisma.CaseDeleteManyArgs> = z.object({
  where: CaseWhereInputSchema.optional(),
}).strict() ;

export const PersonalInformationCreateArgsSchema: z.ZodType<Prisma.PersonalInformationCreateArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  data: z.union([ PersonalInformationCreateInputSchema,PersonalInformationUncheckedCreateInputSchema ]),
}).strict() ;

export const PersonalInformationUpsertArgsSchema: z.ZodType<Prisma.PersonalInformationUpsertArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  where: PersonalInformationWhereUniqueInputSchema,
  create: z.union([ PersonalInformationCreateInputSchema,PersonalInformationUncheckedCreateInputSchema ]),
  update: z.union([ PersonalInformationUpdateInputSchema,PersonalInformationUncheckedUpdateInputSchema ]),
}).strict() ;

export const PersonalInformationCreateManyArgsSchema: z.ZodType<Prisma.PersonalInformationCreateManyArgs> = z.object({
  data: z.union([ PersonalInformationCreateManyInputSchema,PersonalInformationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PersonalInformationDeleteArgsSchema: z.ZodType<Prisma.PersonalInformationDeleteArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  where: PersonalInformationWhereUniqueInputSchema,
}).strict() ;

export const PersonalInformationUpdateArgsSchema: z.ZodType<Prisma.PersonalInformationUpdateArgs> = z.object({
  select: PersonalInformationSelectSchema.optional(),
  include: PersonalInformationIncludeSchema.optional(),
  data: z.union([ PersonalInformationUpdateInputSchema,PersonalInformationUncheckedUpdateInputSchema ]),
  where: PersonalInformationWhereUniqueInputSchema,
}).strict() ;

export const PersonalInformationUpdateManyArgsSchema: z.ZodType<Prisma.PersonalInformationUpdateManyArgs> = z.object({
  data: z.union([ PersonalInformationUpdateManyMutationInputSchema,PersonalInformationUncheckedUpdateManyInputSchema ]),
  where: PersonalInformationWhereInputSchema.optional(),
}).strict() ;

export const PersonalInformationDeleteManyArgsSchema: z.ZodType<Prisma.PersonalInformationDeleteManyArgs> = z.object({
  where: PersonalInformationWhereInputSchema.optional(),
}).strict() ;