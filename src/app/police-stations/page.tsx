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
import { District } from '@prisma/client';
import { create, remove, update } from './actions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CasePage() {
  const data = await prisma.policeStation.findMany({
    include: {
      cases: true,
    },
  });
  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{row.name}</TableTd>
      <TableTd>{row.district}</TableTd>
      <TableTd>
        <Anchor component={Link} href={`#`} size='sm'>
          {row.cases.length} Cases
        </Anchor>
      </TableTd>
      <TableTd align='right'>
        <UpdateIconButton
          title={'PoliceStation'}
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
          <PageTitle text='PoliceStations' />
          <CreateButton
            title='PoliceStation'
            onCreate={create}
            form={<Form />}
          />
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>Name</TableTh>
            <TableTh>District</TableTh>
            <TableTh>Cases</TableTh>
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
      <Select
        label='District'
        name='district'
        data={
          Object.entries(District).map(([key, value]) => ({
            value: value,
            label: value,
          })) || []
        }
      />
    </>
  );
}
