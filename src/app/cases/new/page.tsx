import PageTitle from '@/components/PageTitle';
import ThemedButton from '@/components/ThemedButton';
import prisma from '@/lib/prisma';
import { Flex, Paper } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Form from './Form';

export const dynamic = 'force-dynamic';

export default async function CasePage() {
  const weapons = await prisma?.weapon.findMany();
  const crimeClassifications = await prisma?.crimeClassification.findMany();
  const policeStations = await prisma?.policeStation.findMany();

  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='New Case' />
          <ThemedButton icon={<IconArrowLeft />} href='/cases'>
            Back
          </ThemedButton>
        </Flex>
      </Paper>
      <Paper p='md' withBorder mt={'lg'}>
        <Form
          weapons={weapons}
          crimeClassifications={crimeClassifications}
          policeStations={policeStations}
        />
      </Paper>
    </>
  );
}
