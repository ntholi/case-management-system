import PageTitle from '@/components/PageTitle';
import ResourceForm from '@/components/ResourceForm';
import ThemedButton from '@/components/ThemedButton';
import ThemedIconButton from '@/components/ThemedIconButton';
import { Flex, Grid, GridCol, Group, Paper, TextInput } from '@mantine/core';
import { IconArrowNarrowLeft, IconPick, IconSelect } from '@tabler/icons-react';
import React from 'react';
import Form from './Form';

export default function CasePage() {
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
        <Form />
      </Paper>
    </>
  );
}
