import PageTitle from '@/components/PageTitle';
import ThemedButton from '@/components/ThemedButton';
import prisma from '@/lib/prisma';
import { Flex, Paper } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Form from '../../new/Form';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

export const dynamic = 'force-dynamic';

type Props = {
  params: { id: string };
};

export default async function CasePage({ params: { id } }: Props) {
  const weapons = await prisma?.weapon.findMany();
  const crimeClassifications = await prisma?.crimeClassification.findMany();
  const policeStations = await prisma?.policeStation.findMany();
  const item = await prisma.case.findUnique({
    where: { id },
    include: {
      victims: true,
      suspects: true,
      weapons: true,
      crimeClassifications: true,
      policeStation: true,
      caseStatus: true,
      reportingPerson: true,
    },
  });

  if (!item) {
    return notFound();
  }

  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='New Case' />
          <BackButton />
        </Flex>
      </Paper>
      <Paper p='md' withBorder mt={'lg'}>
        <Form
          item={item as any}
          weapons={weapons}
          crimeClassifications={crimeClassifications}
          policeStations={policeStations}
        />
      </Paper>
    </>
  );
}
