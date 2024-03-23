import CreateButton from '@/components/CreateButton';
import DeleteIconButton from '@/components/DeleteIconButton';
import UpdateIconButton from '@/components/UpdateIconButton';
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
  TextInput,
  Anchor,
} from '@mantine/core';
import { create, remove, update } from './actions';
import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import ThemedTableHead from '@/components/ThemedTableHead';
import { asPastTense, dateTime } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function CasePage() {
  const data = await prisma.auditLog.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{dateTime(row.createdAt)}</TableTd>
      <TableTd>
        <Anchor component={Link} href={`#`} size='sm' c='gray'>
          {row.user.firstName} {row.user.lastName}
        </Anchor>{' '}
        {asPastTense(row.action)} {row.model}
      </TableTd>
      <TableTd align='right'>
        <Anchor component={Link} href={`#`} size='sm'>
          View
        </Anchor>
      </TableTd>
    </TableTr>
  ));
  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='Audit' />
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>Date</TableTh>
            <TableTh>Action</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </ThemedTableHead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}
