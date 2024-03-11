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
  PasswordInput,
} from '@mantine/core';
import { create, remove, update } from './actions';
import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import ThemedTableHead from '@/components/ThemedTableHead';

export default async function CasePage() {
  const data = await prisma.user.findMany();
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>
        {row.firstName} {row.lastName}
      </TableTd>
      <TableTd align='right'>
        <UpdateIconButton
          title={'User'}
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
          <PageTitle text='Users' />
          <CreateButton title='User' onCreate={create} form={<Form />} />
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>User</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </ThemedTableHead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}

function Form() {
  return (
    <>
      <TextInput name='name' label='Name' required />
      <PasswordInput name='password' label='Password' required />
    </>
  );
}
