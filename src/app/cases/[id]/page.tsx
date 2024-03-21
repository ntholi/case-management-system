import FieldView from '@/components/FieldView';
import PageTitle from '@/components/PageTitle';
import ThemedButton from '@/components/ThemedButton';
import prisma from '@/lib/prisma';
import {
  Card,
  Divider,
  Flex,
  Grid,
  GridCol,
  Paper,
  Stack,
  Title,
} from '@mantine/core';
import { PersonalInformation } from '@prisma/client';
import { IconArrowLeft } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import BackButton from './BackButton';

export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

export default async function CasePage({ params: { id } }: Props) {
  const item = await prisma.case.findUnique({
    where: { id },
    include: {
      victims: true,
      suspects: true,
      weapons: true,
      crimeClassifications: true,
      policeStation: true,
    },
  });

  if (!item) return notFound();

  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='New Case' />
          <BackButton />
        </Flex>
      </Paper>
      <Paper p='md' withBorder mt={'lg'}>
        <Grid p='lg'>
          <GridCol span={6}>
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Stack>
                <FieldView label='RCI No' value={item.rciNo} />
                <FieldView label='OB No' value={item.obNo} />
                <FieldView
                  label='Occurrence Place'
                  value={item.occurrencePlace}
                />
                <FieldView
                  label='Police Station'
                  value={`${item.policeStation?.name}, ${item.policeStation?.district}`}
                />
                <FieldView
                  label='Weapons'
                  value={item.weapons?.map((w) => w.name).join(', ')}
                />
                <FieldView
                  label='Crime Classifications'
                  value={item.crimeClassifications
                    ?.map((c) => c.name)
                    .join(', ')}
                />
                <FieldView
                  label='Date of Occurrence'
                  value={item.dateOfOccurrence}
                />
                <FieldView label='Date of Report' value={item.dateOfReport} />
              </Stack>
            </Card>
          </GridCol>
          <GridCol span={6}>
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Stack>
                <FieldView label='Modus Operandi' value={item.modusOperandi} />
                <FieldView
                  label='Contributing to Crime?'
                  value={item.modusOperandiLinked}
                />
                <FieldView
                  label='How it contributes to Crime'
                  value={item.modusOperandiDetails}
                />
              </Stack>
            </Card>
          </GridCol>
          <GridCol span={6}>
            <Title order={3} fw={100}>
              Victims
            </Title>
            {item.victims?.map((it) => (
              <Card
                key={it.id}
                shadow='sm'
                my={'xs'}
                padding='lg'
                radius='md'
                withBorder
              >
                <PersonalInfoCard item={it} />
              </Card>
            ))}
          </GridCol>
          <GridCol span={6}>
            <Title order={3} fw={100}>
              Suspects
            </Title>
            {item.suspects?.map((it) => (
              <Card
                key={it.id}
                shadow='sm'
                my={'xs'}
                padding='lg'
                radius='md'
                withBorder
              >
                <PersonalInfoCard item={it} />
              </Card>
            ))}
          </GridCol>
        </Grid>
      </Paper>
    </>
  );
}

function PersonalInfoCard({ item }: { item: PersonalInformation | null }) {
  if (!item) return null;
  return (
    <>
      <FieldView label='National ID' value={item.nationalId} />
      <FieldView label='National Type' value={item.nationalIdType} />
      <FieldView label='Surname' value={item.surname} />
      <FieldView label='Middle Name' value={item.middleName} />
      <FieldView label='First Name' value={item.firstName} />
      <FieldView label='Gender' value={item.gender} />
      <FieldView label='Phone Number' value={item.phoneNumber} />
      <FieldView label='Email' value={item.email} />
      <FieldView label='Date of Birth' value={item.dateOfBirth} />
      <FieldView label='Nationality' value={item.nationality} />
      <FieldView label='Marital Status' value={item.maritalStatus} />
      <FieldView label='Occupation' value={item.occupation} />
      <FieldView label='Education Level' value={item.education} />
      <FieldView label='Place of Birth' value={item.placeOfBirth} />
      <FieldView label='Area Chief' value={item.areaChief} />
      <FieldView label='Place of Residence' value={item.placeOfResidence} />
      <FieldView label='Head Man' value={item.headMan} />
      <FieldView label='Principle Chief' value={item.principalChief} />
      <FieldView label='District' value={item.district} />
      <FieldView label='Next Of Kin' value={item.nextOfKin} />
      <FieldView label='Next Of Kin Phone' value={item.nextOfKinPhone} />
    </>
  );
}
