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

export default async function CasePage() {
  const data = await prisma.case.findMany({});
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{row.obNo}</TableTd>
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
      <Table withTableBorder mt={'xl'}>
        <TableThead>
          <TableTr>
            <TableTh>Case</TableTh>
            <TableTh>Cases</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}
