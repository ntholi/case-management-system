import PageTitle from '@/components/PageTitle';
import ThemedButton from '@/components/ThemedButton';
import prisma from '@/lib/prisma';
import { Flex, Paper } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import Form from './Form';

export default async function CasePage() {
  const weapons = await prisma?.weapon.findMany();

  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='New Case' />
          <ThemedButton icon={<IconArrowNarrowLeft />} href='/cases'>
            Back
          </ThemedButton>
        </Flex>
      </Paper>
      <Paper p='md' withBorder mt={'xl'}>
        <Form weapons={weapons} />
      </Paper>
    </>
  );
}
