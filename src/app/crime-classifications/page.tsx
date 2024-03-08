import FormModal from '@/components/FormModal';
import ThemedButton from '@/components/ThemedButton';
import prisma from '@/lib/prisma';
import {
  Paper,
  Table,
  TableTbody,
  TableTh,
  TableThead,
  TableTr,
  TextInput,
} from '@mantine/core';

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
        <FormModal
          label='The Thing'
          onSubmit={async (value) => {
            'use server';
            const res = await prisma.crimeClassification.create({
              data: value,
            });
            console.log(res);
          }}
        >
          <TextInput withAsterisk label='Name' name='name' />
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
