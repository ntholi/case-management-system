import CreateButton from '@/components/CreateButton';
import DeleteIconButton from '@/components/DeleteIconButton';
import PageTitle from '@/components/PageTitle';
import ThemedTableHead from '@/components/ThemedTableHead';
import UpdateIconButton from '@/components/UpdateIconButton';
import prisma from '@/lib/prisma';
import {
  Flex,
  Paper,
  PasswordInput,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableTr,
  TextInput,
} from '@mantine/core';
import { create, remove, update } from './actions';

export default async function CasePage() {
  const data = await prisma.user.findMany();
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{row.firstName}</TableTd>
      <TableTd>{row.lastName}</TableTd>
      <TableTd>{row.email}</TableTd>
      <TableTd>{row.role}</TableTd>
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
            <TableTh>First Name</TableTh>
            <TableTh>Last Name</TableTh>
            <TableTh>Email</TableTh>
            <TableTh>Role</TableTh>
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
      <TextInput name='firstName' label='First Name' required />
      <TextInput name='lastName' label='Last Name' required />
      <TextInput name='email' label='Email' type='email' required />
      <PasswordInput name='password' label='Password' required />
    </>
  );
}
