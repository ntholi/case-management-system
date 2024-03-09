import FormModal from '@/components/FormModal';

import {
  Box,
  Paper,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  TextInput,
} from '@mantine/core';
import prisma from '@/lib/prisma';
import { create, remove } from './actions';
import { IconEdit } from '@tabler/icons-react';
import ThemedIconButton from '@/components/ThemedIconButton';
import DeleteIconButton from '@/components/DeleteIconButton';

export default async function CasePage() {
  const data = await prisma.crimeClassification.findMany();
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{row.name}</TableTd>
      <TableTd align='right'>
        <ThemedIconButton>
          <IconEdit size={'1rem'} />
        </ThemedIconButton>
        <DeleteIconButton ml={10} id={row.id} action={remove} />
      </TableTd>
    </TableTr>
  ));
  return (
    <>
      <Paper p='md' withBorder>
        <FormModal buttonLabel='The Thing' onSubmit={create}>
          <Form />
        </FormModal>
      </Paper>
      <Table withTableBorder mt={'xl'}>
        <TableThead>
          <TableTr>
            <TableTh>Element</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}

function Form() {
  return (
    <>
      <TextInput name='name' label='Name' required />
    </>
  );
}
