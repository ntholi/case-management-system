import FormModal from '@/components/FormModal';
import ThemedButton from '@/components/ThemedButton';

import {
  Paper,
  Table,
  TableTbody,
  TableTh,
  TableThead,
  TableTr,
  TextInput,
} from '@mantine/core';
import prisma from '@/lib/prisma';
import { createCrimeClassification } from './actions';

export default async function CasePage() {
  const data = await prisma.crimeClassification.findMany();
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTh>{row.name}</TableTh>
      <TableTh>
        <ThemedButton>Edit</ThemedButton>
      </TableTh>
    </TableTr>
  ));
  return (
    <>
      <Paper p='md' withBorder>
        <FormModal buttonLabel='The Thing' onSubmit={createCrimeClassification}>
          <Form />
        </FormModal>
      </Paper>
      <Table>
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
