import DeleteIconButton from '@/components/DeleteIconButton';
import PageTitle from '@/components/PageTitle';
import ThemedButton from '@/components/ThemedButton';
import ThemedIconButton from '@/components/ThemedIconButton';
import prisma from '@/lib/prisma';
import {
  Flex,
  Paper,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { remove } from './actions';
import ThemedTableHead from '@/components/ThemedTableHead';

export default async function CasePage() {
  const data = await prisma.case.findMany({
    include: {
      victim: true,
      suspect: true,
    },
  });
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{row.obNo}</TableTd>
      <TableTd>{row.rciNo}</TableTd>
      <TableTd>
        {row.victim?.firstName} {row.victim?.surname}
      </TableTd>
      <TableTd>
        {row.suspect?.firstName} {row.suspect?.surname}
      </TableTd>
      <TableTd>{row.dateOfOccurrence?.toLocaleDateString()} </TableTd>
      <TableTd align='right'>
        <ThemedIconButton href={`/cases/case?id=${row.id}`}>
          <IconEdit size={'1rem'} />
        </ThemedIconButton>
        <DeleteIconButton ml={10} id={row.id} action={remove} />
      </TableTd>
    </TableTr>
  ));
  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='Cases' />
          <ThemedButton href='/cases/case'>New</ThemedButton>
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>RCI No.</TableTh>
            <TableTh>OB No.</TableTh>
            <TableTh>Victim</TableTh>
            <TableTh>Suspect</TableTh>
            <TableTh>Date of Occurrence</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </ThemedTableHead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}
