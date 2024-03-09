import PageTitle from '@/components/PageTitle';
import ResourceForm from '@/components/ResourceForm';
import ThemedButton from '@/components/ThemedButton';
import { Flex, Paper, TextInput } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import React from 'react';

export default function CaseForm() {
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
        <ResourceForm title={'This'}>
          <TextInput label='Case Number' placeholder='Case Number' />
        </ResourceForm>
      </Paper>
    </>
  );
}
