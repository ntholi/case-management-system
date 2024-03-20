'use client';
import DeleteIconButton from '@/components/DeleteIconButton';
import PageTitle from '@/components/PageTitle';
import ThemedButton from '@/components/ThemedButton';
import ThemedIconButton from '@/components/ThemedIconButton';
import ThemedTableHead from '@/components/ThemedTableHead';
import { dateTime } from '@/lib/format';
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableTr,
} from '@mantine/core';
import {
  IconEdit,
  IconFileSpreadsheet,
  IconPlus,
  IconUpload,
} from '@tabler/icons-react';
import Link from 'next/link';
import { remove } from './actions';
import { Case as BaseCase, PersonalInformation, Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';

export const dynamic = 'force-dynamic';

export type Case = BaseCase & {
  victim?: PersonalInformation;
  suspect?: PersonalInformation;
};

export default function CasePage() {
  const [data, setData] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/cases`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{dateTime(row.createdAt)} </TableTd>
      <TableTd>{row.obNo}</TableTd>
      <TableTd>{row.rciNo}</TableTd>
      <TableTd>
        {row.victim?.firstName} {row.victim?.surname}
      </TableTd>
      <TableTd>
        {row.suspect?.firstName} {row.suspect?.surname}
      </TableTd>
      <TableTd align='right'>
        <Group gap={0} justify='end'>
          <Anchor mr={'lg'} href={`/cases/${row.id}`} component={Link}>
            View
          </Anchor>
          <ThemedIconButton href={`/cases/${row.id}/edit`}>
            <IconEdit size={'1rem'} />
          </ThemedIconButton>
          <Button
            ml={'sm'}
            size='xs'
            variant='light'
            rightSection={<IconUpload size={'1rem'} />}
          >
            Published
          </Button>
          <DeleteIconButton ml={10} id={row.id} action={remove} />
        </Group>
      </TableTd>
    </TableTr>
  ));

  if (loading)
    return (
      <Flex w={'100%'} justify={'center'} mt={250}>
        <Loader />
      </Flex>
    );

  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <PageTitle text='Unpunished Cases' />
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>Entry Date</TableTh>
            <TableTh>RCI No.</TableTh>
            <TableTh>OB No.</TableTh>
            <TableTh>Victim</TableTh>
            <TableTh>Suspect</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </ThemedTableHead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}
