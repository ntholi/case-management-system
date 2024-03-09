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

export default async function CasePage() {
  const data = await prisma.crimeClassification.findMany({
    include: {
      cases: true,
    },
  });
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{row.name}</TableTd>
      <TableTd>
        <Anchor component={Link} href={`#`}>
          {row.cases.length} Cases
        </Anchor>
      </TableTd>
      <TableTd align='right'>
        <UpdateIconButton
          title={'Crime Classification'}
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
          <PageTitle text='Crime Classifications' />
          <CreateButton
            title='Crime Classification'
            onCreate={create}
            form={<Form />}
          />
        </Flex>
      </Paper>
      <Table withTableBorder mt={'xl'}>
        <TableThead>
          <TableTr>
            <TableTh>Classifications</TableTh>
            <TableTh>Cases</TableTh>
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
