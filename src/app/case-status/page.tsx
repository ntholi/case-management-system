import CreateButton from '@/components/CreateButton';
import DeleteIconButton from '@/components/DeleteIconButton';
import PageTitle from '@/components/PageTitle';
import ThemedTableHead from '@/components/ThemedTableHead';
import UpdateIconButton from '@/components/UpdateIconButton';
import prisma from '@/lib/prisma';
import {
  Anchor,
  Flex,
  Paper,
  Select,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableTr,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { create, remove, update } from './actions';
import { CourtCaseStatus, PoliceCaseStatus } from '@prisma/client';
import Form from './Form';

export const dynamic = 'force-dynamic';

export default async function CasePage() {
  const data = await prisma.caseStatus.findMany({
    include: {
      case: true,
    },
  });
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>
        <Anchor component={Link} href={`/cases/${row.case.id}`} size='sm'>
          {row.case.rciNo}
        </Anchor>
      </TableTd>
      <TableTd>{row.case.rciNo}</TableTd>
      <TableTd>{row.policeCaseStatus}</TableTd>
      <TableTd>{row.courtCaseStatus}</TableTd>
      <TableTd align='right'>
        <UpdateIconButton
          title={'Case Management'}
          form={<Form />}
          initialValues={row}
          objectId={row.id}
          onUpdate={update}
        />
        <DeleteIconButton ml={10} id={row.id} action={remove} />
      </TableTd>
    </TableTr>
  ));
  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='Case Management' />
          <CreateButton
            title='Case Management'
            onCreate={create}
            form={<Form />}
          />
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>RCI No.</TableTh>
            <TableTh>Police Case Status</TableTh>
            <TableTh>Court Case Status</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </ThemedTableHead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}
