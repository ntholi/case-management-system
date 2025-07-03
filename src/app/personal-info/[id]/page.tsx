import React from 'react';
import prisma from '@/lib/prisma';
import FieldView from '@/components/FieldView';
import { notFound } from 'next/navigation';
import { Divider, Flex, Paper, Stack, Title } from '@mantine/core';
import BackButton from '@/components/BackButton';

type Props = { params: Promise<{ id: string }> };

export default async function PersonaInformation(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const person = await prisma.personalInformation.findUnique({
    where: {
      id: id,
    },
  });

  if (!person) return notFound();

  return (
    <Paper p={'xl'}>
      <Flex justify={'space-between'} align={'center'}>
        <Title order={1} fw={100} size={'3rem'}>
          {person.firstName} {person.surname}
        </Title>
        <BackButton />
      </Flex>
      <Divider mt={'sm'} mb={'lg'} />
      <Stack mt={'xl'}>
        <FieldView label='National ID' value={person.nationalId} />
        <FieldView label='National Type' value={person.nationalIdType} />
        <FieldView label='Surname' value={person.surname} />
        <FieldView label='Middle Name' value={person.middleName} />
        <FieldView label='First Name' value={person.firstName} />
        <FieldView label='Gender' value={person.gender} />
        <FieldView label='Phone Number' value={person.phoneNumber} />
        <FieldView label='Email' value={person.email} />
        <FieldView label='Date of Birth' value={person.dateOfBirth} />
        <FieldView label='Nationality' value={person.nationality} />
        <FieldView label='Marital Status' value={person.maritalStatus} />
        <FieldView label='Occupation' value={person.occupation} />
        <FieldView label='Education Level' value={person.education} />
        <FieldView label='Place of Birth' value={person.placeOfBirth} />
        <FieldView label='Area Chief' value={person.areaChief} />
        <FieldView label='Place of Residence' value={person.placeOfResidence} />
        <FieldView label='Head Man' value={person.headMan} />
        <FieldView label='Principle Chief' value={person.principalChief} />
        <FieldView label='District' value={person.district} />
        <FieldView label='Next Of Kin' value={person.nextOfKin} />
        <FieldView label='Next Of Kin Phone' value={person.nextOfKinPhone} />
      </Stack>
    </Paper>
  );
}
